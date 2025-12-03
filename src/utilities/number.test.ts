import { clamp } from "./number";

describe("clamp", () => {
  describe("when the value is within the range", () => {
    it("returns the value", () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });
  });

  describe("when the value is below the minimum", () => {
    it("returns the minimum", () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });
  });

  describe("when the value is above the maximum", () => {
    it("returns the maximum", () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe("when the value equals the minimum", () => {
    it("returns the value", () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });
  });

  describe("when the value equals the maximum", () => {
    it("returns the value", () => {
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });
});
