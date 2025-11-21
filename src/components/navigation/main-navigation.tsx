import { Icon } from "../base/icon";
import { NAME } from "@/constants";
import { useLocation } from "@tanstack/react-router";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: boolean;
};

function isCurrent(pathname: string, href: string): boolean {
  if (href === "/") {
    return href === pathname;
  }

  return pathname.startsWith(href);
}

function Link({ href, children, icon = false }: LinkProps) {
  const { pathname } = useLocation();

  const className = icon ? "hocus:text-theme-accent" : "font-sans text-theme-lightText ";

  const shocusClassName = !icon
    ? "shocus:shadow-[0_3px] shadow-theme-accent shocus:text-theme-accent"
    : "";

  return (
    <a
      className={`mx-2 block text-inherit transition-all duration-75 ease-in ${className} ${shocusClassName}`}
      href={href}
      {...(isCurrent(pathname, href) && { "aria-current": "page" })}
    >
      {children}
    </a>
  );
}

export function MainNavigation() {
  return (
    <nav className="text-theme-extraLightText my-3 flex gap-3 px-2 text-sm max-lg:flex-col lg:justify-between">
      <div className="flex justify-center">
        <Link href="/">
          <span className="max-md:hidden">{NAME}</span>
          <span className="md:hidden">Home</span>
        </Link>

        <Link href="/articles">Writing</Link>
        <Link href="/notes">Notes</Link>
        <Link href="/today-i-learned">
          <abbr className="no-underline lg:hidden" title="Today I Learned">
            TIL
          </abbr>
          <span className="max-lg:hidden">Today I Learned</span>
        </Link>
      </div>
      <div className="flex justify-center">
        <Link href="https://github.com/LandonSchropp" icon>
          <Icon className="h-3.6" name="github" alt="GitHub" />
        </Link>

        <Link href="https://www.chess.com/member/landon" icon>
          <Icon className="h-3.6" name="chessCom" alt="Chess.com" />
        </Link>

        <Link href="https://www.linkedin.com/in/landonschropp" icon>
          <Icon className="h-3.6" name="linkedin" alt="LinkedIn" />
        </Link>

        <Link href="mailto:schroppl@gmail.com" icon>
          <Icon className="h-3.6" name="email" alt="Email" />
        </Link>
      </div>
    </nav>
  );
}
