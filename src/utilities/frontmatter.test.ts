import { parseFrontmatter } from "./frontmatter";
import { dedent } from "ts-dedent";

describe("parseFrontmatter", () => {
  describe("when the content has frontmatter", () => {
    it("parses the frontmatter", () => {
      const content = dedent`
        ---
        title: Hello World
        date: 2023-01-01
        ---
        This is the content.
      `;

      const [frontmatter, remaining] = parseFrontmatter("test.md", content);

      expect(frontmatter).toEqual({ title: "Hello World", date: "2023-01-01" });
      expect(remaining).toContain("This is the content");
    });
  });

  describe("when the content has nested frontmatter", () => {
    it("parses the frontmatter", () => {
      const content = dedent`
        ---
        title: Hello World
        metadata:
          author: John Doe
          tags:
            - javascript
            - testing
        ---
        Content here.
      `;

      const [frontmatter] = parseFrontmatter("test.md", content);

      expect(frontmatter).toEqual({
        title: "Hello World",
        metadata: {
          author: "John Doe",
          tags: ["javascript", "testing"],
        },
      });
    });
  });

  describe("when the content has no frontmatter", () => {
    it("returns an empty object and the original content", () => {
      const content = "This is just content without frontmatter.";

      const [frontmatter, remaining] = parseFrontmatter("test.md", content);

      expect(frontmatter).toEqual({});
      expect(remaining).toBe(content);
    });
  });

  describe("when the frontmatter is invalid YAML", () => {
    it("throws an error with the file path", () => {
      const content = dedent`
        ---
        title: Hello World
        invalid: : yaml
        ---
        Content
      `;

      expect(() => parseFrontmatter("test.md", content)).toThrow(
        "Error parsing frontmatter from file 'test.md'",
      );
    });
  });
});
