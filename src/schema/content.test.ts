import { contentFactory } from "../../test/factories";
import { ContentSchema } from "./content";
import { dedent } from "ts-dedent";
import { describe, it, expect } from "vitest";

describe("ContentSchema", () => {
  describe("when the markdown contains an H1 after frontmatter", () => {
    it("is invalid", () => {
      const content = contentFactory.build({
        markdown: dedent`
          ---
          title: Test
          ---

          # This is an H1

          Some content here.
        `,
      });

      expect(() => ContentSchema.parse(content)).toThrow("Markdown should not contain an H1");
    });
  });

  describe("when the markdown contains an H1 in a markdown code block", () => {
    it("is valid", () => {
      const content = contentFactory.build({
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
      });

      expect(() => ContentSchema.parse(content)).not.toThrow();
    });
  });

  describe("when the markdown contains a # comment in a Ruby code block", () => {
    it("is valid", () => {
      const content = contentFactory.build({
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
      });

      expect(() => ContentSchema.parse(content)).not.toThrow();
    });
  });
});
