import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="w-14 h-6" />
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="w-full">
            <Skeleton className="w-full h-9" />
          </TableCell>
          <TableCell>
            <div className="flex gap-x-1 justify-end">
              <div className="hidden sm:block">
                <Skeleton className="w-[95.27px] h-9" />
              </div>
              <div className="sm:hidden">
                <Skeleton className="w-9 h-9" />
              </div>
              <Skeleton className="w-9 sm:w-[109.67px] h-9" />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-full">
            <Skeleton className="w-full h-9" />
          </TableCell>
          <TableCell>
            <div className="flex gap-x-1 justify-end">
              <div className="hidden sm:block">
                <Skeleton className="w-[95.27px] h-9" />
              </div>
              <div className="sm:hidden">
                <Skeleton className="w-9 h-9" />
              </div>
              <Skeleton className="w-9 sm:w-[109.67px] h-9" />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-full">
            <Skeleton className="w-full h-9" />
          </TableCell>
          <TableCell>
            <div className="flex gap-x-1 justify-end">
              <div className="hidden sm:block">
                <Skeleton className="w-[95.27px] h-9" />
              </div>
              <div className="sm:hidden">
                <Skeleton className="w-9 h-9" />
              </div>
              <Skeleton className="w-9 sm:w-[109.67px] h-9" />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-full">
            <Skeleton className="w-full h-9" />
          </TableCell>
          <TableCell>
            <div className="flex gap-x-1 justify-end">
              <div className="hidden sm:block">
                <Skeleton className="w-[95.27px] h-9" />
              </div>
              <div className="sm:hidden">
                <Skeleton className="w-9 h-9" />
              </div>
              <Skeleton className="w-9 sm:w-[109.67px] h-9" />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-full">
            <Skeleton className="w-full h-9" />
          </TableCell>
          <TableCell>
            <div className="flex gap-x-1 justify-end">
              <div className="hidden sm:block">
                <Skeleton className="w-[95.27px] h-9" />
              </div>
              <div className="sm:hidden">
                <Skeleton className="w-9 h-9" />
              </div>
              <Skeleton className="w-9 sm:w-[109.67px] h-9" />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-full">
            <Skeleton className="w-full h-9" />
          </TableCell>
          <TableCell>
            <div className="flex gap-x-1 justify-end">
              <div className="hidden sm:block">
                <Skeleton className="w-[95.27px] h-9" />
              </div>
              <div className="sm:hidden">
                <Skeleton className="w-9 h-9" />
              </div>
              <Skeleton className="w-9 sm:w-[109.67px] h-9" />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-full">
            <Skeleton className="w-full h-9" />
          </TableCell>
          <TableCell>
            <div className="flex gap-x-1 justify-end">
              <div className="hidden sm:block">
                <Skeleton className="w-[95.27px] h-9" />
              </div>
              <div className="sm:hidden">
                <Skeleton className="w-9 h-9" />
              </div>
              <Skeleton className="w-9 sm:w-[109.67px] h-9" />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
