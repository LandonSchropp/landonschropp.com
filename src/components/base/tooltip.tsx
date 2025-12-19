import { tailwind } from "../../utilities/tailwind";
import { CSSProperties } from "react";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  className?: string;
};

//

const BEFORE_CLASS_NAMES = tailwind`before:border-b-theme-lightText before:pointer-events-none before:absolute before:top-[calc(100%-var(--triangle-size)/4)] before:left-[50%] before:block before:translate-x-[-50%] before:border-[calc(var(--triangle-size)/2+0.5px)] before:border-transparent before:opacity-0 before:transition-all before:duration-75 hover:before:opacity-100`;

const AFTER_CLASS_NAMES = tailwind`after:text-theme-background after:bg-theme-lightText after:pointer-events-none0 after:absolute after:top-[calc(100%-var(--triangle-size)/4)] after:left-[50%] after:block after:-translate-x-1/2 after:translate-y-(--triangle-size) after:rounded after:p-0.5 after:font-sans after:text-xs after:opacity-0 after:duration-75 after:content-[attr(data-tooltip)] hover:after:opacity-100`;

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span
      className={`relative ${BEFORE_CLASS_NAMES} ${AFTER_CLASS_NAMES} ${className}`}
      data-tooltip={content}
      style={
        {
          "--triangle-size": "calc(var(--spacing) * 1.5)",
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
