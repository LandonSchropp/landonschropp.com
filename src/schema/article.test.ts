import { articleFactory } from "../../test/factories";
import { parseArticle } from "./article";
import { SchemaParseError } from "./parse";
import { describe, it, expect } from "vitest";

describe("parseArticle", () => {
  describe("when given a valid internal article", () => {
    it("returns the parsed article", () => {
      const input = articleFactory.internal().build();
      const result = parseArticle(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given a valid external article with content", () => {
    it("returns the parsed article with url and publisher", () => {
      const input = articleFactory.external().build();
      const result = parseArticle(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given an internal article with null publisher and url", () => {
    it("returns the parsed article", () => {
      const input = articleFactory.internal().build({ publisher: null, url: null });
      const result = parseArticle(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given an internal article with a url", () => {
    it("throws SchemaParseError", () => {
      const input = articleFactory.internal().build({ url: "https://example.com" });
      expect(() => parseArticle(input)).toThrow(SchemaParseError);
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
