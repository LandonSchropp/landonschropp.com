import { generateImageHash, getImagePath } from "../data/image";
import type { Image } from "../types";
import highlightJs from "highlight.js/lib/common";
import createMarkdownIt from "markdown-it";
import markdownItCallouts from "markdown-it-callouts";
import { dirname, join } from "path";

const MARKDOWN_IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/g;

/**
 * A markdown-it plugin that wraps tables in a responsive container.
 * @param markdownit The markdown-it instance.
 */
function tableWrapper(markdownit: createMarkdownIt): void {
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

// Load the plugins
markdownIt.use(tableWrapper);
markdownIt.use(markdownItCallouts, { defaultElementType: "aside", calloutTitleElementType: "p" });

/**
 * Renders markdown to html.
 * @param markdown The markdown to render.
 * @returns The rendered html.
 */
export function renderMarkdown(markdown: string): string {
  return markdownIt.render(markdown).trim();
}

/**
 * Renders inline markdown to html. The results will not be wrapped in block elements.
 * @param markdown The markdown to render.
 * @returns The rendered html.
 */
export function renderInlineMarkdown(markdown: string): string {
  return markdownIt.renderInline(markdown).trim();
}

/**
 * Replace image source paths in markdown with their hashed URLs.
 * @param markdown The markdown to process.
 * @param images Array of Image objects containing source and hash.
 * @returns The markdown with image source paths replaced with hashed URLs.
 */
export function replaceMarkdownImages(markdown: string, images: Image[]): string {
  return markdown.replace(MARKDOWN_IMAGE_REGEX, (_match, alt, src) => {
    const image = images.find((image) => image.source === src)!;
    return `![${alt}](${getImagePath(image)})`;
  });
}

/**
 * Extracts image information from markdown and generates Image objects with content-based hashes.
 * @param markdown The markdown to search.
 * @param filePath The path to the markdown file.
 * @returns Array of Image objects with source, filePath, and hash.
 */
export async function getMarkdownImages(markdown: string, filePath: string): Promise<Image[]> {
  const baseDirectory = dirname(filePath);
  const matches = Array.from(markdown.matchAll(MARKDOWN_IMAGE_REGEX));

  return Promise.all(
    matches.map(async (match) => {
      const source = match[2];
      const imageFilePath = join(baseDirectory, source);
      const hash = await generateImageHash(imageFilePath);

      return {
        source,
        filePath: imageFilePath,
        hash,
      };
    }),
  );
}
