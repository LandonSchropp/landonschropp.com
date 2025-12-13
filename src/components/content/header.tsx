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
  /** Optional array of tag strings to display */
  tags?: string[];
};

export function Header({ kicker, title, titleHref, subtitle, tags }: HeaderProps) {
  return (
    <header className="prose my-6 text-center">
      <h1 className="my-0">
        <span className={`${SECONDARY_TEXT_CLASS_NAME} my-1 block`}>{kicker}</span>{" "}
        <HeaderTitle className="block" href={titleHref} title={title} />
      </h1>
      <div className={`${SECONDARY_TEXT_CLASS_NAME} my-2`} data-testid="subtitle">
        {subtitle}
      </div>

      <Tags tags={tags} />
    </header>
  );
}
