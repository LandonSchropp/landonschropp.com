import { CategorySchema, TechnologySchema } from "../schema";
import z from "zod";

export * from "./articles";
export * from "./content";
export * from "./dynamic-svg";
export * from "./notes";
export * from "./today-i-learned";

// TODO: The following types will soon be removed.

/** A topical category of content. */
export type Category = z.infer<typeof CategorySchema>;

/** A category of technology, such as a programming language or framework. */
export type Technology = z.infer<typeof TechnologySchema>;
