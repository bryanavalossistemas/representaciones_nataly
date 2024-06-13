import { fetchPurchasesPages } from "@/data";
import Pagination from "./pagination";

type FetchPaginationProps = {
  query: string;
  dateFrom: Date;
  dateTo: Date;
};
export default async function FetchPagination({
  query,
  dateFrom,
  dateTo,
}: FetchPaginationProps) {
  const totalPages = await fetchPurchasesPages(query, dateFrom, dateTo);

  return <Pagination totalPages={totalPages} />;
}
