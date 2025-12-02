import { SchemaParseError } from "./parse";
import { parseUnknownContent } from "./unknown-content";
import { describe, it, expect } from "vitest";

describe("parseUnknownContent", () => {
  describe("when given valid input", () => {
    it("returns the parsed content", () => {
      const input = {
        title: "Test Content",
        date: "2024-01-15",
        status: "Published",
        filePath: "/path/to/content.md",
        markdown: "This is test content",
        extraField: "extra value",
      };
      const result = parseUnknownContent(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given invalid input", () => {
    it("throws SchemaParseError", () => {
      const input = {
        title: "Test Content",
        date: "2024-01-15",
        status: "Published",
        filePath: "/path/to/content.md",
        markdown: 123,
      };
      expect(() => parseUnknownContent(input)).toThrow(SchemaParseError);
    });
  });
});
