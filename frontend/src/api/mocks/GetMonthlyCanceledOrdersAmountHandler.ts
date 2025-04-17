import { http, HttpResponse } from "msw";
import { GetMonthlyCanceledOrdersAmountResponse } from "../get-monthly-canceled-orders-amount";

export const getMonthlyCanceledOrdersAmountHandler = http.get<
  never,
  never,
  GetMonthlyCanceledOrdersAmountResponse
>("/metrics/month-canceled-orders-amount", () => {
  return HttpResponse.json({
    amount: 3,
    diffFromLastMonth: -50,
  });
});
