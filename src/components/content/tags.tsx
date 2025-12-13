type TagProps = {
  tag: string;
  href: string;
};

function Tag({ tag, href }: TagProps) {
  return (
    <a href={href} className="text-theme-extraLightText text-sm hover:underline">
      #{tag}
    </a>
  );
}

type TagsProps = {
  tags?: string[];
};

export function Tags({ tags }: TagsProps) {
  if (tags === undefined || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} href="http://example.com" />
      ))}
    </div>
  );
}
