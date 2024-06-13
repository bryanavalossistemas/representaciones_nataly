import prisma from "../../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  const { categories, products } = initialData;

  await prisma.category.createMany({
    data: categories,
  });
  
  await prisma.product.createMany({
    data: products,
  });

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
