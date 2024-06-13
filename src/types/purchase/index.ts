import { Purchase } from "@prisma/client";
import { CreatePurchaseSchema, UpdatePurchaseSchema } from "@/schemas";
import { z } from "zod";

export type PurchaseType = Purchase;
export type CreatePurchaseType = z.infer<typeof CreatePurchaseSchema>;
export type UpdatePurchaseType = z.infer<typeof UpdatePurchaseSchema>;
