import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DollarSign } from "lucide-react";

export function EarningsCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle>Receita Total (mês)</CardTitle>
        <DollarSign size={20} className="text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-2xl font-bold tracking-tight">R$ 32.400,00</span>
        <p className="text-sm text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+17%</span>{" "}
          em relação a (mês anterior)
        </p>
      </CardContent>
    </Card>
  );
}
