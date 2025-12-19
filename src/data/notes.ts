import { fetchEnvironmentVariable } from "../env";
import { parseNote } from "../schema";
import { PassthroughContent } from "../types";
import { Note } from "../types";
import { fetchContent, fetchContents } from "./content";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import { availableIsbns } from "virtual:book-covers";
import z from "zod";

/**
 * Adds additional properties to content that need to be computed.
 * @param content The content to process.
 * @returns The content with additional properties added.
 */
function addHasBookCoverImage(content: PassthroughContent) {
  return {
    ...content,
    hasBookCoverImage:
      "isbn" in content && typeof content.isbn === "number" && availableIsbns.has(content.isbn),
  };
}

/**
 * Fetches all notes.
 * @returns An array of notes.
 */
export async function fetchNotes(): Promise<Note[]> {
  return (await fetchContents(fetchEnvironmentVariable("NOTES_PATH"))).map((content) =>
    parseNote(addHasBookCoverImage(content)),
  );
}

/**
 * Fetches all notes. This is a static server function, and will return the cached result with
 * called from the client.
 * @returns An array of notes.
 */
export const fetchNotesServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(() => fetchNotes());

/**
 * Fetches a single note.
 * @param slug The slug of the note.
 * @returns The note with the provided slug.
 */
export async function fetchNote(slug: string): Promise<Note> {
  const content = await fetchContent(fetchEnvironmentVariable("NOTES_PATH"), slug);
  return parseNote(addHasBookCoverImage(content));
}

/**
 * Fetches a single note. This is a static server function, and will return the cached result with
 * called from the client.
 * @param slug The slug of the note.
 * @returns The note with the provided slug.
 */
export const fetchNoteServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator(z.object({ slug: z.string() }))
  .handler(({ data: { slug } }) => fetchNote(slug));
