import { z } from "zod";

const Schema = z.object({
  id: z.number(),
  createdAt: z.date(),
  detailsPurchase: z.array(
    z.object({
      quantity: z.number(),
      cost: z.number(),
      idProduct: z.number(),
      idPurchase: z.number(),
    })
  ),
});

export const CreatePurchaseSchema = Schema.pick({ detailsPurchase: true });
export const UpdatePurchaseSchema = Schema.pick({ detailsPurchase: true });
