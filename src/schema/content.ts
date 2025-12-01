import { UnknownContentSchema } from "./unknown-content";
import { z } from "zod";

const MarkdownSchema = z
  .string()
  .refine((value) => !/^# /m.test(value), { message: "Markdown should not contain an H1" });

export const ContentSchema = UnknownContentSchema.extend({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  tags: z.array(z.string()),
  markdown: MarkdownSchema,
});
