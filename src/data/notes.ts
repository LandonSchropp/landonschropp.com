import { fetchEnvironmentVariable } from "../env";
import { parseNote } from "../schema";
import { Note } from "../types";
import { fetchContent, fetchContents } from "./content";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import z from "zod";

/**
 * Fetches all notes.
 * @returns An array of notes.
 */
export async function fetchNotes(): Promise<Note[]> {
  return await fetchContents(fetchEnvironmentVariable("NOTES_PATH"), parseNote);
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
  return await fetchContent(fetchEnvironmentVariable("NOTES_PATH"), slug, parseNote);
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
