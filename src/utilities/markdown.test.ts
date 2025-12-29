import {
  renderMarkdown,
  renderInlineMarkdown,
  stripHtmlTags,
  getMarkdownImages,
  replaceMarkdownImages,
} from "./markdown";
import { dedent } from "ts-dedent";

describe("renderMarkdown", () => {
  describe("when given basic markdown", () => {
    it("renders headings to HTML", () => {
      expect(renderMarkdown("# Hello World")).toContain("<h1>Hello World</h1>");
    });

    it("renders bold text", () => {
      expect(renderMarkdown("**bold text**")).toContain("<strong>bold text</strong>");
    });

    it("renders italic text", () => {
      expect(renderMarkdown("*italic text*")).toContain("<em>italic text</em>");
    });
  });

  describe("when given code blocks", () => {
    it("highlights code with specified language", () => {
      const html = renderMarkdown("```javascript\nconst x = 1;\n```");
      expect(html).toContain("language-javascript");
      expect(html).toContain("<code");
    });

    it("handles code blocks without language", () => {
      const html = renderMarkdown("```\nplain text\n```");
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

      const html = renderMarkdown(markdown);
      expect(html).toContain('class="overflow-x-auto my-4"');
      expect(html).toContain("<table>");
    });
  });

  describe("when the markdown contains leading and trailing whitespace", () => {
    it("removes the leading and trailing whitespace", () => {
      const markdown = "   \n\n# Title\n\nSome content.\n\n   ";
      const html = renderMarkdown(markdown);
      expect(html).toBe("<h1>Title</h1>\n<p>Some content.</p>");
    });
  });
});

describe("renderInlineMarkdown", () => {
  describe("when given bold text", () => {
    it("renders without wrapping in paragraph tags", () => {
      expect(renderInlineMarkdown("**bold text**")).toBe("<strong>bold text</strong>");
    });
  });

  describe("when given italic text", () => {
    it("renders without wrapping in paragraph tags", () => {
      expect(renderInlineMarkdown("*italic text*")).toBe("<em>italic text</em>");
    });
  });

  describe("when given a link", () => {
    it("renders without wrapping in paragraph tags", () => {
      expect(renderInlineMarkdown("[link](https://example.com)")).toBe(
        '<a href="https://example.com">link</a>',
      );
    });
  });

  describe("when given inline code", () => {
    it("renders without wrapping in paragraph tags", () => {
      expect(renderInlineMarkdown("`code`")).toBe("<code>code</code>");
    });
  });

  describe("when the markdown contains leading and trailing whitespace", () => {
    it("removes the leading and trailing whitespace", () => {
      const markdown = "   **bold text**   ";
      expect(renderInlineMarkdown(markdown)).toBe("<strong>bold text</strong>");
    });
  });
});

describe("stripHtmlTags", () => {
  describe("when the string contains no HTML tags", () => {
    it("returns the text unchanged", () => {
      expect(stripHtmlTags("Hello World")).toBe("Hello World");
    });
  });

  describe("when the string contains code tags", () => {
    it("removes the tags", () => {
      expect(stripHtmlTags("<code>using</code> Keyword")).toBe("using Keyword");
    });
  });

  describe("when the string contains strong tags", () => {
    it("removes the tags", () => {
      expect(stripHtmlTags("<strong>bold text</strong>")).toBe("bold text");
    });
  });

  describe("when the string contains em tags", () => {
    it("removes the tags", () => {
      expect(stripHtmlTags("<em>italic text</em>")).toBe("italic text");
    });
  });

  describe("when the string contains anchor tags", () => {
    it("removes the tags", () => {
      expect(stripHtmlTags('<a href="https://example.com">link</a>')).toBe("link");
    });
  });

  describe("when the string contains multiple HTML tags", () => {
    it("removes all the tags", () => {
      expect(stripHtmlTags("The <code>using</code> <strong>Keyword</strong>")).toBe(
        "The using Keyword",
      );
    });
  });

  describe("when the string is empty", () => {
    it("returns an empty string", () => {
      expect(stripHtmlTags("")).toBe("");
    });
  });

  describe("when the string is undefined", () => {
    it("returns undefined", () => {
      expect(stripHtmlTags(undefined)).toBeUndefined();
    });
  });
});

describe("replaceMarkdownImages", () => {
  describe("when the markdown has no images", () => {
    it("returns the markdown unchanged", () => {
      const markdown = "This is just text.";
      expect(replaceMarkdownImages(markdown, [])).toBe(markdown);
    });
  });

  describe("when the markdown contain an image", () => {
    it("replaces image path with URL derived from hash", () => {
      const markdown = "![alt text](image.png)";
      const images = [
        {
          source: "image.png",
          filePath: "/path/to/image.png",
          hash: "abc123",
        },
      ];
      expect(replaceMarkdownImages(markdown, images)).toBe("![alt text](/images/abc123.png)");
    });
  });

  describe("when the markdown contains multiple images", () => {
    it("replaces all image paths with their URLs", () => {
      const markdown = "![alt1](image1.png) ![alt2](image2.png)";
      const images = [
        {
          source: "image1.png",
          filePath: "/path/to/image1.png",
          hash: "abc123",
        },
        {
          source: "image2.png",
          filePath: "/path/to/image2.png",
          hash: "def456",
        },
      ];
      const result = replaceMarkdownImages(markdown, images);

      expect(result).toBe("![alt1](/images/abc123.png) ![alt2](/images/def456.png)");
    });
  });
});

describe("getMarkdownImages", () => {
  describe("when the markdown has no images", () => {
    it("returns an empty array", async () => {
      const markdown = "This is just text.";
      const result = await getMarkdownImages(markdown, "/base/dir/test-slug.md");
      expect(result).toEqual([]);
    });
  });
});
