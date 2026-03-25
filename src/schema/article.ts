import { ContentSchema } from "./content";
import { parseSchema } from "./parse";
import { z } from "zod";

const ExternalArticleSchema = ContentSchema.extend({
  description: z.string(),
  publisher: z.string(),
  url: z.url(),
});

const InternalArticleSchema = ContentSchema.extend({
  description: z.string(),
  publisher: z.never().optional(),
  url: z.never().optional(),
});

export const ArticleSchema = z.union([ExternalArticleSchema, InternalArticleSchema]);

/**
 * Parses the provided value as a note.
 * @param value The value to parse.
 * @returns The parsed note.
 * @throws If the value does not match the schema.
 */
export function parseArticle(value: unknown): z.infer<typeof ArticleSchema> {
  return parseSchema(ArticleSchema, value);
}
