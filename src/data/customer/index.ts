import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

const take = 9;

export async function fetchCustomersPages(query: string) {
  noStore();
  try {
    const count = await prisma.customer.count({
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" },
          },
          {
            address: { contains: query, mode: "insensitive" },
          },
          {
            phone: { contains: query, mode: "insensitive" },
          },
          {
            ruc: { contains: query, mode: "insensitive" },
          },
        ],
      },
    });
    const totalPages = Math.ceil(count / take);
    return totalPages;
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se pudo recuperar el número total de clientes");
  }
}

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number
) {
  noStore();
  const skip = (currentPage - 1) * take;
  try {
    const categories = await prisma.customer.findMany({
      where: {
        OR: [
          {
            name: { contains: query, mode: "insensitive" },
          },
          {
            address: { contains: query, mode: "insensitive" },
          },
          {
            phone: { contains: query, mode: "insensitive" },
          },
          {
            ruc: { contains: query, mode: "insensitive" },
          },
        ],
      },
      skip,
      take,
      orderBy: { idCustomer: "desc" },
    });
    return categories;
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se han podido recuperar los clientes filtrados");
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const customers = await prisma.customer.findMany();
    return customers;
  } catch (error) {
    console.error("Error de base de datos:", error);
    throw new Error("No se han podido recuperar los clientes");
  }
}
