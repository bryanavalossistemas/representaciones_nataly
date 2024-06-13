import Table from "./components/table";
import Heading from "./components/heading";
import Toolbar from "./components/toolbar";
import FetchPagination from "./components/fetch-pagination";
import TableSkeleton from "./components/table-skeleton";
import PaginationSkeleton from "./components/pagination-skeleton";
import { Suspense } from "react";
import { fetchCategories } from "@/data";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const categories = await fetchCategories();

  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2 p-1 sm:p-2">
      <Heading />
      <Toolbar categories={categories} />
      <div className="flex flex-col gap-y-2">
        <Suspense fallback={<TableSkeleton />}>
          <Table
            currentPage={currentPage}
            query={query}
            categories={categories}
          />
        </Suspense>
        <Suspense fallback={<PaginationSkeleton />}>
          <FetchPagination query={query} />
        </Suspense>
      </div>
    </div>
  );
}
