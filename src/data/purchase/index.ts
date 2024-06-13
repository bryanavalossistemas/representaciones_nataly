import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import { Purchase } from "@prisma/client";
import { transformToUTC, transformToUTCAddOneDay } from "@/lib/utils";

const take = 9;

export async function fetchPurchasesPages(
  query: string,
  dateFrom: Date,
  dateTo: Date
) {
  noStore();
  try {
    const count = await prisma.purchase.count({
      where: {
        createdAt: {
          gte: transformToUTC(dateFrom),
          lte: transformToUTCAddOneDay(dateTo),
        },
      },
    });

    const totalPages = Math.ceil(count / take);
    return totalPages;
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se pudo recuperar el número total de las compras");
  }
}

export async function fetchFilteredPurchases(
  query: string,
  currentPage: number,
  dateFrom: Date,
  dateTo: Date
) {
  noStore();
  const skip = (currentPage - 1) * take;
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        detailsPurchase: { include: { product: true } },
      },
      where: {
        createdAt: {
          gte: transformToUTC(dateFrom),
          lte: transformToUTCAddOneDay(dateTo),
        },
      },
      skip,
      take,
      orderBy: { idPurchase: "desc" },
    });

    return purchases.map((purchase) => {
      return {
        ...purchase,
        detailsPurchase: purchase.detailsPurchase.map((detailPurchase) => {
          return { ...detailPurchase, cost: detailPurchase.cost / 1000000 };
        }),
      };
    });
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se han podido recuperar las compras");
  }
}

// export async function fetchDetailsPurchaseByPurchaseId(
//   purchaseId: Purchase["id"]
// ) {
//   noStore();
//   try {
//     const detailsPurchaseDB = await prisma.detailPurchase.findMany({
//       where: {
//         purchase_id: purchaseId,
//       },
//       include: {
//         Product: true,
//       },
//     });

//     const detailsPurchase = detailsPurchaseDB.map((detailPurchase) => {
//       return { ...detailPurchase, cost: detailPurchase.cost / 100 };
//     });

//     return detailsPurchase;
//   } catch (error) {
//     console.error("Error de base de datos:", error);
//     throw new Error("No se han podido recuperar las detalles de la compra");
//   }
// }
