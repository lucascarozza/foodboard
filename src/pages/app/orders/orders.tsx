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

export function Orders() {
  return (
    <div>
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Seus Pedidos</h1>
      </div>

      <div className="space-y-4">
        <OrdersTableFilter />

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead className="w-36">ID</TableHead>
                <TableHead className="w-44">Data</TableHead>
                <TableHead className="w-36">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-36">Total</TableHead>
                <TableHead className="w-32"></TableHead>
                <TableHead className="w-32"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

              {Array.from({ length: 10 }, (_, index) => {
                return <OrderTableRow key={index} />;
              })}

            </TableBody>
          </Table>
        </div>
        <Pagination pageIndex={0} totalCount={50  } perPage={10}/>
      </div>
    </div>
  );
}
