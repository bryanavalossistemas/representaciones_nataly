import DeleteButton from "./delete-button";
import UpdateButton from "./update-button";
import UpdateButtonMobile from "./update-button-mobile";
import { fetchFilteredCategories } from "@/data";
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
  const categories = await fetchFilteredCategories(query, currentPage);

  return (
    <TableWrapper>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead className="overflow-visible">
            <span className="sr-only">Acciones</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.idCategory}>
            <TableCell className="font-medium capitalize">
              {category.name}
            </TableCell>
            <TableCell>
              <div className="flex gap-x-1 justify-end">
                <div className="hidden sm:block">
                  <UpdateButton category={category} />
                </div>
                <div className="sm:hidden">
                  <UpdateButtonMobile category={category} />
                </div>
                <DeleteButton idCategory={category.idCategory} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableWrapper>
  );
}
