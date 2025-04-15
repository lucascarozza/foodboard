// External libraries
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

// Internal utilities
import { getOrders } from "@/api/get-orders";

// UI components
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { OrdersTableFilter } from "./Table/OrdersTableFilter";
import { Pagination } from "@/components/Pagination";
import { OrderTableRow } from "./Table/OrdersTableRow";
import { OrdersTableSkeleton } from "./Table/OrdersTableSkeleton";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId") ?? "";
  const customerName = searchParams.get("customerName") ?? "";
  const status = searchParams.get("status") ?? "all";

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: orderResults } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === "all" ? null : status,
      }),
  });

  function handlePageChange(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set("page", (pageIndex + 1).toString());
      return prev;
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Seus Pedidos</h1>
      </div>

      <div className="space-y-4">
        <OrdersTableFilter />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead className="w-36">ID</TableHead>
                <TableHead className="w-44">Realizado</TableHead>
                <TableHead className="w-36">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-36">Total</TableHead>
                <TableHead className="w-34"></TableHead>
                <TableHead className="w-34"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderResults ?
                orderResults.orders.map((order) => {
                  return <OrderTableRow key={order.orderId} order={order} />;
                }) : <OrdersTableSkeleton />}
            </TableBody>
          </Table>
        </div>

        {orderResults && (
          <Pagination
            onPageChange={handlePageChange}
            pageIndex={orderResults.meta.pageIndex}
            totalCount={orderResults.meta.totalCount}
            perPage={orderResults.meta.perPage}
          />
        )}
      </div>
    </div>
  );
}
