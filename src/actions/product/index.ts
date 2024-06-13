"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { CreateProductSchema, UpdateProductSchema } from "@/schemas";
import { ProductType } from "@/types";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export async function createProduct(formData: FormData) {
  const data = Object.fromEntries(formData);
  const validatedFields = CreateProductSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: { message: "Campos faltantes. No se pudo crear el producto" },
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const { idProduct } = await tx.product.create({
        data: {
          ...validatedFields.data,
          price: validatedFields.data.price * 1000000,
        },
        select: {
          idProduct: true,
        },
      });

      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("No se pudo cargar las imágenes, rollingback");
        }

        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            idProduct,
          })),
        });
      }
    });

    revalidatePath("/admin/products");
  } catch (error) {
    return {
      error: {
        message: "Error de base de datos: No se pudo crear el producto",
      },
    };
  }
}

export async function updateProduct(
  idProduct: ProductType["idProduct"],
  formData: FormData
) {
  const data = Object.fromEntries(formData);
  const validatedFields = UpdateProductSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Campos faltantes. No se pudo actualizar el producto",
      },
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { idProduct },
        data: {
          ...validatedFields.data,
          price: validatedFields.data.price * 1000000,
        },
      });

      const images = await uploadImages(formData.getAll("images") as File[]);

      if (!images) {
        throw new Error("No se pudo cargar las imágenes, rollingback");
      }

      await prisma.productImage.createMany({
        data: images.map((image) => ({
          url: image!,
          idProduct,
        })),
      });

      revalidatePath("/admin/products");
    });
  } catch (error) {
    return {
      error: {
        message: "Error de base de datos: No se pudo actualizar el producto",
      },
    };
  }
}

export async function deleteProduct(idProduct: ProductType["idProduct"]) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.product.delete({
        where: { idProduct },
      });
      revalidatePath("/admin/products");
    });
  } catch (error) {
    return {
      error: {
        message: "Error de base de datos: No se pudo eliminar el producto",
      },
    };
  }
}

export async function deleteProductImage(imageId: number, imageUrl: string) {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se pueden borrar imagenes de FS",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await prisma.$transaction(async (tx) => {
      await cloudinary.uploader.destroy(imageName);
      await prisma.productImage.delete({
        where: {
          idProductImage: imageId,
        },
      });

      revalidatePath(`/admin/products`);
    });
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
