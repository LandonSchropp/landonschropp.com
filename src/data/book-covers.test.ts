import { getBookCoverHref } from "./book-covers";
import { describe, it, expect } from "vitest";

describe("getBookCoverHref", () => {
  it("returns the correct URL for a valid ISBN", () => {
    expect(getBookCoverHref(9780316769174)).toBe("/images/isbn/9780316769174.jpg");
  });

  it("returns the correct URL for a different ISBN", () => {
    expect(getBookCoverHref(9781451648546)).toBe("/images/isbn/9781451648546.jpg");
  });

  it("returns the correct URL for an ISBN with value 0", () => {
    expect(getBookCoverHref(0)).toBe("/images/isbn/0.jpg");
  });

  it("returns the correct URL for a small ISBN number", () => {
    expect(getBookCoverHref(123)).toBe("/images/isbn/123.jpg");
  });
});
