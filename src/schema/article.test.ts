import { articleFactory } from "../../test/factories";
import { parseArticle } from "./article";
import { SchemaParseError } from "./parse";
import { describe, it, expect } from "vitest";

describe("parseArticle", () => {
  describe("when given valid input", () => {
    it("returns the parsed article", () => {
      const input = articleFactory.internal().build();
      const result = parseArticle(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given invalid input", () => {
    it("throws SchemaParseError", () => {
      const input = {
        ...articleFactory.internal().build(),
        description: 123,
      };
      expect(() => parseArticle(input)).toThrow(SchemaParseError);
    });
  });
});
