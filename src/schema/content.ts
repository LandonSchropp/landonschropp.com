import { STATUSES } from "../constants";
import { parseSchema } from "./parse";
import { z } from "zod";

const MarkdownSchema = z
  .string()
  .refine((value) => !/^# /m.test(value), { message: "Markdown should not contain an H1" });

export const ContentSchema = z.object({
  title: z.string(),
  date: z.string().date(),
  status: z.enum(STATUSES),
  markdown: MarkdownSchema,
  filePath: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  tags: z.array(z.string()),
});

/**
 * Parses the provided value as content, passing through unknown properties.
 * @param value The value to parse.
 * @returns The parsed content.
 * @throws If the value does not match the schema.
 */
export function parseContent(
  value: unknown,
): z.infer<typeof ContentSchema> & z.PassthroughType<"passthrough"> {
  return parseSchema(ContentSchema.passthrough(), value);
}
