import z from "zod";

export const TagSearchSchema = z.object({
  tag: z.string().optional(),
});
