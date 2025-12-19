import bookCovers from "./vite/plugin-book-covers";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), bookCovers()] as any,
  test: {
    clearMocks: true,
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/create-server-fn.ts"],
  },
});
