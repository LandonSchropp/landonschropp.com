import type { ReactNode } from "react";

export type TagProps = {
  name: string;
  href: string;
  icon?: ReactNode;
  selected?: boolean;
};

export function Tag({ name, href }: TagProps) {
  return (
    <a
      href={href}
      className="text-theme-extraLightText text-sm leading-[calc(var(--text-base)*var(--text-base--line-height))] hover:underline"
    >
      #{name}
    </a>
  );
}
