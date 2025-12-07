import { downloadImage, getContentImageSlugPairs } from "./image";
import { mkdir, writeFile, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

const testDir = join(tmpdir(), `image-test-${Date.now()}`);

describe("downloadImage", () => {
  let result: Response;

  beforeEach(async () => {
    await mkdir(testDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe("when the image exists", () => {
    beforeEach(async () => {
      const imagePath = join(testDir, "test.png");
      await writeFile(imagePath, "fake image data");

      const content = { filePath: join(testDir, "content.md") };
      result = await downloadImage(content, "test.png");
    });

    it("returns a Response", () => {
      expect(result).toBeInstanceOf(Response);
    });

    it("returns a 200 status code", () => {
      expect(result.status).toBe(200);
    });

    it("returns the image content", async () => {
      const buffer = await result.arrayBuffer();
      expect(Buffer.from(buffer).toString()).toBe("fake image data");
    });
  });

  describe("when the image is a PNG", () => {
    // Minimal valid 1x1 PNG
    const minimalPng = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVQI12NgAAUAAQABDQotpAAAAABJRU5ErkJggg==",
      "base64",
    );

    beforeEach(async () => {
      const imagePath = join(testDir, "test.png");
      await writeFile(imagePath, minimalPng);

      const content = { filePath: join(testDir, "content.md") };
      result = await downloadImage(content, "test.png");
    });

    it("returns an image/png content type", async () => {
      expect(result.headers.get("Content-Type")).toBe("image/png");
      const buffer = await result.arrayBuffer();
      expect(Buffer.from(buffer)).toEqual(minimalPng);
    });
  });

  describe("when the image is a JPG", () => {
    // Minimal valid 1x1 JPEG
    const minimalJpeg = Buffer.from(
      [
        "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA",
        "QEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ",
        "EBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv",
        "/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA",
        "/9oADAMBAAIRAxEAPwA/wA==",
      ].join(""),
      "base64",
    );

    beforeEach(async () => {
      const imagePath = join(testDir, "test.jpg");
      await writeFile(imagePath, minimalJpeg);

      const content = { filePath: join(testDir, "content.md") };
      result = await downloadImage(content, "test.jpg");
    });

    it("returns an image/jpeg content type", async () => {
      expect(result.headers.get("Content-Type")).toBe("image/jpeg");
      const buffer = await result.arrayBuffer();
      expect(Buffer.from(buffer)).toEqual(minimalJpeg);
    });
  });

  describe("when the image is a GIF", () => {
    // Minimal valid 1x1 GIF
    const minimalGif = Buffer.from(
      "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
      "base64",
    );

    beforeEach(async () => {
      const imagePath = join(testDir, "test.gif");
      await writeFile(imagePath, minimalGif);

      const content = { filePath: join(testDir, "content.md") };
      result = await downloadImage(content, "test.gif");
    });

    it("returns an image/gif content type", async () => {
      expect(result.headers.get("Content-Type")).toBe("image/gif");
      const buffer = await result.arrayBuffer();
      expect(Buffer.from(buffer)).toEqual(minimalGif);
    });
  });

  describe("when the image is in a subdirectory", () => {
    beforeEach(async () => {
      const subdir = join(testDir, "subdir");
      await mkdir(subdir, { recursive: true });

      const imagePath = join(subdir, "test.png");
      await writeFile(imagePath, "fake image data");

      const content = { filePath: join(subdir, "content.md") };
      result = await downloadImage(content, "test.png");
    });

    it("resolves the image path relative to the content file", async () => {
      const buffer = await result.arrayBuffer();
      expect(Buffer.from(buffer).toString()).toBe("fake image data");
    });
  });

  describe("when the image does not exist", () => {
    it("throws an error", async () => {
      const content = { filePath: join(testDir, "content.md") };
      await expect(downloadImage(content, "nonexistent.png")).rejects.toThrow();
    });
  });

  describe("when the image has an unknown extension", () => {
    beforeEach(async () => {
      const imagePath = join(testDir, "test.unknown");
      await writeFile(imagePath, "fake data");
    });

    it("throws an error", async () => {
      const content = { filePath: join(testDir, "content.md") };
      await expect(downloadImage(content, "test.unknown")).rejects.toThrow(
        "Could not determine content type for image 'test.unknown'",
      );
    });
  });
});

describe("getContentImageSlugPairs", () => {
  describe("when the markdown has no images", () => {
    it("returns an empty array", () => {
      const contents = [
        {
          slug: "test-1",
          markdown: "This has no images",
        },
      ];

      const result = getContentImageSlugPairs(contents);
      expect(result).toEqual([]);
    });
  });

  describe("when the markdown has a single image", () => {
    it("returns an array with one slug-image pair", () => {
      const contents = [
        {
          slug: "test-1",
          markdown: "This has ![alt](./image.png)",
        },
      ];

      const result = getContentImageSlugPairs(contents);
      expect(result).toEqual([{ slug: "test-1", image: "./image.png" }]);
    });
  });

  describe("when the markdown has multiple images", () => {
    it("returns an array with multiple slug-image pairs", () => {
      const contents = [
        {
          slug: "test-1",
          markdown: "This has ![alt](./image1.jpg) and ![alt2](./image2.png)",
        },
      ];

      const result = getContentImageSlugPairs(contents);
      expect(result).toEqual([
        { slug: "test-1", image: "./image1.jpg" },
        { slug: "test-1", image: "./image2.png" },
      ]);
    });
  });

  describe("when there are multiple content items", () => {
    it("returns slug-image pairs for all content items", () => {
      const contents = [
        {
          slug: "test-1",
          markdown: "This has ![alt](./image1.png)",
        },
        {
          slug: "test-2",
          markdown: "This has ![alt](./image2.jpg)",
        },
      ];

      const result = getContentImageSlugPairs(contents);
      expect(result).toEqual([
        { slug: "test-1", image: "./image1.png" },
        { slug: "test-2", image: "./image2.jpg" },
      ]);
    });
  });

  describe("when a content item has multiple images", () => {
    it("returns all images with the same slug", () => {
      const contents = [
        {
          slug: "test-1",
          markdown: "![img1](./a.png) text ![img2](./b.jpg) more ![img3](./c.gif)",
        },
      ];

      const result = getContentImageSlugPairs(contents);
      expect(result).toEqual([
        { slug: "test-1", image: "./a.png" },
        { slug: "test-1", image: "./b.jpg" },
        { slug: "test-1", image: "./c.gif" },
      ]);
    });
  });

  describe("when the content array is empty", () => {
    it("returns an empty array", () => {
      const result = getContentImageSlugPairs([]);
      expect(result).toEqual([]);
    });
  });
});
