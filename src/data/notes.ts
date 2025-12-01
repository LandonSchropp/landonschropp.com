import { fetchContent, fetchContents } from "./content";
import { NOTES_PATH } from "@/env";
import { parseNote } from "@/schema";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import z from "zod";

/**
 * Fetches all notes.
 * @returns An array of notes.
 */
export const fetchNotes = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(() => fetchContents(NOTES_PATH, parseNote));

/**
 * Fetches a single note.
 * @param slug The slug of the note.
 * @returns The note with the provided slug.
 */
export const fetchNote = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator(z.object({ slug: z.string() }))
  .handler(({ data: { slug } }) => fetchContent(NOTES_PATH, slug, parseNote));
