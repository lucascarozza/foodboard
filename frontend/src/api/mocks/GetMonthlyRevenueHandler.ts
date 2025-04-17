import { http, HttpResponse } from "msw";
import { GetMonthlyRevenueResponse } from "../get-monthly-revenue";

export const getMonthlyRevenueHandler = http.get<
  never,
  never,
  GetMonthlyRevenueResponse
>("/metrics/month-receipt", () => {
  return HttpResponse.json({
    receipt: 186420,
    diffFromLastMonth: 24,
  });
});
