// External libraries
import { useQuery } from "@tanstack/react-query";
import { PieChartIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import colors from "tailwindcss/colors";

// Internal utilities
import { getPopularProducts } from "@/api/get-popular-products";

// Internal components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

export function PopularChart() {
  const { data: popularProducts } = useQuery({
    queryKey: ["metrics", "popular-products"],
    queryFn: getPopularProducts,
  });

  return (
    <Card className="col-span-3">
      <CardHeader className="flex items-center justify-between pb-8">
        <CardTitle className="text-base font-medium">Mais Vendidos</CardTitle>
        <PieChartIcon className="text-muted-foreground" />
      </CardHeader>
      
      <CardContent>
        {popularProducts && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart
              style={{ fontSize: 12 }}
              aria-label="Gráfico de pizza mostrando os produtos mais vendidos"
            >
              <Pie
                data={popularProducts}
                dataKey="amount"
                nameKey="product"
                cx="50%"
                cy="50%"
                outerRadius={95}
                innerRadius={65}
                strokeWidth={8}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 12 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {popularProducts[index].product.length > 15
                        ? popularProducts[index].product
                            .substring(0, 12)
                            .concat("...")
                        : popularProducts[index].product}{" "}
                      ({value})
                    </text>
                  );
                }}
              >
                {popularProducts.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-card hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}