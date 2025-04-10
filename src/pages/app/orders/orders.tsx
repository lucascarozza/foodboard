import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Eye, X } from "lucide-react";

export function Orders() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Seus Pedidos</h1>
      </div>

      <div className="space-y-4 my-4">
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filtros:</span>
          <Input
            placeholder="Nome do cliente"
            className="cursor-text h-8 w-80"
          />
        </form>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead className="w-36">Identificador</TableHead>
                <TableHead className="w-44">Data</TableHead>
                <TableHead className="w-36">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-36">Total</TableHead>
                <TableHead className="w-32"></TableHead>
                <TableHead className="w-32"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Eye size={32} />
                    <span className="sr-only">Detalhes do pedido</span>
                  </Button>
                </TableCell>
                <TableCell className="font-mono text-xm font-medium">
                  m7q9xk2l5d8y3w4n
                </TableCell>
                <TableCell className="text-muted-foreground">
                  Há 15 minutos
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-300" />
                    <span className="font-medium text-muted-foreground">
                      Pendente
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  Lucas Carozza dos Santos
                </TableCell>
                <TableCell className="font-medium">R$ 200,00</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
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
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
