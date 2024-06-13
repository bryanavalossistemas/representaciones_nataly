import { z } from "zod";

const Schema = z.object({
  idDetailSale: z.coerce.string(),
  price: z.coerce.number().min(1, {
    message: "El precio del detalle de venta es requerido",
  }),
  quantity: z.coerce.number().min(1, {
    message: "La cantidad del detalle de venta es requerido",
  }),
  product: z.object({
    idProduct: z.number().min(1, {
      message: "Debe elegir un producto",
    }),
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    idCategory: z.number(),
    productImages: z.array(
      z.object({
        idProductImage: z.number(),
        url: z.string(),
        idProduct: z.number(),
      })
    ),
  }),
});

export const DetailsSaleSchema = z.array(Schema);

export const DetailSaleSchema = Schema.pick({
  idDetailSale: true,
  price: true,
  quantity: true,
  product: true,
});

export const CreateDetailSaleSchema = Schema.pick({
  idDetailSale: true,
  price: true,
  quantity: true,
  product: true,
});

export const UpdateDetailSaleSchema = Schema.pick({
  idDetailSale: true,
  price: true,
  quantity: true,
  product: true,
});
