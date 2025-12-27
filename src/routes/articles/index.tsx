import { ArticleSummary } from "../../components/articles/article-summary";
import { Header } from "../../components/content/header";
import { fetchArticlesServerFn } from "../../data/articles";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/")({
  loader: async () => ({ articles: await fetchArticlesServerFn() }),
  head: () => ({
    meta: [
      {
        title: "Writing",
      },
      {
        name: "description",
        content: "My published articles from all over the web.",
      },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const { articles } = Route.useLoaderData();

  return (
    <>
      <Header title="Writing" subtitle="My published articles from all over the web." />
      <section>
        {articles.map((article, index) => (
          <ArticleSummary
            key={article.slug}
            article={article}
            index={index}
            count={articles.length}
          />
        ))}
      </section>
    </>
  );
}
