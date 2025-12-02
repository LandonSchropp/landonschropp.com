import { parseArticle } from "./article";
import { SchemaParseError } from "./parse";
import { describe, it, expect } from "vitest";

describe("parseArticle", () => {
  describe("when given valid input", () => {
    it("returns the parsed article", () => {
      const input = {
        title: "Test Article",
        date: "2024-01-15",
        status: "Published",
        filePath: "/path/to/article.md",
        slug: "test-article",
        tags: ["javascript", "testing"],
        markdown: "This is a test article",
        description: "A test article about testing",
        publisher: undefined,
        url: undefined,
      };
      const result = parseArticle(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given invalid input", () => {
    it("throws SchemaParseError", () => {
      const input = {
        title: "Test Article",
        date: "2024-01-15",
        status: "Published",
        filePath: "/path/to/article.md",
        slug: "test-article",
        tags: "javascript",
        markdown: "This is a test article",
        description: "A test article about testing",
        publisher: undefined,
        url: undefined,
      };
      expect(() => parseArticle(input)).toThrow(SchemaParseError);
    });
  });
});
