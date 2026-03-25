import { createContentDirectory, removeContentDirectory } from "../../test/content";
import { articleFactory } from "../../test/factories";
import {
  fetchArticles,
  fetchArticle,
  fetchArticlesServerFn,
  fetchArticleServerFn,
} from "./articles";
import { join } from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

let directory: string;

beforeEach(async () => {
  directory = await createContentDirectory();
  vi.stubEnv("PRISMATIC_PATH", join(directory, "articles"));
  vi.stubEnv("ARTICLES_ARCHIVE_PATH", join(directory, "articles-archive"));
});

afterEach(async () => {
  await removeContentDirectory(directory);
});

describe("fetchArticles", () => {
  describe("when there are published articles", () => {
    beforeEach(async () => {
      await articleFactory.create(
        {
          title: "Article C",
          date: "2024-01-15",
          status: "Published",
          slug: "article-c",
          description: "Third",
          filePath: "articles/article-c.md",
        },
        { transient: { directory } },
      );

      await articleFactory.create(
        {
          title: "Article A",
          date: "2024-01-10",
          status: "Published",
          slug: "article-a",
          description: "First",
          filePath: "articles/article-a.md",
        },
        { transient: { directory } },
      );

      await articleFactory.create(
        {
          title: "Article B",
          date: "2024-01-20",
          status: "Published",
          slug: "article-b",
          description: "Second",
          filePath: "articles-archive/article-a.md",
        },
        { transient: { directory } },
      );
    });

    it("returns articles sorted by date descending", async () => {
      const articles = await fetchArticles();

      expect(articles).toHaveLength(3);
      expect(articles[0].slug).toBe("article-b");
      expect(articles[1].slug).toBe("article-c");
      expect(articles[2].slug).toBe("article-a");
    });

    it("returns articles with the Published status", async () => {
      const articles = await fetchArticles();
      articles.forEach((article) => {
        expect(article.status).toBe("Published");
      });
    });
  });
});

describe("fetchArticlesServerFn", () => {
  beforeEach(async () => {
    await articleFactory.create(
      { title: "Server Fn Article", slug: "server-fn-article", description: "Test" },
      { transient: { directory } },
    );
  });

  it("returns articles", async () => {
    const articles = await fetchArticlesServerFn();
    expect(articles).toHaveLength(1);
  });
});

describe("fetchArticle", () => {
  beforeEach(async () => {
    await articleFactory.create(
      { title: "Target Article", slug: "target-article", description: "Found it" },
      { transient: { directory } },
    );

    await articleFactory.create(
      { title: "Other Article", slug: "other-article", description: "Not this one" },
      { transient: { directory } },
    );
  });

  describe("when an article with the slug exists", () => {
    it("returns the article with the correct slug", async () => {
      const result = await fetchArticle("target-article");
      expect(result.slug).toBe("target-article");
      expect(result.title).toBe("Target Article");
    });
  });

  describe("when an article with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(fetchArticle("nonexistent-article-slug-xyz")).rejects.toThrow(
        "Content with slug 'nonexistent-article-slug-xyz' not found",
      );
    });
  });
});

describe("fetchArticleServerFn", () => {
  beforeEach(async () => {
    await articleFactory.create(
      { title: "Server Fn Article", slug: "server-fn-article", description: "Test" },
      { transient: { directory } },
    );
  });

  it("returns the article corresponding to the slug", async () => {
    const article = await fetchArticleServerFn({ data: { slug: "server-fn-article" } });
    expect(article.slug).toBe("server-fn-article");
  });
});
