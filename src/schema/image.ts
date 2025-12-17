import { z } from "zod";

export const ImageSchema = z.object({
  source: z.string(),
  filePath: z.string(),
  hash: z.string(),
});
