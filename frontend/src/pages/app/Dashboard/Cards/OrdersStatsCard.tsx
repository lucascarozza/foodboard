// External libraries
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

// Internal utilities
import { getMonthlyOrdersAmount } from "@/api/get-monthly-orders-amount";

// Internal components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function OrdersStatsCard() {
  const { data: monthlyOrdersAmount } = useQuery({
    queryKey: ["metrics", "month-orders-amount"],
    queryFn: getMonthlyOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>Total de Pedidos no mês</CardTitle>
        <Utensils size={20} className="text-muted-foreground" />
      </CardHeader>
      
      <CardContent className="flex flex-col gap-1">
        {monthlyOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthlyOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthlyOrdersAmount.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthlyOrdersAmount.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthlyOrdersAmount.diffFromLastMonth}%
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
