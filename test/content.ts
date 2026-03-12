import { mkdir, rm } from "fs/promises";
import { join } from "path";

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
