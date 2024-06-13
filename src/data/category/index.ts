import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

const take = 9;

export async function fetchCategoriesPages(query: string) {
  noStore();
  try {
    const count = await prisma.category.count({
      where: {
        name: {
          mode: "insensitive",
          contains: query,
        },
      },
    });
    const totalPages = Math.ceil(count / take);
    return totalPages;
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error(
      "No se pudo recuperar el número total de páginas de la categorías"
    );
  }
}

export async function fetchFilteredCategories(
  query: string,
  currentPage: number
) {
  noStore();
  const skip = (currentPage - 1) * take;
  try {
    const categories = await prisma.category.findMany({
      where: { name: { mode: "insensitive", contains: query } },
      skip,
      take,
      orderBy: { idCategory: "desc" },
    });
    return categories;
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se han podido recuperar las categorías filtradas");
  }
}

export async function fetchCategories() {
  noStore();
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se han podido recuperar las categorías");
  }
}
