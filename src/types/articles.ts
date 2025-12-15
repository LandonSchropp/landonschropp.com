import { ArticleSchema } from "../schema";
import z from "zod";

/** An object containing the metadata and markdown of an article. */
export type Article = z.infer<typeof ArticleSchema>;
