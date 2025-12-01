import { parseUnknownContent } from "@/schema";
import { Content, UnknownContent } from "@/types";
import { parseFrontmatter } from "@/utilities/frontmatter";
import { getMarkdownImageSourcePaths } from "@/utilities/markdown";
import { readFile } from "fs/promises";
import { glob } from "glob";
import { basename, join } from "path";

/**
 * Parses the provided content using the given parser.
 * @param value The content to parse.
 * @param parser The parser function to use.
 * @returns The parsed content.
 * @throws If parsing fails.
 */
function parseContent<T extends UnknownContent>(value: UnknownContent, parser: Parser<T>): T {
  try {
    return parser(value);
  } catch (error) {
    throw new Error(`Failed to parse content at '${value.filePath}': ${(error as Error).message}`);
  }
}

/**
 * Fetches the content of a file and parses it.
 * @param filePath The path to the file to fetch.
 */
async function fetchAndParseContent(filePath: string): Promise<UnknownContent> {
  const fileContent = await readFile(filePath, "utf8");

  const [frontMatter, markdown] = parseFrontmatter(filePath, fileContent);

  return parseUnknownContent({
    ...frontMatter,
    markdown: markdown.trim(),
    title: "title" in frontMatter ? frontMatter.title : basename(filePath, ".md"),
    filePath,
  });
}

type Parser<T extends UnknownContent> = (value: unknown) => T;

/**
 * Fetches all of the content files.
 * @param directory The directory path from which the content files should be fetched.
 * @param parser A parser function to convert the unknown content to the desired type.
 * @returns An array of contents.
 */
export async function fetchContents<T extends UnknownContent>(
  directory: string,
  parser: Parser<T>,
): Promise<T[]> {
  // Find all of the markdown files in the provided path.
  const files = await glob(join(directory, "**/*.md"));

  // Fetch and parse all of the contents in the given directory, filter out unpublished content, and
  // sort the contents by date in descending order.
  return (await Promise.all(files.map((filePath) => fetchAndParseContent(filePath))))
    .filter((content) => content.status === "Published")
    .toSorted((first, second) => second.date.localeCompare(first.date))
    .map((content) => parseContent(content, parser));
}

/**
 * Fetches a single content based on its slug.
 * @param slug The slug of the note.
 * @param path The path from which the content files should be fetched.
 * @returns The content with the provided slug.
 * @throws An error if the content could not be fetched.
 */
export async function fetchContent<T extends UnknownContent>(
  path: string,
  slug: string,
  parser: Parser<T>,
): Promise<T> {
  const content = (await fetchContents(path, parser)).find((content) => content.slug === slug);

  if (!content) {
    throw new Error(`Content with slug '${slug}' not found.`);
  }

  return content;
}

/**
 * Given an array of contents, this method returns object pairs of the content slugs and images
 * contained in the contents.
 * @param contents The contents to search.
 * @returns An array of objects containing the slug and image for each image contained the contents.
 */
export function extractImageSlugPairs(contents: Content[]): { slug: string; image: string }[] {
  return contents.flatMap(({ slug, markdown }) => {
    return getMarkdownImageSourcePaths(markdown).map((image) => ({ slug, image }));
  });
}
