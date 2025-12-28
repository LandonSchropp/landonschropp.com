import { STATUSES } from "../constants";
import { ImageSchema } from "./image";
import { parseSchema } from "./parse";
import { z } from "zod";

const H1_TAG_REGEX = /<h1[^>]*>/i;

const LowerKebabCase = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const ContentSchema = z.object({
  title: z.string(),
  date: z.iso.date(),
  status: z.enum(STATUSES),
  content: z.string().refine((html) => !H1_TAG_REGEX.test(html), {
    message: "Should not include an H1 tag",
  }),
  images: z.array(ImageSchema),
  filePath: z.string(),
  slug: LowerKebabCase,
  tags: z.array(LowerKebabCase),
});

export const LooseContentSchema = z.looseObject(ContentSchema.shape);

/**
 * Parses the provided value as content, passing through unknown properties.
 * @param value The value to parse.
 * @returns The parsed content.
 * @throws If the value does not match the schema.
 */
export function parseContent(value: unknown): z.infer<typeof LooseContentSchema> {
  return parseSchema(LooseContentSchema, value);
}
