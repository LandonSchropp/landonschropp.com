import { ContentSchema } from "./content";
import { z } from "zod";

export const TodayILearnedSchema = ContentSchema;

/**
 * Parses the provided value as a today I learned (TIL).
 * @param value The value to parse.
 * @returns The parsed today I learned.
 * @throws If the value does not match the schema.
 */
export function parseTodayILearned(value: unknown): z.infer<typeof TodayILearnedSchema> {
  return TodayILearnedSchema.parse(value);
}
