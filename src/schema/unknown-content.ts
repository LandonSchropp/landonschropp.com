import { parseSchema } from "./parse";
import { STATUSES } from "@/constants";
import { UnknownContent } from "@/types";
import { z } from "zod";

export const UnknownContentSchema = z.object({
  title: z.string(),
  date: z.string().date(),
  status: z.enum(STATUSES),
  markdown: z.string(),
  filePath: z.string(),
});

/**
 * Parses the provided value as content, passing through unknown properties.
 * @param value The value to parse.
 * @returns The parsed today I learned.
 * @throws If the value does not match the schema.
 */
export function parseUnknownContent(value: unknown): UnknownContent {
  return parseSchema(UnknownContentSchema.passthrough(), value);
}
