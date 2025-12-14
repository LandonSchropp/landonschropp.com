import { ArticleSummary } from "../../components/articles/article-summary";
import { Header } from "../../components/content/header";
import { fetchContents } from "../../data/content";
import { fetchEnvironmentVariable } from "../../env";
import { parseArticle } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/")({
  loader: async () => await fetchContents(fetchEnvironmentVariable("ARTICLES_PATH"), parseArticle),
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
  const articles = Route.useLoaderData();

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
