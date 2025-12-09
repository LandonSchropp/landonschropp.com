import { todayILearnedFactory } from "../../test/factories";
import { SchemaParseError } from "./parse";
import { parseTodayILearned } from "./today-i-learned";
import dedent from "ts-dedent";
import { describe, it, expect } from "vitest";

describe("parseTodayILearned", () => {
  describe("when given valid input", () => {
    it("returns the parsed today I learned", () => {
      const input = todayILearnedFactory.build();
      const result = parseTodayILearned(input);
      expect(result).toEqual(input);
    });
  });

  describe("when given invalid input", () => {
    it("throws SchemaParseError", () => {
      const input = todayILearnedFactory.build({
        markdown: dedent`
          ---
          title: "Invalid TIL"
          ---

          # This violates the H1 rule
        `,
      });
      expect(() => parseTodayILearned(input)).toThrow(SchemaParseError);
    });
  });
});
