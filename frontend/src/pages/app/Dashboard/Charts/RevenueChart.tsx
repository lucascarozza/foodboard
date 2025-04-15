// External libraries
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";

// Internal utilities
import { getDailyRevenuePeriod } from "@/api/get-daily-revenue-period";

// Internal components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { Loader2 } from "lucide-react";

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenuePeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period", dateRange],
    queryFn: () =>
      getDailyRevenuePeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  });

  const chartData = useMemo(() => {
    return dailyRevenuePeriod?.map((item) => {
      return {
        date: item.date,
        receipt: item.receipt / 100,
      };
    });
  }, [dailyRevenuePeriod]);

  return (
    <Card className="col-span-6">
      <CardHeader className="flex items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>
            Acompanhe sua receita diária dentro do intervalo escolhido.
          </CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período:</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={chartData}
              style={{ fontSize: 12 }}
              aria-label="Gráfico de linha mostrando a receita diária no período selecionado"
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

              <Line type="linear" stroke="red" dataKey="receipt" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-60 w-full items-center justify-center">
            <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
