import { FormattedDate } from "../../components/base/formatted-date";
import { Header } from "../../components/content/header";
import { Tag } from "../../components/content/tag";
import { NAME } from "../../constants";
import { fetchArticle } from "../../data/articles";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params }) => await fetchArticle({ data: { slug: params.slug } }),
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
        subtitle={
          <>
            <span rel="author">{NAME}</span> • <FormattedDate date={article.date} />
          </>
        }
        tags={article.tags.map((tag) => (
          <Tag key={tag} name={tag} href={`/articles?tag=${tag}`} />
        ))}
      />
      <section className="prose" dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}
