import { CreateDetailSaleSchema, DetailSaleSchema, DetailsSaleSchema, UpdateDetailSaleSchema } from "@/schemas";
import { z } from "zod";

export type DetailSaleType = z.infer<typeof DetailSaleSchema>;

export type DetailsSaleType = z.infer<typeof DetailsSaleSchema>;

export type CreateDetailSaleType = z.infer<typeof CreateDetailSaleSchema>;
export type UpdateDetailSaleType = z.infer<typeof UpdateDetailSaleSchema>;

