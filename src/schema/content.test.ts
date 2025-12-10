import { contentFactory } from "../../test/factories";
import { ContentSchema } from "./content";
import { dedent } from "ts-dedent";
import { describe, it, expect } from "vitest";

describe("ContentSchema", () => {
  describe("when the content contains an H1 tag", () => {
    it("is invalid", () => {
      const content = contentFactory.build({
        content: dedent`
          <h1>This is an H1</h1>
          <p>Some content here.</p>
        `,
      });

      expect(() => ContentSchema.parse(content)).toThrow("Should not include an H1 tag");
    });
  });

  describe("when the content contains an h1 in a code block", () => {
    it("is valid", () => {
      const content = contentFactory.build({
        content: dedent`
          <p>Here's an example template:</p>
          <pre><code class="language-html">&lt;h1&gt;Title&lt;/h1&gt;
          </code></pre>
        `,
      });

      expect(() => ContentSchema.parse(content)).not.toThrow();
    });
  });
});
