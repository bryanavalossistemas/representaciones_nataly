import { z } from "zod";

const Schema = z.object({
  id: z.number(),
  name: z.string().min(1, {
    message: "El nombre de la categoría es requerido",
  }),
});

export const CreateCategorySchema = Schema.pick({ name: true });
export const UpdateCategorySchema = Schema.pick({ name: true });
