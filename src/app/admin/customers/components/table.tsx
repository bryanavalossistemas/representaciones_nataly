import RemoveButton from "./remove-button";
import EditButton from "./edit-button";
import EditButtonMobile from "./edit-button-mobile";
import { fetchFilteredCustomers } from "@/data";
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
};

export default async function Table({ query, currentPage }: TableProps) {
  const customers = await fetchFilteredCustomers(query, currentPage);

  return (
    <TableWrapper>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead className="text-center">RUC</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.idCustomer}>
            <TableCell className="font-medium capitalize">
              {customer.name}
            </TableCell>
            <TableCell className="font-medium capitalize">
              {customer.address}
            </TableCell>
            <TableCell className="font-medium capitalize">
              {customer.phone}
            </TableCell>
            <TableCell className="capitalize text-center font-bold">
              {customer.ruc}
            </TableCell>
            <TableCell>
              <div className="flex gap-x-1 justify-end">
                <div className="hidden sm:block">
                  <EditButton customer={customer} />
                </div>
                <div className="sm:hidden">
                  <EditButtonMobile customer={customer} />
                </div>
                <RemoveButton idCustomer={customer.idCustomer} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  );
}
