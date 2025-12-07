import { fetchTodayILearneds, fetchTodayILearned } from "./today-i-learned";
import { describe, it, expect, beforeEach } from "vitest";

describe("fetchTodayILearneds", () => {
  it("returns today I learneds sorted by date descending", async () => {
    const tils = await fetchTodayILearneds();

    // Verify we have tils
    expect(tils.length).toBeGreaterThan(0);

    // Verify all tils are published
    tils.forEach((til) => {
      expect(til.status).toBe("Published");
    });

    // Verify tils are sorted by date in descending order
    for (let i = 0; i < tils.length - 1; i++) {
      const currentDate = tils[i].date;
      const nextDate = tils[i + 1].date;
      expect(currentDate >= nextDate).toBe(true);
    }
  });
});

describe("fetchTodayILearned", () => {
  let slug: string;

  beforeEach(async () => {
    slug = (await fetchTodayILearneds())[0].slug;
  });

  describe("when a today I learned with the slug exists", () => {
    it("returns the today I learned with correct slug", async () => {
      const result = await fetchTodayILearned({ data: { slug } });

      expect(result.slug).toBe(slug);
      expect(result.title).not.toEqual("");
      expect(result.status).toBe("Published");
    });
  });

  describe("when a today I learned with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(
        fetchTodayILearned({ data: { slug: "nonexistent-til-slug-xyz" } }),
      ).rejects.toThrow("Content with slug 'nonexistent-til-slug-xyz' not found");
    });
  });
});
