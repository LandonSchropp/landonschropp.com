import { ArticleSchema } from "../schema";
import z from "zod";

/** An object containing the metadata and markdown of an article. */
export type Article = z.infer<typeof ArticleSchema>;

/** An article that was written and has markdown content. */
export type InternalArticle = Extract<Article, { publisher: undefined }>;

/** An article that references external content. */
export type ExternalArticle = Extract<Article, { publisher: string }>;
