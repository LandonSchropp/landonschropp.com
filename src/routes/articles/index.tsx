import { ArticleSummary } from "../../components/articles/article-summary";
import { Header } from "../../components/content/header";
import { fetchContents } from "../../data/content";
import { ARTICLES_PATH } from "../../env";
import { parseArticle } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/")({
  loader: async () => await fetchContents(ARTICLES_PATH, parseArticle),
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
      <Header title="Writing" subText="My published articles from all over the web." />
      <section>
        {articles.map((article) => (
          <ArticleSummary key={article.slug} article={article} />
        ))}
      </section>
    </>
  );
}
