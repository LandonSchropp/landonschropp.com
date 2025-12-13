import { Tags } from "../content/tags";
import type { ReactNode } from "react";

type HeaderLinkProps = {
  title: string;
  className: string;
  href?: string | undefined;
};

function HeaderTitle({ title, className, href }: HeaderLinkProps) {
  if (href === undefined) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: title }} />;
  }

  return (
    <a
      className={`${className} no-underline hover:underline`}
      href={href}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
}

const SECONDARY_TEXT_CLASS_NAME =
  "mx-auto text-base font-normal font-serif italic text-theme-lightText [&_a]:underline";

type HeaderProps = {
  /** Short label or category text that appears above the title */
  kicker?: ReactNode;
  /** The main heading text */
  title: string;
  /** Descriptive text, metadata, or byline that appears below the title */
  subtitle: ReactNode;
  /** Optional URL to make the title a clickable link */
  titleHref?: string | undefined;
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

export function Header({ kicker, title, titleHref, subtitle, tags, tagsIndexHref }: HeaderProps) {
  return (
    <header className="prose my-6 text-center">
      <h1 className="my-0">
        <span className={`${SECONDARY_TEXT_CLASS_NAME} my-1 block`}>{kicker}</span>{" "}
        <HeaderTitle className="block" href={titleHref} title={title} />
      </h1>
      <div className={`${SECONDARY_TEXT_CLASS_NAME} my-2`} data-testid="subtitle">
        {subtitle}
      </div>

      {tags && <Tags tags={tags} indexHref={tagsIndexHref} />}
    </header>
  );
}
