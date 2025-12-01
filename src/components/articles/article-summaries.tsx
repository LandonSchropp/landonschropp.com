"use client";

import type { Article } from "../../types";
import { Header } from "../content/header";
import { ArticleSummary } from "./article-summary";

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
