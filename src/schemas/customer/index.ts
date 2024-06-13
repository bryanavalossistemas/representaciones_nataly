import { z } from "zod";

const Schema = z.object({
  id: z.number(),
  name: z.string().min(1, {
    message: "El nombre del cliente es requerido",
  }),
  ruc: z.string().min(1, {
    message: "El ruc del cliente es requerido",
  }),
  address: z.string(),
  phone: z.string(),
});

export const CreateCustomerSchema = Schema.pick({
  name: true,
  ruc: true,
  address: true,
  phone: true,
});

export const UpdateCustomerSchema = Schema.pick({
  name: true,
  ruc: true,
  address: true,
  phone: true,
});
