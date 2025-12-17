import { fetchEnvironmentVariable } from "../env";
import { parseArticle } from "../schema";
import { Article } from "../types";
import { fetchContent, fetchContents } from "./content";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import z from "zod";

/**
 * Fetches all articles.
 * @returns An array of articles.
 */
export async function fetchArticles(): Promise<Article[]> {
  return await fetchContents(fetchEnvironmentVariable("ARTICLES_PATH"), parseArticle);
}

/**
 * Fetches all articles. This is a static server function, and will return the cached result with
 * called from the client.
 * @returns An array of articles.
 */
export const fetchArticlesServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(() => fetchArticles());

/**
 * Fetches a single article.
 * @param slug The slug of the article.
 * @returns The article with the provided slug.
 */
export async function fetchArticle(slug: string): Promise<Article> {
  return await fetchContent(fetchEnvironmentVariable("ARTICLES_PATH"), slug, parseArticle);
}

/**
 * Fetches a single article. This is a static server function, and will return the cached result
 * with called from the client.
 * @param slug The slug of the article.
 * @returns The article with the provided slug.
 */
export const fetchArticleServerFn = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator(z.object({ slug: z.string() }))
  .handler(({ data: { slug } }) => fetchArticle(slug));
