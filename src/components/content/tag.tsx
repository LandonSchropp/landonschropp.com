import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export type TagProps = {
  name: string;
  href: string;
  icon?: ReactNode;
  selected?: boolean;
};

const SELECTED_CLASS_NAMES =
  "text-theme-lightText ring-theme-backgroundHighlight ring-[length:--spacing(1)] bg-theme-backgroundHighlight relative before:absolute before:left-[0] before:w-[0] before:transition-all hocus:before:w-[calc(--spacing(0)+100%)] before:top-[50%] before:h-[2px] before:bg-theme-lightText hocus:ring-0 hocus:right-transparent hocus:bg-transparent hocus:text-theme-extraLightText";

const UNSELECTED_CLASS_NAMES =
  "hocus:ring-theme-backgroundHighlight hocus:text-theme-header hocus:ring-[length:--spacing(1)] hocus:bg-theme-backgroundHighlight";

export function Tag({ name, href, selected }: TagProps) {
  const selectedClassNames = selected ? SELECTED_CLASS_NAMES : UNSELECTED_CLASS_NAMES;

  return (
    <Link
      to={href}
      className={`text-theme-extraLightText relative z-10 -mx-0.5 inline-block rounded-full px-0.5 text-sm leading-none transition-all duration-75 ease-in ${selectedClassNames}`}
    >
      #{name}
    </Link>
  );
}
