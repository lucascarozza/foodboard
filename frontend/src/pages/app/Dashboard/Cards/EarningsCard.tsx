// External libraries
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

// Internal utilities
import { getMonthlyRevenue } from "@/api/get-monthly-revenue";

// Internal components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function EarningsCard() {
  const { data: monthlyRevenue } = useQuery({
    queryKey: ["metrics", "month-receipt"],
    queryFn: getMonthlyRevenue,
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>Receita Total no mês</CardTitle>
        <DollarSign size={20} className="text-muted-foreground" />
      </CardHeader>

      <CardContent className="flex flex-col gap-1">
        {monthlyRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthlyRevenue.receipt / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthlyRevenue.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthlyRevenue.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês anterior
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthlyRevenue.diffFromLastMonth}%
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
