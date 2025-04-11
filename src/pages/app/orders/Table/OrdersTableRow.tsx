import { ArrowRight, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import { OrderDetails } from "./OrdersDetails";

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <Eye size={32} />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xm font-medium">
        m7q9xk2l5d8y3w4n
      </TableCell>
      <TableCell className="text-muted-foreground">Há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Lucas Carozza dos Santos</TableCell>
      <TableCell className="font-medium">R$ 200,00</TableCell>
      <TableCell>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <ArrowRight />
          <span className="cursor-pointer">Aprovar</span>
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <X />
          <span className="cursor-pointer">Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}
