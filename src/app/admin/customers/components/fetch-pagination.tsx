import { fetchCustomersPages } from "@/data";
import Pagination from "./pagination";

type FetchPaginationProps = {
  query: string;
};
export default async function FetchPagination({ query }: FetchPaginationProps) {
  const totalPages = await fetchCustomersPages(query);

  return <Pagination totalPages={totalPages} />;
}
