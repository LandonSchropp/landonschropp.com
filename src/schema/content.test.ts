import { ContentSchema } from "./content";
import { dedent } from "ts-dedent";
import { describe, it, expect } from "vitest";

describe("ContentSchema", () => {
  describe("when the markdown contains an H1 after frontmatter", () => {
    it("is invalid", () => {
      const content = {
        title: "Test",
        date: "2024-01-01",
        status: "Published",
        markdown: dedent`
          ---
          title: Test
          ---

          # This is an H1

          Some content here.
        `,
        filePath: "/test.md",
        slug: "test",
        tags: [],
      };

      expect(() => ContentSchema.parse(content)).toThrow("Markdown should not contain an H1");
    });
  });

  describe("when the markdown contains an H1 in a markdown code block", () => {
    it("is valid", () => {
      const content = {
        title: "Test",
        date: "2024-01-01",
        status: "Published",
        markdown: dedent`
          ---
          title: Test
          ---

          ## Example

          Here's an example template:

          \`\`\`markdown
          # Title

          ## Overview
          \`\`\`
        `,
        filePath: "/test.md",
        slug: "test",
        tags: [],
      };

      expect(() => ContentSchema.parse(content)).not.toThrow();
    });
  });

  describe("when the markdown contains a # comment in a Ruby code block", () => {
    it("is valid", () => {
      const content = {
        title: "Test",
        date: "2024-01-01",
        status: "Published",
        markdown: dedent`
          ---
          title: Test
          ---

          ## Code Example

          \`\`\`ruby
          # This is a comment
          def hello
            puts "Hello"
          end
          \`\`\`
        `,
        filePath: "/test.md",
        slug: "test",
        tags: [],
      };

      expect(() => ContentSchema.parse(content)).not.toThrow();
    });
  });
});
