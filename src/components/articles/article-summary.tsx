import type { Article } from "../../types";
import { Icon } from "../base/icon";
import { Summary } from "../content/summary";

type ArticleSummaryProps = {
  article: Article;
  index: number;
  count: number;
};

export function ArticleSummary({ article, index, count }: ArticleSummaryProps) {
  const external = "url" in article;
  const href = external ? article.url : `/articles/${article.slug}`;

  const linkIcon = external ? (
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
      external={external}
      index={index}
      count={count}
    />
  );
}
