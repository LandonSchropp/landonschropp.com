import type { ReactNode } from "react";

type TagsProps = {
  /** An array of Tag components to display */
  tags: ReactNode[];

  /** Additional class names to apply to the container */
  className?: string;
};

export function Tags({ tags, className }: TagsProps) {
  if (tags.length === 0) {
    return null;
  }

  return <div className={`flex flex-wrap justify-center gap-2 ${className}`}>{tags}</div>;
}
