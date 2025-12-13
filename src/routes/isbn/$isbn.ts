import { createFileRoute } from "@tanstack/react-router";

// TODO: Add a .jpg extension once TanStack Router supports it.
// https://github.com/TanStack/router/discussions/3834
export const Route = createFileRoute("/isbn/$isbn")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        return fetch(`https://covers.openlibrary.org/b/isbn/${params.isbn}-L.jpg`);
      },
    },
  },
});
