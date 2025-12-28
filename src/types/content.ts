import { ContentSchema, ImageSchema, LooseContentSchema } from "../schema";
import z from "zod";

/** An object containing the metadata and markdown of some form of content. */
export type Content = z.infer<typeof ContentSchema>;

/** A version of Content that allows unknown properties to be passed through. */
export type PassthroughContent = z.infer<typeof LooseContentSchema>;

/** An image referenced in markdown content. */
export type Image = z.infer<typeof ImageSchema>;
