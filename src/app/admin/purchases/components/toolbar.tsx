import Search from "./search";
import AddButton from "./add-button";
import Range from "./range";
import { Product } from "@prisma/client";

type ToolbarProps = {
  products: Product[];
};

export default async function Toolbar({ products }: ToolbarProps) {
  return (
    <div className="flex flex-col-reverse gap-y-1 sm:flex-row sm:justify-between sm:gap-y-0 sm:gap-x-1">
      <div className="flex-1 flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-x-2">
          <div className="flex-1">
            <Search />
          </div>
          <AddButton products={products} />
        </div>
        <div className="flex self-center w-full justify-center">
          <Range />
        </div>
      </div>
    </div>
  );
}
