// External libraries
import { useState } from "react";
import { ArrowRight, Eye, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ptBR } from "date-fns/locale";
import { cancelOrder } from "@/api/cancel-order";

// Internal utilities
import { GetOrdersResponse } from "@/api/get-orders";
import { OrderStatus } from "@/components/OrderStatus";

// Internal components
import { Button } from "@/components/ui/Button";
import { TableCell, TableRow } from "@/components/ui/Table";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import { OrderDetails } from "./OrdersDetails";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";

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
  const queryClient = useQueryClient();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  function updateCachedOrderStatus(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status };
          }
          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateCachedOrderStatus(orderId, "canceled");
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateCachedOrderStatus(orderId, "processing");
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateCachedOrderStatus(orderId, "delivering");
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateCachedOrderStatus(orderId, "delivered");
      },
    });

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
        {(() => {
          switch (order.status) {
            case "pending":
              return (
                <Button
                  onClick={() => approveOrderFn({ orderId: order.orderId })}
                  disabled={isApprovingOrder}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  <ArrowRight />
                  <span className="cursor-pointer">Aprovar</span>
                </Button>
              );

            case "processing":
              return (
                <Button
                  onClick={() => dispatchOrderFn({ orderId: order.orderId })}
                  disabled={isDispatchingOrder}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  <ArrowRight />
                  <span className="cursor-pointer">Em entrega</span>
                </Button>
              );

            case "delivering":
              return (
                <Button
                  onClick={() => deliverOrderFn({ orderId: order.orderId })}
                  disabled={isDeliveringOrder}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  <ArrowRight />
                  <span className="cursor-pointer">Entregue</span>
                </Button>
              );

            default:
              return null;
          }
        })()}
      </TableCell>

      <TableCell>
        {["pending", "processing"].includes(order.status) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
            disabled={
              !["pending", "processing"].includes(order.status) ||
              isCancelingOrder
            }
            className="cursor-pointer"
          >
            <X />
            <span className="cursor-pointer">Cancelar</span>
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
