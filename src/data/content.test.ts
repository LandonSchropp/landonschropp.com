import { contentFactory } from "../../test/factories";
import { parseContent } from "../schema";
import { fetchContents, fetchContent } from "./content";
import { mkdir, writeFile, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { dedent } from "ts-dedent";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

const testDir = join(tmpdir(), `content-test-${Date.now()}`);

type ContentMarkdownParams = Partial<{
  title: string;
  date: string;
  status: "Idea" | "Draft" | "Published" | "Will Not Publish";
  slug: string;
}>;

function buildContentMarkdown(params: ContentMarkdownParams = {}): string {
  const content = contentFactory.build(params);
  return dedent`
    ---
    title: ${content.title}
    date: ${content.date}
    status: ${content.status}
    slug: ${content.slug}
    tags: []
    ---

    Example
  `;
}

async function writeContent(directory: string, params: ContentMarkdownParams = {}): Promise<void> {
  const content = contentFactory.build(params);
  const markdown = buildContentMarkdown(params);
  const filePath = join(directory, `${content.slug}.md`);
  await writeFile(filePath, markdown);
}

describe("fetchContents", () => {
  describe("when the directory is empty", () => {
    beforeEach(async () => {
      await mkdir(testDir, { recursive: true });
    });

    afterEach(async () => {
      await rm(testDir, { recursive: true, force: true });
    });

    it("returns an empty array", async () => {
      const result = await fetchContents(testDir, parseContent);
      expect(result).toEqual([]);
    });
  });

  describe("when the directory contains published markdown files", () => {
    beforeEach(async () => {
      await mkdir(testDir, { recursive: true });

      // Create in different order (c, a, b) than expected return (b, c, a)
      await writeContent(testDir, {
        title: "Article C",
        date: "2024-01-15",
        status: "Published",
        slug: "item-c",
      });

      await writeContent(testDir, {
        title: "Article A",
        date: "2024-01-10",
        status: "Published",
        slug: "item-a",
      });

      await writeContent(testDir, {
        title: "Article B",
        date: "2024-01-20",
        status: "Published",
        slug: "item-b",
      });
    });

    afterEach(async () => {
      await rm(testDir, { recursive: true, force: true });
    });

    it("returns the parsed published markdown files sorted by date", async () => {
      const result = await fetchContents(testDir, parseContent);
      expect(result).toHaveLength(3);
      expect(result[0].slug).toBe("item-b");
      expect(result[1].slug).toBe("item-c");
      expect(result[2].slug).toBe("item-a");
    });
  });

  describe("when the directory contains unpublished markdown files", () => {
    beforeEach(async () => {
      await mkdir(testDir, { recursive: true });

      // Create in different order with mix of published and unpublished
      await writeContent(testDir, {
        title: "Draft B",
        date: "2024-01-20",
        status: "Draft",
        slug: "draft-b",
      });

      await writeContent(testDir, {
        title: "Published A",
        date: "2024-01-15",
        status: "Published",
        slug: "published-a",
      });

      await writeContent(testDir, {
        title: "Draft A",
        date: "2024-01-10",
        status: "Draft",
        slug: "draft-a",
      });

      await writeContent(testDir, {
        title: "Published B",
        date: "2024-01-25",
        status: "Published",
        slug: "published-b",
      });
    });

    afterEach(async () => {
      await rm(testDir, { recursive: true, force: true });
    });

    it("returns the parsed published markdown files sorted by date", async () => {
      const result = await fetchContents(testDir, parseContent);
      expect(result).toHaveLength(2);
      expect(result[0].slug).toBe("published-b");
      expect(result[1].slug).toBe("published-a");
    });
  });
});

describe("fetchContent", () => {
  beforeEach(async () => {
    await mkdir(testDir, { recursive: true });

    // Create 3 items
    await writeContent(testDir, {
      title: "Article A",
      date: "2024-01-10",
      status: "Published",
      slug: "item-a",
    });

    await writeContent(testDir, {
      title: "Article B",
      date: "2024-01-20",
      status: "Published",
      slug: "item-b",
    });

    await writeContent(testDir, {
      title: "Article C",
      date: "2024-01-15",
      status: "Published",
      slug: "item-c",
    });
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe("when the content with the slug exists", () => {
    it("returns the content", async () => {
      const result = await fetchContent(testDir, "item-b", parseContent);
      expect(result.slug).toBe("item-b");
      expect(result.title).toBe("Article B");
    });
  });

  describe("when the content with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(fetchContent(testDir, "nonexistent", parseContent)).rejects.toThrow(
        "Content with slug 'nonexistent' not found",
      );
    });
  });
});
