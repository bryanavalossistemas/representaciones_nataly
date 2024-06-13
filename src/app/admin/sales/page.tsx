import SalesCart from "./components/sales-cart";
import ProductsGrid from "./components/products-grid";
import { Card } from "@/components/ui/card";
import { fetchCustomers } from "@/data";
import Search from "./components/search";

type SalesPageProps = {
  searchParams?: {
    query?: string;
  };
};

export default async function SalesPage({ searchParams }: SalesPageProps) {
  const query = searchParams?.query || "";
  const customers = await fetchCustomers();

  return (
    <div className="flex flex-col gap-y-1 sm:gap-y-2 py-1 pl-1 sm:p-2">
      <div className="flex sm:gap-x-2 sm:h-[92vh]">
        <Card className="basis-4/4 pr-1 p-1 sm:p-2 rounded-md sm:basis-3/4 overflow-y-auto flex flex-col gap-y-1 sm:gap-y-2">
          <Search />
          <ProductsGrid query={query} />
        </Card>
        <div className="sm:basis-1/4 overflow-hidden">
          <SalesCart customers={customers} />
        </div>
      </div>
    </div>
  );
}
