import { STATUSES } from "../constants";
import { parseSchema } from "./parse";
import { z } from "zod";

const H1_TAG_REGEX = /<h1[^>]*>/i;

export const ContentSchema = z.object({
  title: z.string(),
  date: z.string().date(),
  status: z.enum(STATUSES),
  content: z.string().refine((html) => !H1_TAG_REGEX.test(html), {
    message: "Should not include an H1 tag",
  }),
  images: z.array(z.string()),
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
