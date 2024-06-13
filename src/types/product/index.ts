import { CreateProductSchema, UpdateProductSchema } from "@/schemas/product";
import { Product, ProductImage } from "@prisma/client";
import { z } from "zod";

export type ProductType = Product;
export type ProductImageType = ProductImage;

export type CreateProductType = z.infer<typeof CreateProductSchema>;
export type UpdateProductType = z.infer<typeof UpdateProductSchema>;
