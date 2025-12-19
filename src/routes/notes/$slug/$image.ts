import { fetchContent } from "../../../data/content";
import { downloadContentImage } from "../../../data/image";
import { fetchEnvironmentVariable } from "../../../env";
import { parseNote } from "../../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/$slug/$image")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const note = await fetchContent(
          fetchEnvironmentVariable("NOTES_PATH"),
          params.slug,
          parseNote,
        );
        return downloadContentImage(note, params.image);
      },
    },
  },
});
