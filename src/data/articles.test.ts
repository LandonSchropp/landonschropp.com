import { ARTICLES_PATH } from "../env";
import { parseArticle } from "../schema";
import { fetchContents, fetchContent } from "./content";
import { describe, it, expect } from "vitest";

describe("fetchArticles", () => {
  it("returns articles sorted by date descending", async () => {
    const articles = await fetchContents(ARTICLES_PATH, parseArticle);

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
    slug = (await fetchContents(ARTICLES_PATH, parseArticle))[0].slug;
  });

  describe("when an article with the slug exists", () => {
    it("returns the article with correct slug", async () => {
      const result = await fetchContent(ARTICLES_PATH, slug, parseArticle);

      expect(result.slug).toBe(slug);
      expect(result.title).not.toEqual("");
      expect(result.status).toBe("Published");
    });
  });

  describe("when an article with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(
        fetchContent(ARTICLES_PATH, "nonexistent-article-slug-xyz", parseArticle),
      ).rejects.toThrow("Content with slug 'nonexistent-article-slug-xyz' not found");
    });
  });
});
