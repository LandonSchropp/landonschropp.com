import { contentFactory } from "../../test/factories";
import { downloadImage, generateImageHash } from "./image";
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

      const content = contentFactory.build({ filePath: join(testDir, "content.md") });
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

      const content = contentFactory.build({ filePath: join(testDir, "content.md") });
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

      const content = contentFactory.build({ filePath: join(testDir, "content.md") });
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

      const content = contentFactory.build({ filePath: join(testDir, "content.md") });
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

      const content = contentFactory.build({ filePath: join(subdir, "content.md") });
      result = await downloadImage(content, "test.png");
    });

    it("resolves the image path relative to the content file", async () => {
      const buffer = await result.arrayBuffer();
      expect(Buffer.from(buffer).toString()).toBe("fake image data");
    });
  });

  describe("when the image does not exist", () => {
    it("throws an error", async () => {
      const content = contentFactory.build({ filePath: join(testDir, "content.md") });
      await expect(downloadImage(content, "nonexistent.png")).rejects.toThrow();
    });
  });

  describe("when the image has an unknown extension", () => {
    beforeEach(async () => {
      const imagePath = join(testDir, "test.unknown");
      await writeFile(imagePath, "fake data");
    });

    it("throws an error", async () => {
      const content = contentFactory.build({ filePath: join(testDir, "content.md") });
      await expect(downloadImage(content, "test.unknown")).rejects.toThrow(
        "Could not determine content type for image 'test.unknown'",
      );
    });
  });
});

describe("generateImageHash", () => {
  const hashTestDir = join(tmpdir(), `hash-test-${Date.now()}`);

  beforeEach(async () => {
    await mkdir(hashTestDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(hashTestDir, { recursive: true, force: true });
  });

  describe("when given a valid image file", () => {
    it("returns a 32-character hexadecimal hash", async () => {
      const imagePath = join(hashTestDir, "test-image.png");
      await writeFile(imagePath, Buffer.from("fake image content"));

      const hash = await generateImageHash(imagePath);

      expect(hash).toMatch(/^[a-f0-9]{32}$/);
    });
  });

  describe("when the same file is hashed multiple times", () => {
    it("returns the same hash", async () => {
      const imagePath = join(hashTestDir, "test-image.png");
      await writeFile(imagePath, Buffer.from("fake image content"));

      const hash1 = await generateImageHash(imagePath);
      const hash2 = await generateImageHash(imagePath);

      expect(hash1).toBe(hash2);
    });
  });

  describe("when the file content changes", () => {
    it("returns a different hash", async () => {
      const imagePath = join(hashTestDir, "test-image.png");
      await writeFile(imagePath, Buffer.from("original content"));

      const hash1 = await generateImageHash(imagePath);

      await writeFile(imagePath, Buffer.from("modified content"));
      const hash2 = await generateImageHash(imagePath);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("when different files have different content", () => {
    it("returns different hashes", async () => {
      const image1Path = join(hashTestDir, "image1.png");
      const image2Path = join(hashTestDir, "image2.png");

      await writeFile(image1Path, Buffer.from("content A"));
      await writeFile(image2Path, Buffer.from("content B"));

      const hash1 = await generateImageHash(image1Path);
      const hash2 = await generateImageHash(image2Path);

      expect(hash1).not.toBe(hash2);
    });
  });
});
