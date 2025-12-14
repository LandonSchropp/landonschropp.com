import type { Article } from "../../types";
import { Icon } from "../base/icon";
import { Summary } from "../content/summary";

type ArticleSummaryProps = {
  article: Article;
  index: number;
  count: number;
};

export function ArticleSummary({ article, index, count }: ArticleSummaryProps) {
  const href = "url" in article ? article.url : `/articles/${article.slug}`;

  const linkIcon =
    "publisher" in article ? (
      <Icon
        className="relative top-[-0.1em] h-[0.85em] w-[0.85em] align-baseline"
        name="externalLink"
        alt={`Published on ${article.publisher}`}
      />
    ) : null;

  return (
    <Summary
      title={
        <>
          <span dangerouslySetInnerHTML={{ __html: article.title }} /> {linkIcon}
        </>
      }
      description={article.description}
      url={href}
      index={index}
      count={count}
    />
  );
}
