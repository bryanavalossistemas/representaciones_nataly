import { fetchFilteredPurchases } from "@/data";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";
import { formatCurrency, formatDateToLocal } from "@/lib/utils";
import { ProductType } from "@/types";
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
  dateFrom: Date;
  dateTo: Date;
  currentPage: number;
  products: ProductType[];
};

export default async function Table({
  currentPage,
  query,
  products,
  dateFrom,
  dateTo,
}: TableProps) {
  const purchases = await fetchFilteredPurchases(
    query,
    currentPage,
    dateFrom,
    dateTo
  );

  return (
    <TableWrapper>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className="text-right">Monto</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase) => (
          <TableRow key={purchase.idPurchase}>
            <TableCell className="font-medium capitalize">
              {purchase.idPurchase}
            </TableCell>
            <TableCell className="font-medium capitalize">
              {formatDateToLocal(purchase.createdAt)}
            </TableCell>
            <TableCell className="font-bold capitalize text-right">
              {formatCurrency(
                purchase.detailsPurchase.reduce(
                  (total, detailPurchase) =>
                    total + detailPurchase.cost * detailPurchase.quantity,
                  0
                )
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-x-1 justify-end">
                <UpdateButton products={products} purchase={purchase} />
                <DeleteButton idPurchase={purchase.idPurchase} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  );
}
