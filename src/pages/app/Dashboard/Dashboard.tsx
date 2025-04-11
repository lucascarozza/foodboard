import { CanceledOrdersCard } from "./Cards/CanceledOrdersCard";
import { DailyOrdersCard } from "./Cards/DailyOrdersCard";
import { EarningsCard } from "./Cards/EarningsCard";
import { OrdersStatsCard } from "./Cards/OrdersStatsCard";
import { PopularChart } from "./Charts/PopularChart";
import { RevenueChart } from "./Charts/RevenueChart";

export function Dashboard() {
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
