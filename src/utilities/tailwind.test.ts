import { tailwind } from "./tailwind";
import { describe, expect, it } from "vitest";

describe("tailwind", () => {
  describe("when there are no interpolations", () => {
    it("returns the string unchanged", () => {
      expect(tailwind`bg-white text-blue-500`).toBe("bg-white text-blue-500");
    });
  });

  describe("when there are interpolations", () => {
    it("interpolates the value", () => {
      const otherClassNames = tailwind`bg-white`;
      expect(tailwind`text-blue-500 ${otherClassNames}`).toBe("text-blue-500 bg-white");
    });
  });
});
