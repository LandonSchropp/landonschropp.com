import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import viteTsConfigPaths from "vite-tsconfig-paths";

const PATHS_TO_PRERENDER: RegExp[] = [/^\/$/];

export default defineConfig({
  plugins: [
    devtools(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        // TODO: Enable link crawling and remove specific routes once all pages have been moved to
        // TanStack
        filter: ({ path }) => PATHS_TO_PRERENDER.some((regex) => regex.test(path)),
      },
    }),
    viteReact(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        svgoConfig: {
          plugins: [
            "cleanupIds",
            "removeDimensions",
            {
              name: "removeAttrs",
              params: { attrs: "(stroke|fill|stroke-width)" },
            },
          ],
        },
      },
    }),
  ],
});
