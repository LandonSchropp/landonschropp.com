import { FormattedDate } from "../../components/base/formatted-date";
import { Header } from "../../components/content/header";
import { NAME } from "../../constants";
import { fetchContent } from "../../data/content";
import { fetchEnvironmentVariable } from "../../env";
import { parseArticle } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params }) =>
    await fetchContent(fetchEnvironmentVariable("ARTICLES_PATH"), params.slug, parseArticle),
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    return {
      meta: [
        {
          title: loaderData.title,
        },
        {
          name: "description",
          content: loaderData.description,
        },
        {
          name: "author",
          content: NAME,
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();

  return (
    <article>
      <Header
        title={article.title}
        titleHref={`/articles/${article.slug}`}
        subtitle={
          <>
            <span rel="author">{NAME}</span> • <FormattedDate date={article.date} />
          </>
        }
      />
      <section className="prose" dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}
