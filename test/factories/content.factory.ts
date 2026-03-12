import {
  DRAFT_STATUS,
  IDEA_STATUS,
  PUBLISHED_STATUS,
  STATUSES,
  WILL_NOT_PUBLISH_STATUS,
} from "../../src/constants";
import type { Content } from "../../src/types";
import { createContentFile } from "../content";
import { imageFactory } from "./image.factory";
import { DeepPartial, Factory } from "fishery";

type Status = (typeof STATUSES)[number];

export type ContentTransientParams = {
  directory: string;
};

export class ContentFactory<T extends Content> extends Factory<T, ContentTransientParams> {
  idea() {
    return this.params({ status: IDEA_STATUS as Status } as DeepPartial<T>);
  }

  draft() {
    return this.params({ status: DRAFT_STATUS } as DeepPartial<T>);
  }

  published() {
    return this.params({ status: PUBLISHED_STATUS } as DeepPartial<T>);
  }

  willNotPublish() {
    return this.params({ status: WILL_NOT_PUBLISH_STATUS } as DeepPartial<T>);
  }
}

export const contentFactory = ContentFactory.define<
  Content,
  ContentTransientParams,
  Content,
  Partial<Pick<Content, "status">>,
  ContentFactory<Content>
>(({ sequence, onCreate, transientParams }) => {
  onCreate((content) => createContentFile(transientParams.directory, content));

  return {
    title: `Test Content ${sequence}`,
    date: "2024-01-15",
    status: PUBLISHED_STATUS,
    content: "<p>This is test content.</p>",
    images: [imageFactory.build()],
    filePath: `content/Test Content ${sequence}.md`,
    slug: `test-content-${sequence}`,
    tags: ["tag"],
  };
});
