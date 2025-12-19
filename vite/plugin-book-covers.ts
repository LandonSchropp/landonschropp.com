import { getBookCoverHref } from "../src/data/book-covers";
import { fetchContents } from "../src/data/content";
import { fetchEnvironmentVariable } from "../src/env";
import { existsSync } from "fs";
import { readFile, mkdir, writeFile } from "fs/promises";
import mime from "mime";
import { join, posix } from "path";
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

  async function downloadCover(isbn: number): Promise<string> {
    const coverPath = join(CACHE_DIR, `${isbn}.jpg`);

    // Check if the book cover is already cached
    if (existsSync(coverPath)) {
      return coverPath;
    }

    // Download from Open Library
    const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);

    if (!response.ok) {
      throw new Error(`Failed to download cover for ISBN ${isbn}: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // Ensure cache directory exists
    await mkdir(CACHE_DIR, { recursive: true });

    // Write to cache
    await writeFile(coverPath, buffer);

    return coverPath;
  }

  return {
    name: "book-covers",

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return `export const availableIsbns = new Set(${JSON.stringify(isbns)});`;
      }
    },

    async buildStart() {
      isbns = await loadISBNs();
    },

    async generateBundle() {
      // Download and emit all book covers
      for (const isbn of isbns) {
        const coverPath = await downloadCover(isbn);
        const source = await readFile(coverPath);
        const fileName = posix.relative("/", getBookCoverHref(isbn));

        this.emitFile({
          type: "asset",
          fileName,
          source,
        });
      }
    },

    async configureServer(server) {
      // Load initial ISBNs
      isbns = await loadISBNs();

      // Watch content directories for changes
      server.watcher.add(join(fetchEnvironmentVariable("NOTES_PATH"), "**", "*"));

      // Regenerate on changes
      server.watcher.on("change", () => {
        void loadISBNs().then((newISBNs) => {
          isbns = newISBNs;
          server.ws.send({ type: "full-reload" });
        });
      });

      // Serve book covers in dev mode
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(ISBN_ROUTE_REGEX);

        if (!match) {
          next();
          return;
        }

        const [, isbnStr] = match;
        const isbn = parseInt(isbnStr, 10);

        if (!isbns.includes(isbn)) {
          res.statusCode = 404;
          res.end();
          return;
        }

        downloadCover(isbn)
          .then((coverPath) => readFile(coverPath))
          .then((content) => {
            const mimeType = mime.getType(".jpg");

            if (mimeType) {
              res.setHeader("Content-Type", mimeType);
            }

            res.end(content);
          })
          .catch((error) => {
            console.error(`Failed to serve book cover for ISBN ${isbn}:`, error);
            res.statusCode = 500;
            res.end();
          });
      });
    },
  };
}
