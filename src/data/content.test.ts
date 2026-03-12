import { createContentDirectory, removeContentDirectory } from "../../test/content";
import { contentFactory } from "../../test/factories";
import { fetchContents, fetchContent, filterContentsByTag, getAllTags } from "./content";
import { writeFile } from "fs/promises";
import { join } from "path";
import { dedent } from "ts-dedent";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("fetchContents", () => {
  let directory: string;

  beforeEach(async () => {
    directory = await createContentDirectory();
  });

  afterEach(async () => {
    await removeContentDirectory(directory);
  });

  describe("when the directory is empty", () => {
    it("returns an empty array", async () => {
      const result = await fetchContents(directory);
      expect(result).toEqual([]);
    });
  });

  describe("when the directory contains published markdown files", () => {
    beforeEach(async () => {
      // Create in different order (c, a, b) than expected return (b, c, a)
      await contentFactory.create(
        { title: "Article C", date: "2024-01-15", slug: "item-c" },
        { transient: { directory } },
      );

      await contentFactory.create(
        { title: "Article A", date: "2024-01-10", slug: "item-a" },
        { transient: { directory } },
      );

      await contentFactory.create(
        { title: "Article B", date: "2024-01-20", slug: "item-b" },
        { transient: { directory } },
      );
    });

    it("returns the parsed published markdown files sorted by date", async () => {
      const result = await fetchContents(directory);
      expect(result).toHaveLength(3);
      expect(result[0].slug).toBe("item-b");
      expect(result[1].slug).toBe("item-c");
      expect(result[2].slug).toBe("item-a");
    });
  });

  describe("when the directory contains an ignored status file without a slug or tags", () => {
    beforeEach(async () => {
      await writeFile(
        join(directory, "idea-article.md"),
        dedent`
          ---
          title: My Idea
          date: 2024-01-15
          status: Idea
          ---

          Some content.
        `,
      );

      await contentFactory.create(
        { title: "Published A", date: "2024-01-10", slug: "published-a" },
        { transient: { directory } },
      );
    });

    it("excludes the Idea article and returns only the published one", async () => {
      const result = await fetchContents(directory);
      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("published-a");
    });
  });

  describe("when the directory contains Draft and Published markdown files", () => {
    beforeEach(async () => {
      await contentFactory.create(
        { title: "Draft B", date: "2024-01-20", status: "Draft", slug: "draft-b" },
        { transient: { directory } },
      );

      await contentFactory.create(
        { title: "Published A", date: "2024-01-15", slug: "published-a" },
        { transient: { directory } },
      );

      await contentFactory.create(
        { title: "Draft A", date: "2024-01-10", status: "Draft", slug: "draft-a" },
        { transient: { directory } },
      );

      await contentFactory.create(
        { title: "Published B", date: "2024-01-25", slug: "published-b" },
        { transient: { directory } },
      );
    });

    it("returns only the Published content sorted by date", async () => {
      const result = await fetchContents(directory);
      expect(result).toHaveLength(2);
      expect(result[0].slug).toBe("published-b");
      expect(result[1].slug).toBe("published-a");
    });
  });
});

describe("fetchContent", () => {
  let directory: string;

  beforeEach(async () => {
    directory = await createContentDirectory();

    await contentFactory.create(
      { title: "Article A", date: "2024-01-10", slug: "item-a" },
      { transient: { directory } },
    );

    await contentFactory.create(
      { title: "Article B", date: "2024-01-20", slug: "item-b" },
      { transient: { directory } },
    );

    await contentFactory.create(
      { title: "Article C", date: "2024-01-15", slug: "item-c" },
      { transient: { directory } },
    );
  });

  afterEach(async () => {
    await removeContentDirectory(directory);
  });

  describe("when the content with the slug exists", () => {
    it("returns the content", async () => {
      const result = await fetchContent(directory, "item-b");
      expect(result.slug).toBe("item-b");
      expect(result.title).toBe("Article B");
    });
  });

  describe("when the content with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(fetchContent(directory, "nonexistent")).rejects.toThrow(
        "Content with slug 'nonexistent' not found",
      );
    });
  });
});

describe("fetchAndParseContent", () => {
  let directory: string;

  beforeEach(async () => {
    directory = await createContentDirectory();
  });

  afterEach(async () => {
    await removeContentDirectory(directory);
  });

  describe("when the markdown contains headings and text", () => {
    it("renders markdown to HTML", async () => {
      const markdown = dedent`
        ---
        title: Test Article
        date: 2024-01-15
        status: Published
        slug: test-article
        tags: []
        ---

        ## Introduction

        This is a paragraph with **bold** text.
      `;
      const filePath = join(directory, "test-article.md");
      await writeFile(filePath, markdown);

      const result = await fetchContent(directory, "test-article");

      expect(result.content).toContain("<h2>Introduction</h2>");
      expect(result.content).toContain(
        "<p>This is a paragraph with <strong>bold</strong> text.</p>",
      );
    });
  });

  describe("when the markdown contains images", () => {
    it("extracts image paths into images array", async () => {
      const markdown = dedent`
        ---
        title: Test Article
        date: 2024-01-15
        status: Published
        slug: test-article
        tags: []
        ---

        Here's an image: ![alt](image1.jpg)

        And another: ![alt2](image2.png)
      `;
      const filePath = join(directory, "test-article.md");
      await writeFile(filePath, markdown);

      await writeFile(join(directory, "image1.jpg"), Buffer.from("fake image 1"));
      await writeFile(join(directory, "image2.png"), Buffer.from("fake image 2"));

      const result = await fetchContent(directory, "test-article");

      expect(result.images).toHaveLength(2);
    });

    it("replaces image paths with hashed URLs in content", async () => {
      const markdown = dedent`
        ---
        title: Test Article
        date: 2024-01-15
        status: Published
        slug: test-article
        tags: []
        ---

        ![alt](image.jpg)
      `;
      const filePath = join(directory, "test-article.md");
      await writeFile(filePath, markdown);

      await writeFile(join(directory, "image.jpg"), Buffer.from("fake image"));

      const result = await fetchContent(directory, "test-article");

      expect(result.content).toContain('src="/images/');
      expect(result.content).toContain('.jpg"');
    });
  });

  describe("when rendering the title", () => {
    it("renders bold text as inline HTML", async () => {
      const markdown = dedent`
        ---
        title: Test **Bold** Title
        date: 2024-01-15
        status: Published
        slug: test-article
        tags: []
        ---

        Content here.
      `;
      const filePath = join(directory, "test-article.md");
      await writeFile(filePath, markdown);

      const result = await fetchContent(directory, "test-article");

      expect(result.title).toBe("Test <strong>Bold</strong> Title");
    });

    it("renders inline code as inline HTML", async () => {
      const markdown = dedent`
        ---
        title: Using \`renderMarkdown\` in Tests
        date: 2024-01-15
        status: Published
        slug: test-article
        tags: []
        ---

        Content here.
      `;
      const filePath = join(directory, "test-article.md");
      await writeFile(filePath, markdown);

      const result = await fetchContent(directory, "test-article");

      expect(result.title).toBe("Using <code>renderMarkdown</code> in Tests");
    });
  });

  describe("when rendering the description", () => {
    it("renders markdown as inline HTML", async () => {
      const markdown = dedent`
        ---
        title: Test Article
        description: This is a *description*
        date: 2024-01-15
        status: Published
        slug: test-article
        tags: []
        ---

        Content here.
      `;
      const filePath = join(directory, "test-article.md");
      await writeFile(filePath, markdown);

      const result = await fetchContent(directory, "test-article");

      expect(result.description).toBe("This is a <em>description</em>");
    });
  });

  describe("when the description is not provided", () => {
    it("returns undefined", async () => {
      const markdown = dedent`
        ---
        title: Test Article
        date: 2024-01-15
        status: Published
        slug: test-article
        tags: []
        ---

        Content here.
      `;
      const filePath = join(directory, "test-article.md");
      await writeFile(filePath, markdown);

      const result = await fetchContent(directory, "test-article");

      expect(result.description).toBeUndefined();
    });
  });
});

describe("filterContentsByTag", () => {
  describe("when the tag is undefined", () => {
    it("returns all contents", () => {
      const contents = [
        contentFactory.build({ tags: ["javascript", "typescript"] }),
        contentFactory.build({ tags: ["react"] }),
        contentFactory.build({ tags: [] }),
      ];

      const result = filterContentsByTag(contents, undefined);

      expect(result).toEqual(contents);
    });
  });

  describe("when the tag is provided", () => {
    describe("when some contents have the tag", () => {
      it("returns only the contents with the tag", () => {
        const matchingContent1 = contentFactory.build({ tags: ["javascript", "typescript"] });
        const nonMatchingContent = contentFactory.build({ tags: ["react"] });
        const matchingContent2 = contentFactory.build({ tags: ["javascript", "node"] });

        const contents = [matchingContent1, nonMatchingContent, matchingContent2];

        const result = filterContentsByTag(contents, "javascript");

        expect(result).toEqual([matchingContent1, matchingContent2]);
      });
    });

    describe("when no contents have the tag", () => {
      it("returns an empty array", () => {
        const contents = [
          contentFactory.build({ tags: ["react"] }),
          contentFactory.build({ tags: ["vue"] }),
          contentFactory.build({ tags: [] }),
        ];

        const result = filterContentsByTag(contents, "javascript");

        expect(result).toEqual([]);
      });
    });

    describe("when all contents have the tag", () => {
      it("returns all contents", () => {
        const contents = [
          contentFactory.build({ tags: ["javascript", "typescript"] }),
          contentFactory.build({ tags: ["javascript", "react"] }),
          contentFactory.build({ tags: ["javascript"] }),
        ];

        const result = filterContentsByTag(contents, "javascript");

        expect(result).toEqual(contents);
      });
    });

    describe("when the contents array is empty", () => {
      it("returns an empty array", () => {
        const result = filterContentsByTag([], "javascript");

        expect(result).toEqual([]);
      });
    });
  });
});

describe("getAllTags", () => {
  describe("when the contents array is empty", () => {
    it("returns an empty array", () => {
      expect(getAllTags([])).toEqual([]);
    });
  });

  describe("when the contents have tags", () => {
    let contents: ReturnType<typeof contentFactory.build>[];

    beforeEach(() => {
      contents = [
        contentFactory.build({ tags: ["typescript", "javascript"] }),
        contentFactory.build({ tags: ["react", "javascript"] }),
        contentFactory.build({ tags: ["css"] }),
      ];
    });

    it("returns all unique tags sorted alphabetically", () => {
      expect(getAllTags(contents)).toEqual(["css", "javascript", "react", "typescript"]);
    });
  });

  describe("when the contents have duplicate tags", () => {
    let contents: ReturnType<typeof contentFactory.build>[];

    beforeEach(() => {
      contents = [
        contentFactory.build({ tags: ["javascript"] }),
        contentFactory.build({ tags: ["javascript", "react"] }),
        contentFactory.build({ tags: ["javascript"] }),
      ];
    });

    it("returns unique tags only once", () => {
      expect(getAllTags(contents)).toEqual(["javascript", "react"]);
    });
  });

  describe("when some contents have no tags", () => {
    let contents: ReturnType<typeof contentFactory.build>[];

    beforeEach(() => {
      contents = [
        contentFactory.build({ tags: ["javascript"] }),
        contentFactory.build({ tags: [] }),
        contentFactory.build({ tags: ["react"] }),
      ];
    });

    it("returns only the tags from the contents that have them", () => {
      expect(getAllTags(contents)).toEqual(["javascript", "react"]);
    });
  });

  describe("when all the contents have no tags", () => {
    let contents: ReturnType<typeof contentFactory.build>[];

    beforeEach(() => {
      contents = [
        contentFactory.build({ tags: [] }),
        contentFactory.build({ tags: [] }),
        contentFactory.build({ tags: [] }),
      ];
    });

    it("returns an empty array", () => {
      expect(getAllTags(contents)).toEqual([]);
    });
  });

  describe("when the tags are not sorted in the input", () => {
    let contents: ReturnType<typeof contentFactory.build>[];

    beforeEach(() => {
      contents = [
        contentFactory.build({ tags: ["zulu", "alpha"] }),
        contentFactory.build({ tags: ["charlie", "bravo"] }),
      ];
    });

    it("returns the tags sorted alphabetically", () => {
      expect(getAllTags(contents)).toEqual(["alpha", "bravo", "charlie", "zulu"]);
    });
  });
});
