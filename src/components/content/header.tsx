import type { ReactNode } from "react";
import { isNullish } from "remeda";

type HeaderLinkProps = {
  children: ReactNode;
  href?: string | undefined;
};

function HeaderLink({ children, href }: HeaderLinkProps) {
  if (isNullish(href)) {
    return children;
  }

  return (
    <a className="no-underline hover:underline" href={href}>
      {children}
    </a>
  );
}

type HeaderProps = {
  children?: ReactNode;
  superText?: ReactNode;
  title: ReactNode;
  subText: ReactNode;
  href?: string | undefined;
};

export function Header({ children, superText, title, href, subText }: HeaderProps) {
  const superSubClassName =
    "mx-auto my-1 text-base font-normal font-serif italic text-theme-lightText [&_a]:underline";

  return (
    <header className="prose my-6 text-center">
      <h1 className="my-0">
        <span className={`block ${superSubClassName}`}>{superText}</span>{" "}
        <span className="block">
          <HeaderLink href={href}>{title}</HeaderLink>
        </span>
      </h1>
      <div className={`my-2 block ${superSubClassName}`} data-testid="sub-text">
        {subText}
      </div>

      {children}
    </header>
  );
}
