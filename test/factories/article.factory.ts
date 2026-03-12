import type { Article } from "../../src/types";
import { createContentFile } from "../content";
import { ContentFactory, contentFactory } from "./content.factory";

export class ArticleFactory extends ContentFactory<Article> {
  internal() {
    return this.params({});
  }

  external() {
    const sequence = this.sequence();

    return this.params({
      publisher: `Publisher ${sequence}`,
      url: `https://example.com/${sequence}`,
    });
  }
}

// Default to most common variant
export const articleFactory = ArticleFactory.define(({ sequence, onCreate, transientParams }) => {
  onCreate((content) => createContentFile(transientParams.directory, content));

  return {
    ...contentFactory.build(),
    filePath: `articles/Test Article ${sequence}.md`,
    description: `A test article ${sequence}.`,
  };
});
