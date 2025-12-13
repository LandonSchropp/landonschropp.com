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

const SUPER_SUB_CLASS_NAME =
  "mx-auto text-base font-normal font-serif italic text-theme-lightText [&_a]:underline";

type HeaderProps = {
  superText?: ReactNode;
  title: string;
  subText: ReactNode;
  href?: string | undefined;
  tags?: string[];
};

export function Header({ superText, title, href, subText, tags }: HeaderProps) {
  return (
    <header className="prose my-6 text-center">
      <h1 className="my-0">
        <span className={`${SUPER_SUB_CLASS_NAME} my-1 block`}>{superText}</span>{" "}
        <HeaderTitle className="block" href={href} title={title} />
      </h1>
      <div className={`${SUPER_SUB_CLASS_NAME} my-2`} data-testid="sub-text">
        {subText}
      </div>

      <Tags tags={tags} />
    </header>
  );
}
