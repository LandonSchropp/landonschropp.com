import { ArticleSummary } from "../../components/articles/article-summary";
import { Header } from "../../components/content/header";
import { Tag } from "../../components/content/tag";
import { fetchArticles } from "../../data/articles";
import { TagSearchSchema } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/articles/")({
  validateSearch: TagSearchSchema,
  loaderDeps: ({ search }) => ({ tag: search.tag }),
  loader: async ({ deps: { tag } }) => {
    const articles = await fetchArticles();
    return tag ? articles.filter(({ tags }) => tags.includes(tag)) : articles;
  },
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
  const { tag } = Route.useSearch();

  return (
    <>
      <Header
        title="Writing"
        subtitle="My published articles from all over the web."
        tags={tag ? [<Tag key={tag} name={tag} href="/articles" />] : undefined}
      />
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
