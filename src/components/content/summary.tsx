import { CSSProperties, ReactNode } from "react";

type SummaryProps = {
  title: ReactNode;
  url: string;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Summary({ title, url, children, style }: SummaryProps) {
  return (
    <a
      className={`border-theme-accent text-theme-text hocus:bg-theme-backgroundHighlight hocus:shadow-largeOutline hocus:shadow-theme-backgroundHighlight my-4 block border-l-[3px] pl-[calc(theme('spacing.3')-3px)] transition-all duration-75 ease-in outline-none`}
      href={url}
      style={style}
    >
      <h3 className="my-0 text-base">{title}</h3>
      <p className="my-0 italic">{children}</p>
    </a>
  );
}
