import { TodayILearnedSchema } from "../schema";
import z from "zod";

/** An object containing the metadata and markdown of a today I Learned (TIL). */
export type TodayILearned = z.infer<typeof TodayILearnedSchema>;
