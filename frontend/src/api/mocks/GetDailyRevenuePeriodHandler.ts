import { http, HttpResponse } from "msw";
import { GetDailyRevenuePeriodResponse } from "../get-daily-revenue-period";

export const getDailyRevenuePeriodHandler = http.get<
  never,
  never,
  GetDailyRevenuePeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { date: "06/04/2025", receipt: 1630 },
    { date: "07/04/2025", receipt: 1847 },
    { date: "08/04/2025", receipt: 1322 },
    { date: "09/04/2025", receipt: 1998 },
    { date: "10/04/2025", receipt: 1715 },
    { date: "11/04/2025", receipt: 1437 },
    { date: "12/04/2025", receipt: 1293 },
  ]);
});
