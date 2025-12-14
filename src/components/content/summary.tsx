import { Tags } from "../content/tags";
import { CSSProperties, ReactNode } from "react";

type SummaryProps = {
  title: ReactNode;
  description: ReactNode;
  url: string;
  index: number;
  count: number;
} & (
  | {
      /** An array of tag names to display */
      tags: string[];
      /**
       * The URL for tag links (e.g., "/notes"). Individual tag hrefs will be constructed by
       * appending a tag query parameter to this URL.
       */
      tagsIndexHref: string;
    }
  | {
      tags?: never;
      tagsIndexHref?: never;
    }
);

export function Summary({
  title,
  url,
  description,
  tags,
  tagsIndexHref,
  index,
  count,
}: SummaryProps) {
  const titleAttributes =
    typeof title === "string"
      ? { dangerouslySetInnerHTML: { __html: title } }
      : { children: title };

  const descriptionAttributes =
    typeof description === "string"
      ? { dangerouslySetInnerHTML: { __html: description } }
      : { children: description };

  const colorMixPercentage = count === 1 ? 0 : 100 - (index / (count - 1)) * 100;

  return (
    <a
      className="text-theme-text hocus:bg-theme-backgroundHighlight hocus:ring-[length:--spacing(2)] hocus:ring-theme-backgroundHighlight my-4 block border-l-[3px] border-l-[color-mix(in_oklab,var(--color-cornflower)_var(--color-mix-percentage),var(--color-bittersweet))] pl-[calc(--spacing(3)-3px)] transition-all duration-75 ease-in outline-none"
      href={url}
      style={{ "--color-mix-percentage": `${colorMixPercentage}%` } as CSSProperties}
    >
      <h3 className="my-0 text-base" {...titleAttributes} />
      <p className="my-0 italic" {...descriptionAttributes} />
      {tags && <Tags tags={tags} indexHref={tagsIndexHref} className="justify-start" />}
    </a>
  );
}
