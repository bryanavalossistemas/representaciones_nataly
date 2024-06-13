import Table from "./components/table";
import Heading from "./components/heading";
import Toolbar from "./components/toolbar";
import FetchPagination from "./components/fetch-pagination";
import TableSkeleton from "./components/table-skeleton";
import PaginationSkeleton from "./components/pagination-skeleton";
import { Suspense } from "react";

type CategoriesPageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="flex flex-col gap-y-1 sm:gap-y-2 p-1 sm:p-2">
      <Heading />
      <Toolbar />
      <div className="flex flex-col gap-y-2">
        <Suspense fallback={<TableSkeleton />}>
          <Table currentPage={currentPage} query={query} />
        </Suspense>
        <Suspense fallback={<PaginationSkeleton />}>
          <FetchPagination query={query} />
        </Suspense>
      </div>
    </div>
  );
}
