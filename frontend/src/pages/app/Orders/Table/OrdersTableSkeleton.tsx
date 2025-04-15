import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { TableRow, TableCell } from "@/components/ui/Table";
import { Eye } from "lucide-react";

export function OrdersTableSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => {
    return (
      <TableRow key={index}>
        <TableCell>
          <Button disabled variant="outline" size="icon">
            <Eye size={32} />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[185px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-36" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-28" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-50" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
      </TableRow>
    );
  });
}
