import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from "../get-popular-products";

export const getPopularProductsHandler = http.get<
  never,
  never,
  GetPopularProductsResponse
>("/metrics/popular-products", () => {
  return HttpResponse.json([
    { product: "Pizza", amount: 27 },
    { product: "Torta", amount: 12 },
    { product: "Cupcake", amount: 27 },
    { product: "Pão de Queijo", amount: 25 },
    { product: "Coxinha", amount: 32 },
  ]);
});
