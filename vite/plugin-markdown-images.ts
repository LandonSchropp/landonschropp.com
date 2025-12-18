import { fetchArticles } from "../src/data/articles";
import { getImagePath } from "../src/data/image";
import { fetchNotes } from "../src/data/notes";
import { fetchTodayILearneds } from "../src/data/today-i-learned";
import { fetchEnvironmentVariable } from "../src/env";
import type { Image } from "../src/types";
import { readFile } from "fs/promises";
import mime from "mime";
import { join, posix } from "path";
import type { Plugin } from "vite";

const IMAGE_ROUTE_REGEX = /^\/images\/([a-f0-9]+)(\.[a-zA-Z0-9]+)$/;

export default function markdownImages(): Plugin {
  let images: Image[] = [];

  async function loadImages(): Promise<Image[]> {
    const [articles, notes, tils] = await Promise.all([
      fetchArticles(),
      fetchNotes(),
      fetchTodayILearneds(),
    ]);

    return [articles, notes, tils].flat().flatMap((content) => content.images);
  }

  return {
    name: "markdown-images",

    async buildStart() {
      images = await loadImages();
    },

    async generateBundle() {
      // Emit images as Vite assets
      for (const image of images) {
        const source = await readFile(image.filePath);
        const fileName = posix.relative("/", getImagePath(image));

        this.emitFile({
          type: "asset",
          fileName,
          source,
        });
      }
    },

    async configureServer(server) {
      // Load initial images
      images = await loadImages();

      // Watch content directories for changes
      server.watcher.add(
        [
          fetchEnvironmentVariable("ARTICLES_PATH"),
          fetchEnvironmentVariable("NOTES_PATH"),
          fetchEnvironmentVariable("TODAY_I_LEARNED_PATH"),
        ].map((path) => join(path, "**", "*")),
      );

      // Regenerate on changes
      server.watcher.on("change", () => {
        void loadImages().then((newImages) => {
          images = newImages;
          server.ws.send({ type: "full-reload" });
        });
      });

      // Serve images in dev mode
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(IMAGE_ROUTE_REGEX);

        if (!match) {
          next();
          return;
        }

        const [, hash, extension] = match;
        const image = images.find((image) => image.hash === hash);

        if (!image) {
          res.statusCode = 404;
          res.end();
          return;
        }

        readFile(image.filePath)
          .then((content) => {
            const mimeType = mime.getType(extension);

            if (mimeType) {
              res.setHeader("Content-Type", mimeType);
            }

            res.end(content);
          })
          .catch((error) => {
            console.error(
              `Failed to serve image ${getImagePath(image)} from ${image.filePath}:`,
              error,
            );
            res.statusCode = 500;
            res.end();
          });
      });
    },
  };
}
