import DeleteButton from "./delete-button";
import UpdateButton from "./update-button";
import UpdateButtonMobile from "./update-button-mobile";
import { fetchFilteredProducts } from "@/data";
import { ProductImageItem } from "./product-image";
import { formatCurrency } from "@/lib/utils";
import { CategoryType } from "@/types";
import {
  Table as TableWrapper,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableProps = {
  query: string;
  currentPage: number;
  categories: CategoryType[];
};

export default async function Table({
  query,
  currentPage,
  categories,
}: TableProps) {
  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <TableWrapper>
      <TableHeader>
        <TableRow>
          <TableHead>Imagen</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead className="text-center">Stock</TableHead>
          <TableHead className="text-right">Precio Costo</TableHead>
          <TableHead className="text-right">Precio Venta</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.idProduct}>
            <TableCell>
              <ProductImageItem
                src={product.productImages[0]?.url}
                width={200}
                height={200}
                alt={product.name}
                className="max-w-20 h-20 object-cover rounded-md"
              />
            </TableCell>
            <TableCell className="font-medium capitalize">
              {product.name}
            </TableCell>
            <TableCell className="font-medium capitalize">
              {product.category.name}
            </TableCell>
            <TableCell className="font-medium capitalize text-center">
              {product.stock}
            </TableCell>
            <TableCell className="font-bold capitalize text-right">
              {formatCurrency(product.cost)}
            </TableCell>
            <TableCell className="font-bold capitalize text-right">
              {formatCurrency(product.price)}
            </TableCell>
            <TableCell>
              <div className="flex gap-x-1 justify-end">
                <div className="hidden sm:block">
                  <UpdateButton product={product} categories={categories} />
                </div>
                <div className="sm:hidden">
                  <UpdateButtonMobile
                    product={product}
                    categories={categories}
                  />
                </div>
                <DeleteButton idProduct={product.idProduct} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  );
}
