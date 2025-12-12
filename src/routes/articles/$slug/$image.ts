import { fetchContent } from "../../../data/content";
import { downloadImage } from "../../../data/image";
import { fetchEnvironmentVariable } from "../../../env";
import { parseArticle } from "../../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/$slug/$image")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const article = await fetchContent(
          fetchEnvironmentVariable("ARTICLES_PATH"),
          params.slug,
          parseArticle,
        );
        return downloadImage(article, params.image);
      },
    },
  },
});
