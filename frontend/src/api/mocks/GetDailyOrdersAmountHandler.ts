import { http, HttpResponse } from "msw";
import { GetDailyOrdersAmountResponse } from "../get-daily-orders-amount";

export const getDailyOrdersAmountHandler = http.get<
  never,
  never,
  GetDailyOrdersAmountResponse
>("/metrics/day-orders-amount", () => {
  return HttpResponse.json({
    amount: 12,
    diffFromYesterday: 20,
  });
});
