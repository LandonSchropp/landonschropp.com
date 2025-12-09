import { SchemaParseError } from "./parse";
import { parseTodayILearned } from "./today-i-learned";
import dedent from "ts-dedent";
import { describe, it, expect } from "vitest";

describe("parseTodayILearned", () => {
  describe("when given valid input", () => {
    it("returns the parsed today I learned", () => {
      const input = {
        title: "Test TIL",
        date: "2024-01-15",
        status: "Published",
        filePath: "/path/to/til.md",
        slug: "test-til",
        tags: ["learning", "development"],
        markdown: "This is what I learned today",
      };
      const result = parseTodayILearned(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given invalid input", () => {
    it("throws SchemaParseError", () => {
      const input = {
        title: "Test TIL",
        date: "2024-01-15",
        status: "Published",
        filePath: "/path/to/til.md",
        slug: "test-til",
        tags: ["learning", "development"],
        markdown: dedent`
          ---
          title: "Invalid TIL"
          ---

          # This violates the H1 rule
        `,
      };
      expect(() => parseTodayILearned(input)).toThrow(SchemaParseError);
    });
  });
});
