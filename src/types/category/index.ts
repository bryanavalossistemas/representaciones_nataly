import { Category } from "@prisma/client";
import {  CreateCategorySchema, UpdateCategorySchema } from "@/schemas";
import { z } from "zod";

export type CategoryType = Category;
export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;
