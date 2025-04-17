import { http, HttpResponse } from "msw";
import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from "../get-order-details";

export const getOrdersDetailsHandler = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "Cliente",
      email: "client@example.com",
      phone: null,
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    totalInCents: 2000,
    orderItems: [
      {
        id: "order-id-1",
        priceInCents: 750,
        product: {
          name: "Coxinha",
        },
        quantity: 1,
      },
      {
        id: "order-id-2",
        priceInCents: 1250,
        product: {
          name: "Milkshake",
        },
        quantity: 1,
      },
    ],
  });
});
