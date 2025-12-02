import { parseSchema, SchemaParseError } from "./parse";
import { describe, it, expect } from "vitest";
import z from "zod";

describe("parseSchema", () => {
  describe("when given valid input", () => {
    it("returns the parsed value", () => {
      const schema = z.object({ name: z.string() });
      const input = { name: "John" };
      const result = parseSchema(schema, input);
      expect(result).toEqual(input);
    });
  });

  describe("when given invalid input", () => {
    it("throws SchemaParseError", () => {
      const schema = z.object({ name: z.string() });
      const input = { name: 123 };
      expect(() => parseSchema(schema, input)).toThrow(SchemaParseError);
    });

    it("includes the validation error message", () => {
      const schema = z.object({ name: z.string() });
      const input = { name: 123 };
      expect(() => parseSchema(schema, input)).toThrow("Expected string");
    });

    it("includes the invalid value in the error message", () => {
      const schema = z.object({ name: z.string() });
      const input = { name: 123 };
      expect(() => parseSchema(schema, input)).toThrow(JSON.stringify(input, null, 2));
    });
  });
});

describe("SchemaParseError", () => {
  describe("when error includes a filePath", () => {
    it("uses the filePath in the error message", () => {
      const schema = z.object({ name: z.string() });
      const input = { name: 123, filePath: "/path/to/file.json" };
      expect(() => parseSchema(schema, input)).toThrow("'/path/to/file.json'");
    });
  });

  describe("when error does not include a filePath", () => {
    it('uses "schema" as the default target', () => {
      const schema = z.object({ name: z.string() });
      const input = { name: 123 };
      expect(() => parseSchema(schema, input)).toThrow("Error parsing schema:");
    });
  });
});
