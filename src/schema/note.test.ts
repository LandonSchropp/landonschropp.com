import { ARTICLE_MEDIA } from "../constants";
import { parseNote } from "./note";
import { SchemaParseError } from "./parse";
import { describe, it, expect } from "vitest";

describe("parseNote", () => {
  describe("when given valid input", () => {
    it("returns the parsed note", () => {
      const input = {
        title: "Test Article",
        date: "2024-01-15",
        status: "Published",
        filePath: "/path/to/note.md",
        slug: "test-article",
        tags: ["javascript", "testing"],
        markdown: "This is a test article",
        authors: ["John Doe"],
        media: ARTICLE_MEDIA,
        url: "https://example.com/article",
        source: "Example Site",
      };
      const result = parseNote(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given invalid input", () => {
    it("throws SchemaParseError", () => {
      const input = {
        title: "Test Article",
        date: "2024-01-15",
        status: "Published",
        filePath: "/path/to/note.md",
        slug: "test-article",
        tags: "javascript",
        markdown: "This is a test article",
        authors: ["John Doe"],
        media: ARTICLE_MEDIA,
        url: "https://example.com/article",
        source: "Example Site",
      };
      expect(() => parseNote(input)).toThrow(SchemaParseError);
    });
  });
});
