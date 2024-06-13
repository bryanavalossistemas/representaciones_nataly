import { CreateDetailPurchaseSchema, DetailPurchaseSchema, UpdateDetailPurchaseSchema } from "@/schemas";
import { z } from "zod";

export type DetailPurchaseType = z.infer<typeof DetailPurchaseSchema>;

export type CreateDetailPurchaseType = z.infer<typeof CreateDetailPurchaseSchema>;
export type UpdateDetailPurchaseType = z.infer<typeof UpdateDetailPurchaseSchema>;

