import { CATEGORIES, TECHNOLOGIES, MEDIAS } from "../constants";
import { z } from "zod";

export const CategorySchema = z.enum(CATEGORIES);
export const TechnologySchema = z.enum(TECHNOLOGIES);
export const MediaSchema = z.enum(MEDIAS);
