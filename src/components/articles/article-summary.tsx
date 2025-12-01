import type { Article } from "../../types";
import { Icon } from "../base/icon";
import { Summary } from "../content/summary";
import { isNullish } from "remeda";

type ArticleSummaryProps = {
  article: Article;
};

export function ArticleSummary({ article }: ArticleSummaryProps) {
  const href = isNullish(article.url) ? `/articles/${article.slug}` : article.url;

  const linkIcon = article.publisher ? (
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
          {article.title} {linkIcon}
        </>
      }
      url={href}
    >
      {article.description}
    </Summary>
  );
}
