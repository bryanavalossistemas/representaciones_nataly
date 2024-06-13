"use server";

import prisma from "@/lib/prisma";
import { DetailsSaleSchema } from "@/schemas";
import { CustomerType, DetailSaleType } from "@/types";
import { revalidatePath } from "next/cache";

export async function createSale(
  data: DetailSaleType[],
  customer: CustomerType
) {
  const validatedFields = DetailsSaleSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: { message: "Campos faltantes. No se pudo crear la venta" },
    };
  }

  try {
    const sale = await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: { createdAt: new Date(), idCustomer: customer.idCustomer },
      });

      const createdDetailsSale = validatedFields.data.map((detailSale) => {
        return tx.detailSale.create({
          data: {
            quantity: detailSale.quantity,
            idProduct: detailSale.product.idProduct,
            price: detailSale.price * 1000000,
            idSale: sale.idSale,
          },
        });
      });

      const products = await prisma.product.findMany({
        where: {
          idProduct: {
            in: validatedFields.data.map(
              (detailSale) => detailSale.product.idProduct
            ),
          },
        },
      });

      const updatedProducts = products.map((product) => {
        const productArray = validatedFields.data.filter(
          (detailSale) => detailSale.product.idProduct === product.idProduct
        );

        const accumulatedQuantity = productArray.reduce(
          (acc, item) => item.quantity + acc,
          0
        );

        const newStock = product.stock - accumulatedQuantity;

        if (newStock < 0) {
          throw new Error(
            "No existe suficiente stock para el producto: " + product.name
          );
        }

        return tx.product.update({
          where: { idProduct: product.idProduct },
          data: {
            stock: newStock,
          },
        });
      });

      await Promise.all([...createdDetailsSale, ...updatedProducts]);

      return sale;
    });

    revalidatePath("/admin/sales");

    return {
      success: {
        message: { sale },
      },
    };
  } catch (error: any) {
    return {
      error: {
        message: error.message
          ? error.message
          : "Error de base de datos: No se pudo crear la compra",
      },
    };
  }
}

// export async function updateSale(
//   data: DetailSaleType[],
//   idSale: SaleType["idSale"]
// ) {
//   const validatedFields = DetailsSaleSchema.safeParse(data);

//   if (!validatedFields.success) {
//     return {
//       error: { message: "Campos faltantes. No se pudo actualizar la compra" },
//     };
//   }

//   const newTotal = validatedFields.data.reduce(
//     (total, detailSale) => total + detailSale.cost * detailSale.quantity,
//     0
//   );

//   try {
//     await prisma.$transaction(async (tx) => {
//       const detailsSale = await tx.detailSale.findMany({
//         where: { idSale },
//         include: { product: true, sale: true },
//       });

//       let productStock = 0;
//       let producCost = 0;
//       let idProduct = 0;

//       detailsSale.map(async (detailSale) => {
//         (productStock === 0 || idProduct !== detailSale.product.idProduct) &&
//           (productStock = detailSale.product.stock);
//         (producCost === 0 || idProduct !== detailSale.product.idProduct) &&
//           (producCost = detailSale.product.cost);
//         idProduct = detailSale.product.idProduct;

//         const newStock = productStock - detailSale.quantity;

//         const newCost =
//           newStock <= 0
//             ? 0
//             : (productStock * producCost -
//                 detailSale.quantity * detailSale.cost) /
//               newStock;

//         productStock = newStock;
//         producCost = newCost;

//         await Promise.all([
//           tx.detailSale.delete({
//             where: { idDetailSale: detailSale.idDetailSale },
//           }),
//           tx.product.update({
//             where: { idProduct },
//             data: {
//               cost: producCost,
//               stock: productStock,
//             },
//           }),
//         ]);
//       });

//       const createdDetailsSale = validatedFields.data.map((detailSale) => {
//         return tx.detailSale.create({
//           data: {
//             cost: detailSale.cost * 1000000,
//             quantity: detailSale.quantity,
//             idProduct: detailSale.product.idProduct,
//             idSale,
//           },
//         });
//       });

//       const products = await tx.product.findMany({
//         where: {
//           idProduct: {
//             in: validatedFields.data.map(
//               (detailSale) => detailSale.product.idProduct
//             ),
//           },
//         },
//       });

//       const updatedProducts = products.map((product) => {
//         const productArray = validatedFields.data.filter(
//           (detailSale) => detailSale.product.idProduct === product.idProduct
//         );

//         const sumProduct = productArray.reduce(
//           (acc, item) => item.quantity * item.cost + acc,
//           0
//         );

//         const accumulatedQuantity = productArray.reduce(
//           (acc, item) => item.quantity + acc,
//           0
//         );

//         const averageProductCostAccumulated = sumProduct / accumulatedQuantity;

//         const newStock = accumulatedQuantity + product.stock;

//         const newCost =
//           ((product.cost / 1000000) * product.stock +
//             averageProductCostAccumulated * accumulatedQuantity) /
//           newStock;

//         return tx.product.update({
//           where: { idProduct: product.idProduct },
//           data: {
//             cost: newCost * 1000000,
//             stock: newStock,
//           },
//         });
//       });

//       await Promise.all([...createdDetailsSale, ...updatedProducts]);

//       revalidatePath("/admin/sales");
//     });
//   } catch (error: any) {
//     return {
//       error: {
//         message: "Error de base de datos: no se pudo actualizar la compra",
//       },
//     };
//   }
// }

// export async function deleteSale(idSale: SaleType["idSale"]) {
//   try {
//     await prisma.$transaction(async (tx) => {
//       const detailsSale = await tx.detailSale.findMany({
//         where: { idSale },
//         include: { product: true, sale: true },
//       });

//       let productStock = 0;
//       let producCost = 0;
//       let idProduct = 0;

//       detailsSale.map(async (detailSale) => {
//         (productStock === 0 || idProduct !== detailSale.product.idProduct) &&
//           (productStock = detailSale.product.stock);
//         (producCost === 0 || idProduct !== detailSale.product.idProduct) &&
//           (producCost = detailSale.product.cost);
//         idProduct = detailSale.product.idProduct;

//         const newStock = productStock - detailSale.quantity;

//         const newCost =
//           newStock <= 0
//             ? 0
//             : (productStock * producCost -
//                 detailSale.quantity * detailSale.cost) /
//               newStock;

//         productStock = newStock;
//         producCost = newCost;

//         await Promise.all([
//           tx.detailSale.delete({
//             where: { idDetailSale: detailSale.idDetailSale },
//           }),
//           tx.product.update({
//             where: { idProduct },
//             data: {
//               cost: producCost,
//               stock: productStock,
//             },
//           }),
//         ]);
//       });

//       await tx.sale.delete({
//         where: { idSale },
//       });

//       revalidatePath("/admin/sales");
//     });
//   } catch (error: any) {
//     return {
//       error: {
//         message: "Error de base de datos: No se pudo eliminar la compra",
//       },
//     };
//   }
// }
