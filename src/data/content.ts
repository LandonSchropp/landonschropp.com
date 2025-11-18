import { parseUnknownContent } from "@/schema";
import { Content, UnknownContent } from "@/types";
import { parseFrontmatter } from "@/utilities/frontmatter";
import { getMarkdownImageSourcePaths } from "@/utilities/markdown";
import { readFile } from "fs/promises";
import { glob } from "glob";
import { basename, join, relative } from "path";

/**
 * Fetches the content of a file and parses it.
 * @param contentPath The directory containing the content files.
 * @param filePath The path to the file to fetch.
 */
async function fetchAndParseContent(
  contentPath: string,
  filePath: string,
): Promise<UnknownContent> {
  const relativePath = relative(contentPath, filePath);
  const fileContent = await readFile(filePath, "utf8");
  const pathParts = relativePath.split("/");

  const [frontMatter, markdown] = parseFrontmatter(filePath, fileContent);

  return parseUnknownContent({
    ...frontMatter,
    markdown: markdown.trim(),
    category: pathParts.length > 1 ? pathParts[0] : frontMatter.category,
    title: "title" in frontMatter ? frontMatter.title : basename(filePath, ".md"),
    filePath,
  });
}

/**
 * Fetches all of the content files.
 * @param path The path from which the content files should be fetched.
 * @returns An array of contents.
 */
export async function fetchContents(path: string): Promise<UnknownContent[]> {
  // Find all of the markdown files in the provided path.
  const files = await glob(join(path, "**/*.md"));

  // Fetch and parse all of the contents in the given directory, filter out unpublished content, and
  // sort the contents by date in descending order.
  return (await Promise.all(files.map((filePath) => fetchAndParseContent(path, filePath))))
    .filter((content) => content.status === "Published")
    .toSorted((first, second) => second.date.localeCompare(first.date));
}

/**
 * Fetches a single content based on its slug.
 * @param slug The slug of the note.
 * @param path The path from which the content files should be fetched.
 * @returns The content with the provided slug.
 * @throws An error if the content could not be fetched.
 */
export async function fetchContent(path: string, slug: string): Promise<UnknownContent> {
  const content = (await fetchContents(path)).find((content) => content.slug === slug);

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
