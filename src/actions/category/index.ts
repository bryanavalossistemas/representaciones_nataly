"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateCategorySchema, UpdateCategorySchema } from "@/schemas";
import { CreateCategoryType, CategoryType, UpdateCategoryType } from "@/types";

export async function createCategory(data: CreateCategoryType) {
  const validatedFields = CreateCategorySchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: { message: "Campos faltantes. No se pudo crear la categoría" },
    };
  }
  try {
    await prisma.$transaction(async (tx) => {
      await tx.category.create({
        data,
      });
      revalidatePath("/admin/categories");
    });
  } catch (error) {
    return {
      error: {
        message: "Error de base de datos: no se pudo crear la categoría",
      },
    };
  }
}

export async function updateCategory(
  idCategory: CategoryType["idCategory"],
  data: UpdateCategoryType
) {
  const validatedFields = UpdateCategorySchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: {
        message: "Campos faltantes. No se pudo actualizar la categoría",
      },
    };
  }
  try {
    await prisma.$transaction(async (tx) => {
      await tx.category.update({
        where: { idCategory },
        data,
      });
      revalidatePath("/admin/categories");
    });
  } catch (error) {
    return {
      error: {
        message: "Error de base de datos: No se pudo actualizar la categoría",
      },
    };
  }
}

export async function deleteCategory(idCategory: CategoryType["idCategory"]) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.category.delete({
        where: { idCategory },
      });
      revalidatePath("/admin/categories");
    });
  } catch (error) {
    return {
      error: {
        message: "Error de base de datos: No se pudo eliminar la categoría",
      },
    };
  }
}
