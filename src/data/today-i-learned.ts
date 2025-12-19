import { fetchEnvironmentVariable } from "../env";
import { parseTodayILearned } from "../schema";
import { TodayILearned } from "../types";
import { fetchContent, fetchContents } from "./content";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import z from "zod";

/**
 * Fetches all today I learneds (TILs).
 * @returns An array of today I learneds (TILs).
 */
export async function fetchTodayILearneds(): Promise<TodayILearned[]> {
  return (await fetchContents(fetchEnvironmentVariable("TODAY_I_LEARNED_PATH"))).map(
    parseTodayILearned,
  );
}

/**
 * Fetches all today I learneds (TILs). This is a static server function, and will return the cached
 * result with called from the client.
 * @returns An array of today I learneds (TILs).
 */
export const fetchTodayILearnedsServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(() => fetchTodayILearneds());

/**
 * Fetches a single today I learned (TIL). * @param slug The slug of the today I learned (TIL).
 * @returns The today I learned (TIL) with the provided slug.
 */
export async function fetchTodayILearned(slug: string): Promise<TodayILearned> {
  return parseTodayILearned(
    await fetchContent(fetchEnvironmentVariable("TODAY_I_LEARNED_PATH"), slug),
  );
}

/**
 * Fetches a single today I learned (TIL). This is a static server function, and will return the
 * cached result with called from the client.
 * @param slug The slug of the today I learned (TIL).
 * @returns The today I learned (TIL) with the provided slug.
 */
export const fetchTodayILearnedServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator(z.object({ slug: z.string() }))
  .handler(({ data: { slug } }) => fetchTodayILearned(slug));
