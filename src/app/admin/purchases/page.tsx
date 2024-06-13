import Table from "./components/table";
import Heading from "./components/heading";
import Toolbar from "./components/toolbar";
import { Suspense } from "react";
import FetchPagination from "./components/fetch-pagination";
import TableSkeleton from "./components/table-skeleton";
import PaginationSkeleton from "./components/pagination-skeleton";
import { fetchProducts } from "@/data";
import { firstDay, lastDay } from "@/lib/utils";

type PurchasesPageProps = {
  searchParams?: {
    query?: string;
    dateStart?: string;
    dateEnd?: string;
    page?: string;
  };
};

export default async function PurchasesPage({
  searchParams,
}: PurchasesPageProps) {
  const query = searchParams?.query || "";
  let dateFrom: Date;
  if (searchParams?.dateStart) {
    dateFrom = new Date(searchParams?.dateStart);
  } else {
    dateFrom = firstDay();
  }
  let dateTo: Date;
  if (searchParams?.dateEnd) {
    dateTo = new Date(searchParams?.dateEnd);
  } else {
    dateTo = lastDay();
  }
  const currentPage = Number(searchParams?.page) || 1;
  const products = await fetchProducts();

  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2 p-1 sm:p-2">
      <Heading />
      <Toolbar products={products} />
      <div className="flex flex-col gap-y-2">
        <Suspense fallback={<TableSkeleton />}>
          <Table
            currentPage={currentPage}
            query={query}
            dateFrom={dateFrom}
            dateTo={dateTo}
            products={products}
          />
        </Suspense>
        <Suspense fallback={<PaginationSkeleton />}>
          <FetchPagination dateFrom={dateFrom} dateTo={dateTo} query={query} />
        </Suspense>
      </div>
    </div>
  );
}
