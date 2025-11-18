import { fetchContent, fetchContents } from "./content";
import { ARTICLES_PATH } from "@/env";
import { parseArticle } from "@/schema";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import z from "zod";

/**
 * Fetches all articles.
 * @returns An array of articles.
 */
export const fetchArticles = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return (await fetchContents(ARTICLES_PATH)).map(parseArticle);
  });

/**
 * Fetches a single article.
 * @param slug The slug of the article.
 * @returns The article with the provided slug.
 */
export const fetchArticle = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data: { slug } }) => {
    return parseArticle(await fetchContent(ARTICLES_PATH, slug));
  });
