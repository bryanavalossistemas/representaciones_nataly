import { z } from "zod";

const Schema = z.object({
  id: z.number(),
  name: z.string().min(1, {
    message: "El nombre del producto es requerido",
  }),
  price: z.coerce.number().min(1, {
    message: "El precio del producto es requerido",
  }),
  cost: z.coerce.number().min(1, {
    message: "El costo del producto es requerido",
  }),
  stock: z.coerce.number().min(1, {
    message: "El stock del producto es requerido",
  }),
  idCategory: z.coerce.number().min(1, {
    message: "La categoría del producto es requerida",
  }),
});

export const CreateProductSchema = Schema.pick({ name: true, price: true, idCategory: true });
export const UpdateProductSchema = Schema.pick({ name: true, price: true, idCategory: true });
