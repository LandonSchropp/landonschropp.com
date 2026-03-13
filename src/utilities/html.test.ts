import { stripHtmlTags } from "./html";
import { describe, it, expect } from "vitest";

describe("stripHtmlTags", () => {
  describe("when the string contains no HTML tags", () => {
    it("returns the text unchanged", () => {
      expect(stripHtmlTags("Hello World")).toBe("Hello World");
    });
  });

  describe("when the string contains code tags", () => {
    it("removes the tags", () => {
      expect(stripHtmlTags("<code>using</code> Keyword")).toBe("using Keyword");
    });
  });

  describe("when the string contains strong tags", () => {
    it("removes the tags", () => {
      expect(stripHtmlTags("<strong>bold text</strong>")).toBe("bold text");
    });
  });

  describe("when the string contains em tags", () => {
    it("removes the tags", () => {
      expect(stripHtmlTags("<em>italic text</em>")).toBe("italic text");
    });
  });

  describe("when the string contains anchor tags", () => {
    it("removes the tags", () => {
      expect(stripHtmlTags('<a href="https://example.com">link</a>')).toBe("link");
    });
  });

  describe("when the string contains multiple HTML tags", () => {
    it("removes all the tags", () => {
      expect(stripHtmlTags("The <code>using</code> <strong>Keyword</strong>")).toBe(
        "The using Keyword",
      );
    });
  });

  describe("when the string is empty", () => {
    it("returns an empty string", () => {
      expect(stripHtmlTags("")).toBe("");
    });
  });

  describe("when the string is undefined", () => {
    it("returns undefined", () => {
      expect(stripHtmlTags(undefined)).toBeUndefined();
    });
  });
});
