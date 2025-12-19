import { Tag } from "../content/tag";
import { Tags } from "../content/tags";
import { Link } from "@tanstack/react-router";
import { CSSProperties, ReactNode } from "react";

type SummaryProps = {
  title: ReactNode;
  description: ReactNode;
  url: string;
  external?: boolean;
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
  external = false,
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

  // Ensure that there are at least 5 steps in the color gradient
  count = count < 5 ? 5 : count;

  // Calculate the color mix percentage based on the index
  const colorMixPercentage = 100 - (index / (count - 1)) * 100;

  const linkClassName = "outline-none after:absolute after:inset-0";

  return (
    <div
      className="hover:[&:not(:has(h3~div_a:hover))]:bg-theme-backgroundHighlight hover:[&:not(:has(h3~div_a:hover))]:ring-theme-backgroundHighlight focus:bg-theme-backgroundHighlight focus:ring-theme-backgroundHighlight relative my-4 block border-l-[3px] border-l-[color-mix(in_oklab,var(--color-bittersweet)_var(--color-mix-percentage),var(--color-cornflower))] pl-[calc(--spacing(3)-3px)] transition-all duration-75 ease-in outline-none focus:ring-[length:--spacing(2)] hover:[&:not(:has(h3~div_a:hover))]:ring-[length:--spacing(2)]"
      style={{ "--color-mix-percentage": `${colorMixPercentage}%` } as CSSProperties}
    >
      <h3 className="prose my-0 text-base font-bold [&>a]:text-inherit">
        {external ? (
          <a href={url} className={linkClassName} {...titleAttributes} />
        ) : (
          <Link to={url} className={linkClassName} {...titleAttributes} />
        )}
      </h3>
      <p className="prose my-0 italic" {...descriptionAttributes} />
      {tags && (
        <Tags
          className="justify-start"
          tags={tags.map((tag) => (
            <Tag key={tag} name={tag} href={`${tagsIndexHref}?tag=${tag}`} />
          ))}
        />
      )}
    </div>
  );
}
