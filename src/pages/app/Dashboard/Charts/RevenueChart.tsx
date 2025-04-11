import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";

const data = [
  { date: "2025-04-05", revenue: 1338 },
  { date: "2025-04-06", revenue: 1729 },
  { date: "2025-04-07", revenue: 1409 },
  { date: "2025-04-08", revenue: 1680 },
  { date: "2025-04-09", revenue: 1215 },
  { date: "2025-04-10", revenue: 1125 },
  { date: "2025-04-11", revenue: 1534 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita Semanal
          </CardTitle>
          <CardDescription>Receita Diária no Período de 7 dias</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={data}
            style={{ fontSize: 12 }}
            aria-label="Gráfico de linha mostrando a receita diária no período"
          >
            <CartesianGrid vertical={false} className="stroke-muted" />
            <XAxis
              dataKey="date"
              stroke="#888"
              tickLine={false}
              tickFormatter={(value: string) =>
                new Date(value).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })
              }
            />
            <YAxis
              stroke="#888"
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <Line type="linear" stroke="red" dataKey="revenue" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
