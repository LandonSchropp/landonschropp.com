"use client";

import { ArticleSummary } from "@/components/articles/article-summary";
import { Header } from "@/components/content/header";
import type { Article } from "@/types";

type ArticleSummariesProps = {
  articles: Article[];
};

export function ArticleSummaries({ articles }: ArticleSummariesProps) {
  return (
    <>
      <Header title="Writing" subText="My published articles from all over the web." />

      <section>
        {articles.map((article) => {
          return <ArticleSummary key={article.slug} article={article} />;
        })}
      </section>
    </>
  );
}
