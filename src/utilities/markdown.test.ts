import {
  convertMarkdownToHtml,
  getMarkdownImageSourcePaths,
  prefixMarkdownImageSourcePaths,
} from "./markdown";
import { dedent } from "ts-dedent";

describe("convertMarkdownToHtml", () => {
  describe("when given basic markdown", () => {
    it("converts headings to HTML", () => {
      expect(convertMarkdownToHtml("# Hello World")).toContain("<h1>Hello World</h1>");
    });

    it("converts bold text", () => {
      expect(convertMarkdownToHtml("**bold text**")).toContain("<strong>bold text</strong>");
    });

    it("converts italic text", () => {
      expect(convertMarkdownToHtml("*italic text*")).toContain("<em>italic text</em>");
    });
  });

  describe("when given code blocks", () => {
    it("highlights code with specified language", () => {
      const html = convertMarkdownToHtml("```javascript\nconst x = 1;\n```");
      expect(html).toContain("language-javascript");
      expect(html).toContain("<code");
    });

    it("handles code blocks without language", () => {
      const html = convertMarkdownToHtml("```\nplain text\n```");
      expect(html).toContain("plain text");
    });
  });

  describe("when given a table", () => {
    it("wraps the table in a responsive container", () => {
      const markdown = dedent`
        | Header 1 | Header 2 |
        | -------- | -------- |
        | Cell 1   | Cell 2   |
      `;

      const html = convertMarkdownToHtml(markdown);
      expect(html).toContain('class="overflow-x-auto my-4"');
      expect(html).toContain("<table>");
    });
  });
});

describe("prefixMarkdownImageSourcePaths", () => {
  describe("when the markdown has no images", () => {
    it("returns the markdown unchanged", () => {
      const markdown = "This is just text.";
      expect(prefixMarkdownImageSourcePaths(markdown, "/prefix")).toBe(markdown);
    });
  });

  describe("when the markdown contain an image", () => {
    it("prepends the prefix to image path", () => {
      const markdown = "![alt text](image.png)";
      expect(prefixMarkdownImageSourcePaths(markdown, "/prefix")).toBe(
        "![alt text](/prefix/image.png)",
      );
    });
  });

  describe("when the markdown contains multiple images", () => {
    it("prepends the prefix to the image paths", () => {
      const markdown = "![alt1](image1.png) ![alt2](image2.png)";
      const result = prefixMarkdownImageSourcePaths(markdown, "/prefix");

      expect(result).toBe("![alt1](/prefix/image1.png) ![alt2](/prefix/image2.png)");
    });
  });

  describe("when given a null prefix", () => {
    it("returns the markdown unchanged", () => {
      const markdown = "![alt text](image.png)";
      expect(prefixMarkdownImageSourcePaths(markdown, null)).toBe(markdown);
    });
  });
});

describe("getMarkdownImageSourcePaths", () => {
  describe("when the markdown has no images", () => {
    it("returns an empty array", () => {
      const markdown = "This is just text.";
      expect(getMarkdownImageSourcePaths(markdown)).toEqual([]);
    });
  });

  describe("when the markdown contains a single image", () => {
    it("extracts the image path", () => {
      const markdown = "![alt text](image.png)";
      expect(getMarkdownImageSourcePaths(markdown)).toEqual(["image.png"]);
    });
  });

  describe("when the markdown contains multiple images", () => {
    it("extracts all image paths", () => {
      const markdown = "![alt1](image1.png) ![alt2](image2.png)";
      expect(getMarkdownImageSourcePaths(markdown)).toEqual(["image1.png", "image2.png"]);
    });
  });

  describe("when the markdown contains a URL in an image path", () => {
    it("extracts the URL", () => {
      const markdown = "![alt](https://example.com/image.png)";
      expect(getMarkdownImageSourcePaths(markdown)).toEqual(["https://example.com/image.png"]);
    });
  });
});
