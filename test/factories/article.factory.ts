import type { Article } from "../../src/types";
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
      markdown: "",
    });
  }
}

// Default to most common variant
export const articleFactory = ArticleFactory.define(({ sequence }) => ({
  ...contentFactory.build(),
  description: `A test article ${sequence}.`,
  markdown: `This is test article content ${sequence}.`,
}));
