import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Ban } from "lucide-react";

export function CanceledOrdersCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>Total de Pedidos Cancelados (mês)</CardTitle>
        <Ban size={20} className="text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-2xl font-bold tracking-tight">10</span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">-20%</span>{" "}
          em relação a (mês anterior)
        </p>
      </CardContent>
    </Card>
  );
}
