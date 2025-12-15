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

  // NOTE: The height is explicitly set to match the line height of the regular text.
  return (
    <div
      className={`flex h-[calc(var(--text-base)*var(--text-base--line-height))] flex-wrap items-center justify-center gap-2 ${className}`}
    >
      {tags}
    </div>
  );
}
