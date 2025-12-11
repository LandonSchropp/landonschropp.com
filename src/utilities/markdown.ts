import highlightJs from "highlight.js/lib/common";
import createMarkdownIt from "markdown-it";
import markdownItCallouts from "markdown-it-callouts";
import { posix } from "path";

const MARKDOWN_IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g;

/**
 * A markdown-it plugin that wraps tables in a responsive container.
 */
export default function tableWrapper(markdownit: createMarkdownIt): void {
  markdownit.renderer.rules.table_open = function () {
    return '<div class="overflow-x-auto my-4"><table>';
  };

  markdownit.renderer.rules.table_close = function () {
    return "</table></div>";
  };
}

// Create the renderer used to render the markdown
const markdownIt = createMarkdownIt({
  html: true,
  highlight: (code, language) => {
    if (language === "") {
      return code;
    }

    return highlightJs.highlight(code, { language }).value;
  },
});

// Load the plugin
markdownIt.use(tableWrapper);
markdownIt.use(markdownItCallouts, { defaultElementType: "aside", calloutTitleElementType: "p" });

/**
 * Converts markdown to html.
 */
export function convertMarkdownToHtml(markdown: string): string {
  return markdownIt.render(markdown);
}

/**
 * Prepend a prefix to all image source paths in the provided markdown.
 * @param markdown The markdown to process.
 * @param prefix The prefix to add to the image source paths.
 * @returns The markdown with the image source paths prepended with the provided prefix.
 */
export function prefixMarkdownImageSourcePaths(markdown: string, prefix: string | null): string {
  if (prefix === null) {
    return markdown;
  }

  return markdown.replace(MARKDOWN_IMAGE_REGEX, (_match, alt, src) => {
    return `![${alt}](${posix.join(prefix, src)})`;
  });
}

/**
 * @param markdown The markdown to search.
 * @returns The image source paths in the provided markdown.
 */
export function getMarkdownImageSourcePaths(markdown: string): string[] {
  return Array.from(markdown.matchAll(MARKDOWN_IMAGE_REGEX)).map((match) => match[2]);
}
