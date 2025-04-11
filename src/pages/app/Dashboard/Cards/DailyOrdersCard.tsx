import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Utensils } from "lucide-react";

export function DailyOrdersCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>Pedidos de hoje</CardTitle>
        <Utensils size={20} className="text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-2xl font-bold tracking-tight">6</span>
        <p className="text-sm text-muted-foreground">
          <span className="text-rose-500 dark:text-rose-400">-4%</span>{" "}
          em relação a ontem
        </p>
      </CardContent>
    </Card>
  );
}
