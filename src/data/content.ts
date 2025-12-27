import { parseContent } from "../schema";
import { Content, PassthroughContent } from "../types";
import { parseFrontmatter } from "../utilities/frontmatter";
import {
  renderMarkdown,
  getMarkdownImages,
  replaceMarkdownImages,
  renderInlineMarkdown,
} from "../utilities/markdown";
import { createServerOnlyFn } from "@tanstack/react-start";
import { glob, readFile } from "fs/promises";
import { basename, join } from "path";

/**
 * Fetches the content of a file and parses it.
 * @param filePath The path to the file to fetch.
 */
async function fetchAndParseContent(filePath: string): Promise<PassthroughContent> {
  const fileContent = await readFile(filePath, "utf8");

  const [frontMatter, markdown] = parseFrontmatter(filePath, fileContent);

  // Extract image paths from the original markdown (before replacing).
  const images = await getMarkdownImages(markdown, filePath);

  // Replace image paths for rendering and render the markdown to HTML.
  const replacedMarkdown = replaceMarkdownImages(markdown, images);
  const content = renderMarkdown(replacedMarkdown).trim();

  // Render the title and description properties.
  const title = renderInlineMarkdown(frontMatter.title ?? basename(filePath, ".md"));
  const description = frontMatter.description && renderInlineMarkdown(frontMatter.description);

  return parseContent({
    tags: [],
    ...frontMatter,
    title,
    description,
    content,
    images,
    filePath,
  });
}

/**
 * Fetches all of the content files.
 * @param directory The directory path from which the content files should be fetched.
 * @returns An array of contents.
 */
export const fetchContents = createServerOnlyFn(
  async (directory: string): Promise<PassthroughContent[]> => {
    // Find all of the markdown files in the provided path.
    const files = await Array.fromAsync(glob(join(directory, "**/*.md")));

    // Fetch and parse all of the contents in the given directory, filter out unpublished content, and
    // sort the contents by date in descending order.
    return (await Promise.all(files.map((filePath) => fetchAndParseContent(filePath))))
      .filter((content) => content.status === "Published")
      .toSorted((first, second) => second.date.localeCompare(first.date));
  },
);

/**
 * Fetches a single content based on its slug.
 * @param slug The slug of the note.
 * @param path The path from which the content files should be fetched.
 * @returns The content with the provided slug.
 * @throws An error if the content could not be fetched.
 */
export const fetchContent = createServerOnlyFn(
  async (path: string, slug: string): Promise<PassthroughContent> => {
    const content = (await fetchContents(path)).find((content) => content.slug === slug);

    if (!content) {
      throw new Error(`Content with slug '${slug}' not found.`);
    }

    return content;
  },
);

/**
 * Filters an array of contents by the provided tag.
 * @param contents The contents to filter.
 * @param tag The tag to filter by. If undefined, no filtering is applied.
 * @returns The filtered contents.
 */
export function filterContentsByTag<T extends Content>(
  contents: T[],
  tag: string | undefined,
): T[] {
  return tag ? contents.filter((content) => content.tags.includes(tag)) : contents;
}

/**
 * Gets all unique tags from an array of contents, sorted alphabetically.
 * @param contents The contents to extract tags from.
 * @returns An array of unique tag names, sorted alphabetically.
 */
export function getAllTags<T extends Content>(contents: T[]): string[] {
  return Array.from(new Set<string>(contents.flatMap(({ tags }) => tags))).sort();
}
