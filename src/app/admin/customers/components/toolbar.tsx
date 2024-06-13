import Search from "./search";
import AddButton from "./add-button";
import AddButtonMobile from "./add-button-mobile";

export default function Toolbar() {
  return (
    <div className="flex flex-col-reverse gap-y-1 sm:flex-row sm:justify-between sm:gap-y-0 sm:gap-x-1">
      <div className="flex-1">
        <Search />
      </div>
      <div className="hidden sm:block">
        <AddButton />
      </div>
      <div className="sm:hidden">
        <AddButtonMobile />
      </div>
    </div>
  );
}
