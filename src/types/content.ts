import { ContentSchema } from "../schema";
import z, { PassthroughType } from "zod";

/** An object containing the metadata and markdown of some form of content. */
export type Content = z.infer<typeof ContentSchema>;

/** A version of Content that allows unknown properties to be passed through. */
export type PassthroughContent = z.infer<typeof ContentSchema> & PassthroughType<"passthrough">;
