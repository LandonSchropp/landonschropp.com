import { sum, maxBy } from "./array";

describe("sum", () => {
  describe("when the array is empty", () => {
    it("returns zero", () => {
      expect(sum([])).toBe(0);
    });
  });

  describe("when a transform function is not provided", () => {
    it("returns the sum of the numbers", () => {
      expect(sum([1, 2, 3])).toBe(6);
    });
  });

  describe("when a transform function is provided", () => {
    it("returns the sum of the transformed values", () => {
      const items = [{ value: 1 }, { value: 2 }, { value: 3 }];
      expect(sum(items, (item) => item.value)).toBe(6);
    });
  });
});

describe("maxBy", () => {
  describe("when the array is empty", () => {
    it("returns undefined", () => {
      const items: { value: number }[] = [];
      expect(maxBy(items, (item) => -item.value)).toBeUndefined();
    });
  });

  describe("when the array is not empty", () => {
    it("returns the item with the maximum value", () => {
      const items = [{ value: 1 }, { value: 3 }, { value: 2 }];
      expect(maxBy(items, (item) => -item.value)).toEqual({ value: 1 });
    });
  });
});
