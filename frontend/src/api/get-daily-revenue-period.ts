import { api } from "@/lib/axios";

export interface GetDailyRevenuePeriodQuery {
  from: Date | undefined;
  to: Date | undefined;
}

export type GetDailyRevenuePeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenuePeriod({
  from,
  to,
}: GetDailyRevenuePeriodQuery) {
  const response = await api.get<GetDailyRevenuePeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from,
        to,
      },
    }
  );
  return response.data;
}
