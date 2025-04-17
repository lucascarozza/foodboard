import { http, HttpResponse } from "msw";
import { GetMonthlyCanceledOrdersAmountResponse } from "../get-monthly-canceled-orders-amount";

export const getMonthlyOrdersAmountHandler = http.get<
  never,
  never,
  GetMonthlyCanceledOrdersAmountResponse
>("/metrics/month-orders-amount", () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 23,
  });
});
