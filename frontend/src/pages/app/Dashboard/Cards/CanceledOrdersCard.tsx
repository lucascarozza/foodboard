// External libraries
import { useQuery } from "@tanstack/react-query";
import { Ban } from "lucide-react";

// Internal utilities
import { getMonthlyCanceledOrdersAmount } from "@/api/get-monthly-canceled-orders-amount";

// Internal components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function CanceledOrdersCard() {
  const { data: monthlyCanceledOrdersAmount } = useQuery({
    queryKey: ["metrics", "month-canceled-orders-amount"],
    queryFn: getMonthlyCanceledOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>Total de Pedidos Cancelados no mês</CardTitle>
        <Ban size={20} className="text-muted-foreground" />
      </CardHeader>

      <CardContent className="flex flex-col gap-1">
        {monthlyCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthlyCanceledOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthlyCanceledOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{monthlyCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthlyCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês anterior
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}