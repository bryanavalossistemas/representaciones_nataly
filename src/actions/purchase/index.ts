"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DetailPurchaseType, PurchaseType } from "@/types";
import { DetailsPurchaseSchema } from "@/schemas";

export async function createPurchase(data: DetailPurchaseType[]) {
  const validatedFields = DetailsPurchaseSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: { message: "Campos faltantes. No se pudo crear la compra" },
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: { createdAt: new Date() },
      });

      const createdDetailsPurchase = validatedFields.data.map(
        (detailPurchase) => {
          return tx.detailPurchase.create({
            data: {
              cost: detailPurchase.cost * 1000000,
              quantity: detailPurchase.quantity,
              idProduct: detailPurchase.product.idProduct,
              idPurchase: purchase.idPurchase,
            },
          });
        }
      );

      const products = await prisma.product.findMany({
        where: {
          idProduct: {
            in: validatedFields.data.map(
              (detailPurchase) => detailPurchase.product.idProduct
            ),
          },
        },
      });

      const updatedProducts = products.map((product) => {
        const productArray = validatedFields.data.filter(
          (detailPurchase) =>
            detailPurchase.product.idProduct === product.idProduct
        );

        const sumProduct = productArray.reduce(
          (acc, item) => item.quantity * item.cost + acc,
          0
        );

        const accumulatedQuantity = productArray.reduce(
          (acc, item) => item.quantity + acc,
          0
        );

        const averageProductCostAccumulated = sumProduct / accumulatedQuantity;

        const newStock = accumulatedQuantity + product.stock;

        const newCost =
          ((product.cost / 1000000) * product.stock +
            averageProductCostAccumulated * accumulatedQuantity) /
          newStock;

        return tx.product.update({
          where: { idProduct: product.idProduct },
          data: {
            cost: newCost * 1000000,
            stock: newStock,
          },
        });
      });

      await Promise.all([...createdDetailsPurchase, ...updatedProducts]);

      revalidatePath("/admin/purchases");
    });
  } catch (error: any) {
    return {
      error: {
        message: "Error de base de datos: No se pudo crear la compra",
      },
    };
  }
}

export async function updatePurchase(
  data: DetailPurchaseType[],
  idPurchase: PurchaseType["idPurchase"]
) {
  const validatedFields = DetailsPurchaseSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: { message: "Campos faltantes. No se pudo actualizar la compra" },
    };
  }

  const newTotal = validatedFields.data.reduce(
    (total, detailPurchase) =>
      total + detailPurchase.cost * detailPurchase.quantity,
    0
  );

  try {
    await prisma.$transaction(async (tx) => {
      const detailsPurchase = await tx.detailPurchase.findMany({
        where: { idPurchase },
        include: { product: true, purchase: true },
      });

      let productStock = 0;
      let producCost = 0;
      let idProduct = 0;

      detailsPurchase.map(async (detailPurchase) => {
        (productStock === 0 ||
          idProduct !== detailPurchase.product.idProduct) &&
          (productStock = detailPurchase.product.stock);
        (producCost === 0 || idProduct !== detailPurchase.product.idProduct) &&
          (producCost = detailPurchase.product.cost);
        idProduct = detailPurchase.product.idProduct;

        const newStock = productStock - detailPurchase.quantity;

        const newCost =
          newStock <= 0
            ? 0
            : (productStock * producCost -
                detailPurchase.quantity * detailPurchase.cost) /
              newStock;

        productStock = newStock;
        producCost = newCost;

        await Promise.all([
          tx.detailPurchase.delete({
            where: { idDetailPurchase: detailPurchase.idDetailPurchase },
          }),
          tx.product.update({
            where: { idProduct },
            data: {
              cost: producCost,
              stock: productStock,
            },
          }),
        ]);
      });

      const createdDetailsPurchase = validatedFields.data.map(
        (detailPurchase) => {
          return tx.detailPurchase.create({
            data: {
              cost: detailPurchase.cost * 1000000,
              quantity: detailPurchase.quantity,
              idProduct: detailPurchase.product.idProduct,
              idPurchase,
            },
          });
        }
      );

      const products = await tx.product.findMany({
        where: {
          idProduct: {
            in: validatedFields.data.map(
              (detailPurchase) => detailPurchase.product.idProduct
            ),
          },
        },
      });

      const updatedProducts = products.map((product) => {
        const productArray = validatedFields.data.filter(
          (detailPurchase) =>
            detailPurchase.product.idProduct === product.idProduct
        );

        const sumProduct = productArray.reduce(
          (acc, item) => item.quantity * item.cost + acc,
          0
        );

        const accumulatedQuantity = productArray.reduce(
          (acc, item) => item.quantity + acc,
          0
        );

        const averageProductCostAccumulated = sumProduct / accumulatedQuantity;

        const newStock = accumulatedQuantity + product.stock;

        const newCost =
          ((product.cost / 1000000) * product.stock +
            averageProductCostAccumulated * accumulatedQuantity) /
          newStock;

        return tx.product.update({
          where: { idProduct: product.idProduct },
          data: {
            cost: newCost * 1000000,
            stock: newStock,
          },
        });
      });

      await Promise.all([...createdDetailsPurchase, ...updatedProducts]);

      revalidatePath("/admin/purchases");
    });
  } catch (error: any) {
    return {
      error: {
        message: "Error de base de datos: no se pudo actualizar la compra",
      },
    };
  }
}

export async function deletePurchase(idPurchase: PurchaseType["idPurchase"]) {
  try {
    await prisma.$transaction(async (tx) => {
      const detailsPurchase = await tx.detailPurchase.findMany({
        where: { idPurchase },
        include: { product: true, purchase: true },
      });

      let productStock = 0;
      let producCost = 0;
      let idProduct = 0;

      detailsPurchase.map(async (detailPurchase) => {
        (productStock === 0 ||
          idProduct !== detailPurchase.product.idProduct) &&
          (productStock = detailPurchase.product.stock);
        (producCost === 0 || idProduct !== detailPurchase.product.idProduct) &&
          (producCost = detailPurchase.product.cost);
        idProduct = detailPurchase.product.idProduct;

        const newStock = productStock - detailPurchase.quantity;

        const newCost =
          newStock <= 0
            ? 0
            : (productStock * producCost -
                detailPurchase.quantity * detailPurchase.cost) /
              newStock;

        productStock = newStock;
        producCost = newCost;

        await Promise.all([
          tx.detailPurchase.delete({
            where: { idDetailPurchase: detailPurchase.idDetailPurchase },
          }),
          tx.product.update({
            where: { idProduct },
            data: {
              cost: producCost,
              stock: productStock,
            },
          }),
        ]);
      });

      await tx.purchase.delete({
        where: { idPurchase },
      });

      revalidatePath("/admin/purchases");
    });
  } catch (error: any) {
    return {
      error: {
        message: "Error de base de datos: No se pudo eliminar la compra",
      },
    };
  }
}
