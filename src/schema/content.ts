import { parseSchema } from "./parse";
import { UnknownContent } from "@/types";
import { z } from "zod";

const MarkdownSchema = z
  .string()
  .refine((value) => !/^# /m.test(value), { message: "Markdown should not contain an H1" });

export const ContentSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  date: z.string().date(),
  status: z.enum(["Idea", "Draft", "Published", "Will Not Publish"]),
  tags: z.array(z.string()),
  markdown: MarkdownSchema,
  filePath: z.string(),
});

/**
 * Parses the provided value as content, passing through unknown properties.
 * @param value The value to parse.
 * @returns The parsed today I learned.
 * @throws If the value does not match the schema.
 */
export function parseUnknownContent(value: unknown): UnknownContent {
  return parseSchema(ContentSchema.passthrough(), value);
}
