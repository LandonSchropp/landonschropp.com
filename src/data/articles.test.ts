import { fetchArticles, fetchArticle } from "./articles";
import { describe, it, expect, beforeEach } from "vitest";

describe("fetchArticles", () => {
  it("returns articles sorted by date descending", async () => {
    const articles = await fetchArticles();

    // Verify we have articles
    expect(articles.length).toBeGreaterThan(0);

    // Verify all articles are published
    articles.forEach((article) => {
      expect(article.status).toBe("Published");
    });

    // Verify articles are sorted by date in descending order
    for (let i = 0; i < articles.length - 1; i++) {
      const currentDate = articles[i].date;
      const nextDate = articles[i + 1].date;
      expect(currentDate >= nextDate).toBe(true);
    }
  });
});

describe("fetchArticle", () => {
  let slug: string;

  beforeEach(async () => {
    slug = (await fetchArticles())[0].slug;
  });

  describe("when an article with the slug exists", () => {
    it("returns the article with correct slug", async () => {
      const result = await fetchArticle({ data: { slug } });

      expect(result.slug).toBe(slug);
      expect(result.title).not.toEqual("");
      expect(result.status).toBe("Published");
    });
  });

  describe("when an article with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(
        fetchArticle({ data: { slug: "nonexistent-article-slug-xyz" } }),
      ).rejects.toThrow("Content with slug 'nonexistent-article-slug-xyz' not found");
    });
  });
});
