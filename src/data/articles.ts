import { ARTICLES_PATH } from "../env";
import { parseArticle } from "../schema";
import { fetchContent, fetchContents } from "./content";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import z from "zod";

/**
 * Fetches all articles.
 * @returns An array of articles.
 */
export const fetchArticles = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(() => fetchContents(ARTICLES_PATH, parseArticle));

/**
 * Fetches a single article.
 * @param slug The slug of the article.
 * @returns The article with the provided slug.
 */
export const fetchArticle = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator(z.object({ slug: z.string() }))
  .handler(({ data: { slug } }) => fetchContent(ARTICLES_PATH, slug, parseArticle));
