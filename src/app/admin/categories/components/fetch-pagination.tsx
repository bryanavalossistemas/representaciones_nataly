import Pagination from "./pagination";
import { fetchCategoriesPages } from "@/data";

type FetchPaginationProps = {
  query: string;
};
export default async function FetchPagination({ query }: FetchPaginationProps) {
  const totalPages = await fetchCategoriesPages(query);

  return <Pagination totalPages={totalPages} />;
}
