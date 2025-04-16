import { Skeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
  TableFooter,
} from "@/components/ui/Table";

export function OrdersDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell>
              <Skeleton className="h-5 w-28 ml-auto" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Cliente</TableCell>
            <TableCell>
              <Skeleton className="h-5 w-40 ml-auto" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Telefone</TableCell>
            <TableCell>
              <Skeleton className="h-5 w-36 ml-auto" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">E-mail</TableCell>
            <TableCell>
              <Skeleton className="h-5 w-50 ml-auto" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Realizado</TableCell>
            <TableCell>
              <Skeleton className="h-5 w-12 ml-auto" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead className="text-right">Qtd.</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 2 }).map((_, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-5 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-6 ml-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-12 ml-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-12 ml-auto" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total do pedido</TableCell>
            <TableCell colSpan={2}>
              <Skeleton className="h-5 w-20 ml-auto" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
