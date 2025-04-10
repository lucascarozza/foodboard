import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrdersTableFilter() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="ID do Pedido" className="cursor-text- h-8 w-auto" />
      <Input placeholder="Nome do cliente" className="cursor-text h-8 w-80" />
      <Select defaultValue="all">
        <SelectTrigger className="h8 w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os pedidos</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">Em entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" className="cursor-pointer">
        <Search />
        Filtrar pedidos
      </Button>
      <Button type="button" variant="ghost" className="cursor-pointer">
        <X />
        Limpar filtros
      </Button>
    </form>
  );
}
