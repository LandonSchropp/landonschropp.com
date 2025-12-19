import { dedent } from "ts-dedent";
import z from "zod";

const valueHasProperty = <T, P extends string>(
  value: unknown,
  property: P,
): value is T & Record<P, string> => {
  return typeof value === "object" && value !== null && property in value;
};

/**
 * Custom error class for schema parsing errors.
 */
export class SchemaParseError extends Error {
  constructor(error: z.ZodError, value: unknown) {
    // If we have a filePath property, use it as the target.
    const target = valueHasProperty(value, "filePath") ? `'${value.filePath}'` : "schema";

    // If we have a content property, truncate it.
    value = valueHasProperty(value, "content")
      ? {
          ...value,
          content: `${value.content.slice(0, 60).replace(/\s+\S+$/, "")}... (truncated)`,
        }
      : value;

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
