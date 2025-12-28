import { getBookCoverHref } from "../src/data/book-covers";
import { fetchContents } from "../src/data/content";
import { fetchEnvironmentVariable } from "../src/env";
import { existsSync } from "fs";
import { readFile, mkdir, writeFile, readdir } from "fs/promises";
import mime from "mime";
import pRetry from "p-retry";
import { join, posix, basename } from "path";
import type { Plugin } from "vite";

const ISBN_ROUTE_REGEX = /^\/images\/isbn\/(\d+)\.jpg$/;
const CACHE_DIR = "dist/cache/book-covers";
const VIRTUAL_MODULE_ID = "virtual:book-covers";
const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

export default function bookCovers(): Plugin {
  let isbns: number[] = [];

  async function loadISBNs(): Promise<number[]> {
    // NOTE: It'd be simpler to import the nodes using fetchNotes. However, we can't do that since
    // fetchNotes relies on the virtual module provided by this plugin, which creates a circular
    // dependency. Instead, we directly fetch the contents here, and filter the properties to get
    // the ISBNs
    return (await fetchContents(fetchEnvironmentVariable("NOTES_PATH")))
      .map((content) => content.isbn)
      .filter((isbn) => typeof isbn === "number");
  }

  async function downloadCover(isbn: number): Promise<void> {
    const coverPath = join(CACHE_DIR, `${isbn}.jpg`);

    // Check if the book cover is already cached
    if (existsSync(coverPath)) {
      return;
    }

    await pRetry(
      async () => {
        // Download from Open Library with 30 second timeout
        const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`, {
          signal: AbortSignal.timeout(30000),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        // Open Library returns a 1×1 pixel image instead of 404 for missing covers. Reject images
        // smaller than 1KB as they're likely placeholders.
        if (buffer.length < 1000) {
          return;
        }

        // Write the file
        await mkdir(CACHE_DIR, { recursive: true });
        await writeFile(coverPath, buffer);
      },
      {
        retries: 3,
        onFailedAttempt: ({ error, attemptNumber, retriesLeft }) => {
          const totalAttempts = attemptNumber + retriesLeft;

          console.warn(
            `Failed to download cover ${isbn} (${attemptNumber}/${totalAttempts}): ${error.message}`,
          );
        },
      },
    );
  }

  async function downloadBookCoverFiles(): Promise<void> {
    isbns = await loadISBNs();

    for (const isbn of isbns) {
      await downloadCover(isbn);
    }
  }

  return {
    name: "book-covers",

    // Virtual module to expose available ISBNs with covers
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    // Provide the content of the virtual module
    async load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        // Compute available ISBNs based on which files exist in cache
        const files = existsSync(CACHE_DIR) ? await readdir(CACHE_DIR) : [];
        const cachedIsbns = files
          .map((file) => parseInt(basename(file, ".jpg"), 10))
          .filter((isbn) => !isNaN(isbn));

        const availableIsbns = isbns.filter((isbn) => cachedIsbns.includes(isbn));

        return `export const availableIsbns = new Set(${JSON.stringify(availableIsbns)});`;
      }
    },

    async buildStart() {
      await downloadBookCoverFiles();
    },

    async generateBundle() {
      // Emit all available book covers
      for (const isbn of isbns) {
        const coverPath = join(CACHE_DIR, `${isbn}.jpg`);

        if (!existsSync(coverPath)) {
          continue;
        }

        const source = await readFile(coverPath);
        const fileName = posix.relative("/", getBookCoverHref(isbn));

        this.emitFile({ type: "asset", fileName, source });
      }
    },

    async configureServer(server) {
      // Download all book covers
      await downloadBookCoverFiles();

      // Watch content directories for changes
      server.watcher.add(join(fetchEnvironmentVariable("NOTES_PATH"), "**", "*"));

      // Regenerate on changes
      server.watcher.on("change", () => {
        void downloadBookCoverFiles().then(() => {
          server.ws.send({ type: "full-reload" });
        });
      });

      // Serve book covers in dev mode
      server.middlewares.use((request, response, next) => {
        const match = request.url?.match(ISBN_ROUTE_REGEX);

        if (!match) {
          next();
          return;
        }

        const isbn = Number(match[1]);

        if (!isbns.includes(isbn)) {
          response.statusCode = 404;
          response.end();
          return;
        }

        const coverPath = join(CACHE_DIR, `${isbn}.jpg`);

        readFile(coverPath)
          .then((content) => {
            const mimeType = mime.getType(".jpg");

            if (mimeType) {
              response.setHeader("Content-Type", mimeType);
            }

            response.end(content);
          })
          .catch((error) => {
            console.error(`Failed to serve book cover for ISBN ${isbn}:`, error);
            response.statusCode = 404;
            response.end();
          });
      });
    },
  };
}
