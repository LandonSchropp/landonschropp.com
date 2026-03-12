import type { Content } from "../../src/types";
import { createContentFile } from "../content";
import { ContentFactory, contentFactory } from "./content.factory";

export const todayILearnedFactory = ContentFactory.define<Content>(
  ({ sequence, onCreate, transientParams }) => {
    onCreate((content) => createContentFile(transientParams.directory, content));

    return {
      ...contentFactory.build(),
      filePath: `today-i-learned/Test TIL ${sequence}.md`,
    };
  },
);
