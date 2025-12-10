import { isObject } from "./object";

describe("isObject", () => {
  describe("when the value is undefined", () => {
    it("returns false", () => {
      expect(isObject(undefined)).toBe(false);
    });
  });

  describe("when the object null", () => {
    it("returns false", () => {
      expect(isObject(null)).toBe(false);
    });
  });

  describe("when the object is some other non-object type", () => {
    it("returns false", () => {
      expect(isObject(42)).toBe(false);
    });
  });

  describe("when the value is an object literal", () => {
    it("returns true", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ key: "value" })).toBe(true);
    });
  });

  describe("when the value is an array", () => {
    it("returns true", () => {
      expect(isObject([])).toBe(true);
      expect(isObject([])).toBe(true);
    });
  });
});
