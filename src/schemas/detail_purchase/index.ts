import { z } from "zod";

const Schema = z.object({
  idDetailPurchase: z.coerce.string(),
  cost: z.coerce.number().min(1, {
    message: "El costo del detalle de compra es requerido",
  }),
  quantity: z.coerce.number().min(1, {
    message: "La cantidad del detalle de compra es requerido",
  }),
  product: z.object({
    idProduct: z.number().min(1, {
      message: "Debe elegir un producto",
    }),
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    idCategory: z.number(),
  }),
});

export const DetailsPurchaseSchema = z.array(Schema);

export const DetailPurchaseSchema = Schema.pick({
  idDetailPurchase: true,
  cost: true,
  quantity: true,
  product: true,
});

export const CreateDetailPurchaseSchema = Schema.pick({
  idDetailPurchase: true,
  cost: true,
  quantity: true,
  product: true,
});

export const UpdateDetailPurchaseSchema = Schema.pick({
  idDetailPurchase: true,
  cost: true,
  quantity: true,
  product: true,
});
