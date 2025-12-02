import { dedent } from "ts-dedent";
import z from "zod";

/**
 * Custom error class for schema parsing errors.
 */
export class SchemaParseError extends Error {
  constructor(error: z.ZodError, value: unknown) {
    const target =
      typeof value === "object" &&
      value !== null &&
      "filePath" in value &&
      typeof value.filePath === "string"
        ? `'${value.filePath}'`
        : "schema";

    const message = dedent`
      Error parsing ${target}: ${error.message}

      ${JSON.stringify(value, null, 2)}
    `;

    super(message);
    this.name = "SchemaParseError";
  }
}

/**
 * Parses the provided value using the given Zod schema.
 * @param schema The Zod schema to use for parsing.
 * @param value The value to parse.
 * @param filePath Optional file path for error context.
 * @returns The parsed value.
 * @throws ZodError If the value does not match the schema, with a detailed error message.
 */
export function parseSchema<S extends z.ZodSchema>(schema: S, value: unknown): z.infer<S> {
  try {
    return schema.parse(value);
  } catch (error) {
    throw error instanceof z.ZodError ? new SchemaParseError(error, value) : error;
  }
}
