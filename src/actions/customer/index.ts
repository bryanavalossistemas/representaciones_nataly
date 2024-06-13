"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateCustomerType, CustomerType, UpdateCustomerType } from "@/types";
import { CreateCustomerSchema, UpdateCustomerSchema } from "@/schemas";

export async function createCustomer(data: CreateCustomerType) {
  const validatedFields = CreateCustomerSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: { message: "Campos faltantes. No se pudo crear el cliente" },
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.customer.create({
        data: validatedFields.data,
      });
      revalidatePath("/admin/customers");
    });
  } catch (error) {
    return {
      error: {
        message: "Error de base de datos: No se pudo crear el cliente",
      },
    };
  }
}

export async function updateCustomer(
  idCustomer: CustomerType["idCustomer"],
  data: UpdateCustomerType
) {
  const validatedFields = UpdateCustomerSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Campos faltantes. No se pudo actualizar el cliente",
      },
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.customer.update({
        where: { idCustomer },
        data: validatedFields.data,
      });
      revalidatePath("/admin/customers");
    });
  } catch (error) {
    return {
      error: {
        message: "Error de base de datos: No se pudo actualizar el cliente",
      },
    };
  }
}

export async function deleteCustomer(idCustomer: CustomerType["idCustomer"]) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.customer.delete({
        where: { idCustomer },
      });
      revalidatePath("/admin/customers");
    });
  } catch (error) {
    return {
      error: {
        message: "Error de base de datos: No se pudo eliminar el cliente",
      },
    };
  }
}
