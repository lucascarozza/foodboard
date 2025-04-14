// External libraries
import { Search, X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

// Internal components
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useSearchParams } from "react-router-dom";

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFilterSchema = z.infer<typeof orderFilterSchema>;

export function OrdersTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId") ?? "";
  const customerName = searchParams.get("customerName") ?? "";
  const status = searchParams.get("status") ?? "all";

  const { register, handleSubmit, control, reset } = useForm<OrderFilterSchema>(
    {
      resolver: zodResolver(orderFilterSchema),
      defaultValues: {
        orderId,
        customerName,
        status,
      },
    }
  );

  function handleFilter({ orderId, customerName, status }: OrderFilterSchema) {
    setSearchParams((prev) => {
      if (orderId) {
        prev.set("orderId", orderId);
      } else {
        prev.delete("orderId");
      }
      if (customerName) {
        prev.set("customerName", customerName);
      } else {
        prev.delete("customerName");
      }
      if (status) {
        prev.set("status", status);
      } else {
        prev.delete("status");
      }
      prev.set("page", "1");
      return prev;
    });
  }

  function handleClearFilters() {
    setSearchParams((prev) => {
      prev.delete("orderId");
      prev.delete("customerName");
      prev.delete("status");
      prev.set("page", "1");
      return prev;
    });

    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID do Pedido"
        className="h-8 w-auto cursor-text"
        {...register("orderId")}
      />

      <Input
        placeholder="Nome do cliente"
        className="h-8 w-80 cursor-text"
        {...register("customerName")}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-44 cursor-pointer">
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
          );
        }}
      />

      <Button type="submit" variant="secondary" className="cursor-pointer">
        <Search />
        Filtrar pedidos
      </Button>
      <Button
        type="button"
        variant="ghost"
        onClick={handleClearFilters}
        className="cursor-pointer"
      >
        <X />
        Limpar filtros
      </Button>
    </form>
  );
}
