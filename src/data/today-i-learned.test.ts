import {
  fetchTodayILearneds,
  fetchTodayILearned,
  fetchTodayILearnedsServerFn,
  fetchTodayILearnedServerFn,
} from "./today-i-learned";
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

describe("fetchTodayILearnedsServerFn", () => {
  it("returns today I learneds", async () => {
    const tils = await fetchTodayILearnedsServerFn();
    expect(tils.length).toBeGreaterThan(0);
  });
});

describe("fetchTodayILearned", () => {
  let slug: string;

  beforeEach(async () => {
    slug = (await fetchTodayILearneds())[0].slug;
  });

  describe("when a today I learned with the slug exists", () => {
    it("returns the today I learned with correct slug", async () => {
      const result = await fetchTodayILearned(slug);

      expect(result.slug).toBe(slug);
      expect(result.title).not.toEqual("");
      expect(result.status).toBe("Published");
    });
  });

  describe("when a today I learned with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(fetchTodayILearned("nonexistent-til-slug-xyz")).rejects.toThrow(
        "Content with slug 'nonexistent-til-slug-xyz' not found",
      );
    });
  });
});

describe("fetchTodayILearnedServerFn", () => {
  it("returns the today I learned corresponding to the slug", async () => {
    const slug = (await fetchTodayILearneds())[0].slug;
    const til = await fetchTodayILearnedServerFn({ data: { slug } });
    expect(til.slug).toBe(slug);
  });
});
