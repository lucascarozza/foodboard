import { CanceledOrdersCard } from "./components/Cards/CanceledOrdersCard";
import { DailyOrdersCard } from "./components/Cards/DailyOrdersCard";
import { EarningsCard } from "./components/Cards/EarningsCard";
import { OrdersStatsCard } from "./components/Cards/OrdersStatsCard";
import { PopularChart } from "./components/Charts/PopularChart";
import { RevenueChart } from "./components/Charts/RevenueChart";

export function Dashboard() {
  // throw new Error("Erro teste");
    
  return (
    <div>
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <EarningsCard />
          <OrdersStatsCard />
          <DailyOrdersCard />
          <CanceledOrdersCard />  
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularChart />
        </div>
      </div>
    </div>
  );
}
