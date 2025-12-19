import { fetchContent } from "../../../data/content";
import { downloadContentImage } from "../../../data/image";
import { fetchEnvironmentVariable } from "../../../env";
import { parseTodayILearned } from "../../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned/$slug/$image")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const todayILearned = await fetchContent(
          fetchEnvironmentVariable("TODAY_I_LEARNED_PATH"),
          params.slug,
          parseTodayILearned,
        );
        return downloadContentImage(todayILearned, params.image);
      },
    },
  },
});
