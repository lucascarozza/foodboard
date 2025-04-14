// External libraries
import { useState } from "react";
import { ArrowRight, Eye, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Internal components
import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import { OrderDetails } from "./OrdersDetails";
import { OrderStatus } from "@/components/OrderStatus";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <Eye size={32} />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails isOpen={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xm font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>

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
