import type { Content } from "../src/types";
import { mkdir, rm, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { stringify } from "yaml";

const CONTENT_DIRECTORY = join(import.meta.dirname, "..", "tmp", "test-content");

/**
 * Creates a unique temporary directory for test content files.
 * @returns The path to the created directory.
 */
export async function createContentDirectory(): Promise<string> {
  const directory = join(CONTENT_DIRECTORY, crypto.randomUUID());
  await mkdir(directory, { recursive: true });
  return directory;
}

/**
 * Removes a content directory created by {@link createContentDirectory}.
 * @param directory The path to the directory to remove.
 */
export async function removeContentDirectory(directory: string): Promise<void> {
  await rm(directory, { recursive: true, force: true });
}

/**
 * Writes a content object to a markdown file with YAML frontmatter. Derived fields (`content`,
 * `filePath`, and `images`) are excluded from the frontmatter, and `content` is written as the
 * markdown body.
 * @param directory The directory to write the file to.
 * @param content The content object to write.
 */
export async function createContentFile<T extends Content>(
  directory: string | undefined,
  content: T,
): Promise<T> {
  if (!directory) {
    throw new Error("A 'directory' is required to create a content file.");
  }

  const filePath = join(directory, content.filePath);
  const { content: body, filePath: _, images: __, ...frontmatter } = content;
  const markdown = `---\n${stringify(frontmatter).trim()}\n---\n\n${body}\n`;
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, markdown);
  return { ...content, filePath };
}
