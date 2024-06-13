import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

const take = 9;

export async function fetchProductsPages(query: string) {
  noStore();
  try {
    const count = await prisma.product.count({
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" },
          },
          {
            category: { name: { contains: query, mode: "insensitive" } },
          },
        ],
      },
    });
    const totalPages = Math.ceil(count / take);
    return totalPages;
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se pudo recuperar el número total de productos");
  }
}

export async function fetchFilteredProducts(
  query: string,
  currentPage: number
) {
  noStore();
  const skip = (currentPage - 1) * take;
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        productImages: true,
      },
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" },
          },
          {
            category: { name: { contains: query, mode: "insensitive" } },
          },
        ],
      },
      skip,
      take,
      orderBy: { idProduct: "desc" },
    });

    return products.map((product) => {
      return {
        ...product,
        price: product.price / 1000000,
        cost: product.cost / 1000000,
      };
    });
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se han podido recuperar los productos filtrados");
  }
}

export async function fetchFilteredProducts2(query: string) {
  noStore();
  try {
    const products = await prisma.product.findMany({
      include: {
        productImages: true,
      },
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" },
          },
          {
            category: { name: { contains: query, mode: "insensitive" } },
          },
        ],
      },
    });

    return products.map((product) => {
      return {
        ...product,
        price: product.price / 1000000,
        cost: product.cost / 1000000,
      };
    });
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se han podido recuperar los productos filtrados");
  }
}

export async function fetchProducts() {
  noStore();
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se han podido recuperar los productos");
  }
}
