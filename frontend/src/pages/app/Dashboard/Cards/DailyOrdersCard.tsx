// External libraries
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

// Internal utilities
import { getDailyOrdersAmount } from "@/api/get-daily-orders-amount";

// Internal components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function DailyOrdersCard() {
  const { data: dailyOrdersAmount } = useQuery({
    queryKey: ["metrics", "day-orders-amount"],
    queryFn: getDailyOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>Pedidos de hoje</CardTitle>
        <Utensils size={20} className="text-muted-foreground" />
      </CardHeader>
      
      <CardContent className="flex flex-col gap-1">
        {dailyOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dailyOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-sm text-muted-foreground">
              {dailyOrdersAmount.diffFromYesterday >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{dailyOrdersAmount.diffFromYesterday}%
                  </span>{" "}
                  em relação a ontem
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    -{dailyOrdersAmount.diffFromYesterday}%
                  </span>{" "}
                  em relação a ontem
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
