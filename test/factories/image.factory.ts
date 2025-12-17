import type { Image } from "../../src/types";
import { Factory } from "fishery";

export const imageFactory = Factory.define<Image>(({ sequence }) => ({
  source: `image-${sequence}.png`,
  filePath: `/test/images/image-${sequence}.png`,
  hash: `hash${sequence}abc`,
}));
