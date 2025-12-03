import { DynamicSVGShape } from "../types";
import * as svgDataExports from "./svg";
import { describe, it, expect } from "vitest";

describe("all SVG exports", () => {
  let svgData: Omit<DynamicSVGShape, "key">[];

  beforeEach(() => (svgData = Object.values(svgDataExports)));

  it("have originalWidth", () => {
    for (const svg of svgData) {
      expect(svg).toHaveProperty("originalWidth");
    }
  });

  it("have originalHeight", () => {
    for (const svg of svgData) {
      expect(svg).toHaveProperty("originalHeight");
    }
  });

  it("have content", () => {
    for (const svg of svgData) {
      expect(svg).toHaveProperty("content");
    }
  });

  it("do not contain 'black'", () => {
    for (const svg of svgData) {
      expect(svg.content.toLowerCase()).not.toContain("black");
    }
  });
});
