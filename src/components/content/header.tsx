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
  "mx-auto my-1 text-base font-normal font-serif italic text-theme-lightText [&_a]:underline";

type HeaderProps = {
  children?: ReactNode;
  superText?: ReactNode;
  title: string;
  subText: ReactNode;
  href?: string | undefined;
};

export function Header({ children, superText, title, href, subText }: HeaderProps) {
  return (
    <header className="prose my-6 text-center">
      <h1 className="my-0">
        <span className={`block ${SUPER_SUB_CLASS_NAME}`}>{superText}</span>{" "}
        <HeaderTitle className="block" href={href} title={title} />
      </h1>
      <div className={`my-2 block ${SUPER_SUB_CLASS_NAME}`} data-testid="sub-text">
        {subText}
      </div>

      {children}
    </header>
  );
}
