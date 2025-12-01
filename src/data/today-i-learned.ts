import { fetchContent, fetchContents } from "./content";
import { TODAY_I_LEARNED_PATH } from "@/env";
import { parseTodayILearned } from "@/schema";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import z from "zod";

/**
 * Fetches all today I learneds (TILs).
 * @returns An array of today I learneds (TILs).
 */
export const fetchTodayILearneds = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(() => fetchContents(TODAY_I_LEARNED_PATH, parseTodayILearned));

/**
 * Fetches a single today I learned (TIL).
 * @param slug The slug of the today I learned (TIL).
 * @returns The today I learned (TIL) with the provided slug.
 */
export const fetchTodayILearned = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator(z.object({ slug: z.string() }))
  .handler(({ data: { slug } }) => fetchContent(TODAY_I_LEARNED_PATH, slug, parseTodayILearned));
