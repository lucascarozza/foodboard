import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Utensils } from "lucide-react";

export function OrdersStatsCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>Total de Pedidos (mês)</CardTitle>
        <Utensils size={20} className="text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-2xl font-bold tracking-tight">294</span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+8%</span>{" "}
          em relação a (mês anterior)
        </p>
      </CardContent>
    </Card>
  );
}
