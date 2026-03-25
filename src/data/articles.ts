import { fetchEnvironmentVariable } from "../env";
import { parseArticle } from "../schema";
import { Article } from "../types";
import { fetchContents } from "./content";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import z from "zod";

/**
 * Fetches all articles from both the active and archive directories.
 * @returns An array of articles.
 */
export async function fetchArticles(): Promise<Article[]> {
  const [active, archive] = await Promise.all([
    fetchContents(fetchEnvironmentVariable("PRISMATIC_PATH")),
    fetchContents(fetchEnvironmentVariable("ARTICLES_PATH")),
  ]);

  return [...active, ...archive].toSorted((a, b) => b.date.localeCompare(a.date)).map(parseArticle);
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
 * Fetches a single article from either the active or archive directory.
 * @param slug The slug of the article.
 * @returns The article with the provided slug.
 */
export async function fetchArticle(slug: string): Promise<Article> {
  const articles = await fetchArticles();
  const article = articles.find((article) => article.slug === slug);

  if (!article) {
    throw new Error(`Content with slug '${slug}' not found.`);
  }

  return article;
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
