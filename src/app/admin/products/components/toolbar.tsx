import Search from "./search";
import AddButton from "./add-button";
import AddButtonMobile from "./add-button-mobile";
import { CategoryType } from "@/types";

type ToolbarProps = {
  categories: CategoryType[];
};

export default async function Toolbar({ categories }: ToolbarProps) {
  return (
    <div className="flex flex-col-reverse gap-y-1 sm:flex-row sm:justify-between sm:gap-y-0 sm:gap-x-1">
      <div className="flex-1">
        <Search />
      </div>
      <div className="hidden sm:block">
        <AddButton categories={categories} />
      </div>
      <div className="sm:hidden">
        <AddButtonMobile categories={categories} />
      </div>
    </div>
  );
}
