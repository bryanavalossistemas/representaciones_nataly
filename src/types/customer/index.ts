import { CreateCustomerSchema, UpdateCustomerSchema } from "@/schemas";
import { Customer } from "@prisma/client";
import { z } from "zod";

export type CustomerType = Customer;
export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerType = z.infer<typeof UpdateCustomerSchema>;
