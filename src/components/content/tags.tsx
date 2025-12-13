type TagProps = {
  name: string;
  href: string;
};

function Tag({ name, href }: TagProps) {
  return (
    <a
      href={href}
      className="text-theme-extraLightText text-sm leading-[calc(var(--text-base)*var(--text-base--line-height))] hover:underline"
    >
      #{name}
    </a>
  );
}

type TagsProps = {
  /** An array of tag names to display */
  tags: string[];
  /**
   * The URL for tag links (e.g., "/notes"). Individual tag hrefs will be constructed by appending a
   * tag query parameter to this URL.
   */
  indexHref: string;

  /** Additional class names to apply to the container */
  className?: string;
};

export function Tags({ tags, indexHref, className }: TagsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${className}`}>
      {tags.map((tag) => (
        <Tag key={tag} name={tag} href={`${indexHref}?tag=${tag}`} />
      ))}
    </div>
  );
}
