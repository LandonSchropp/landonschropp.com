import { SVG_DATA_KEYS } from "../constants";
import { DynamicSVGShape } from "../types";
import { extractSVGData } from "./svg";
import { describe, it, expect, beforeEach } from "vitest";

describe("all SVG exports", () => {
  let svgData: Omit<DynamicSVGShape, "key">[];

  beforeEach(() => (svgData = SVG_DATA_KEYS.map((key) => extractSVGData(key))));

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
