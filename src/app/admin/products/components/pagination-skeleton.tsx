import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

export default function PaginationSkeleton() {
  return (
    <PaginationWrapper>
      <PaginationContent>
        <PaginationItem>
          <Skeleton className="w-[99.73px] h-9" />
        </PaginationItem>
        <div className="hidden sm:flex">
          <PaginationItem>
            <Skeleton className="w-[108px] h-9" />
          </PaginationItem>
        </div>
        <PaginationItem>
          <Skeleton className="w-[108.19px] h-9" />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
}
