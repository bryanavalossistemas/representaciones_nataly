import { Suspense } from "react";
import { fetchCustomersPages } from "@/data";
import Pagination from "./components/pagination";
import Table from "./components/table";
import Heading from "./components/heading";
import Toolbar from "./components/toolbar";
import TableSkeleton from "./components/table-skeleton";
import PaginationSkeleton from "./components/pagination-skeleton";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="flex flex-col gap-y-1 md:gap-y-2 p-1 sm:p-2">
      <Heading />
      <Toolbar />
      <div className="flex flex-col gap-y-2">
        <Suspense fallback={<TableSkeleton />}>
          <Table currentPage={currentPage} query={query} />
        </Suspense>
        <Suspense fallback={<PaginationSkeleton />}>
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
    </div>
  );
}
