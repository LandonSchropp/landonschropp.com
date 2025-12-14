import { Tags } from "../content/tags";
import type { ReactNode } from "react";

type HeaderTitleProps = {
  title: string;
  href?: string;
};

function HeaderTitle({ title, href }: HeaderTitleProps) {
  if (href === undefined) {
    return (
      <span className="text-theme-accent my-2 block" dangerouslySetInnerHTML={{ __html: title }} />
    );
  }

  return (
    <a
      className="text-theme-accent my-2 block no-underline hover:underline"
      href={href}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
}

const SECONDARY_TEXT_CLASS_NAME =
  "mx-auto text-base font-normal font-serif italic text-theme-lightText [&_a]:underline my-2";

type HeaderProps = {
  /**
   * Text displayed above the title. This is considered part of the title from SEO and accessibility
   * perspectives, but visually separated to provide additional context.
   */
  kicker?: ReactNode;

  /** The main heading text */
  title: string;

  /** The URL associated with the title, if applicable. */
  titleHref?: string;

  /** Descriptive text, metadata, or byline that appears below the title */
  subtitle: ReactNode;

  /** Optional array of Tag components to display */
  tags?: ReactNode[];
};

/**
 * The Header is responsible for displaying a title (along with several surrounding elements) in the
 * following order:
 *
 * 1. `kicker` (Optional)
 * 2. `title` (Required)
 * 3. `subtitle` (Optional)
 * 4. `tags` (Optional)
 */
export function Header({ kicker, title, titleHref, subtitle, tags }: HeaderProps) {
  return (
    <header className="prose my-6 text-center">
      <h1 className="my-2">
        <span className={`${SECONDARY_TEXT_CLASS_NAME} block`}>{kicker}</span>{" "}
        <HeaderTitle title={title} href={titleHref} />
      </h1>
      {subtitle && (
        <div className={`${SECONDARY_TEXT_CLASS_NAME} my-2`} data-testid="subtitle">
          {subtitle}
        </div>
      )}

      {tags && <Tags className="my-2" tags={tags} />}
    </header>
  );
}
