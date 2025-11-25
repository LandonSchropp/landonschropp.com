import { convertMarkdownToHtml, prefixMarkdownImageSourcePaths } from "@/utilities/markdown";

type MarkdownProps = {
  markdown: string;
  slug: string;
};

/**
 * A component that renders markdown as HTML.
 * @param markdown The markdown to render.
 */
export function Markdown({ markdown, slug }: MarkdownProps) {
  markdown = prefixMarkdownImageSourcePaths(markdown, slug);
  return (
    <section
      className="prose"
      dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown) }}
    />
  );
}
