import { noteFactory } from "../../test/factories";
import { parseNote } from "./note";
import { SchemaParseError } from "./parse";
import { describe, it, expect } from "vitest";

describe("parseNote", () => {
  describe("when given valid input", () => {
    it("returns the parsed note", () => {
      const input = noteFactory.article().build();
      const result = parseNote(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given invalid input", () => {
    it("throws SchemaParseError", () => {
      const input = {
        ...noteFactory.article().build(),
        tags: "javascript",
      };
      expect(() => parseNote(input)).toThrow(SchemaParseError);
    });
  });
});
