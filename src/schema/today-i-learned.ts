import { ContentSchema } from "./content";
import { TodayILearned } from "@/types";

export const TodayILearnedSchema = ContentSchema;

/**
 * Parses the provided value as a today I learned (TIL).
 * @param value The value to parse.
 * @returns The parsed today I learned.
 * @throws If the value does not match the schema.
 */
export function parseTodayILearned(value: unknown): TodayILearned {
  return TodayILearnedSchema.parse(value);
}
