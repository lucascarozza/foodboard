import { http, HttpResponse } from "msw";
import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantHandler = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "custom-restaurant-id",
    name: "Restaurante Teste",
    description: "Descrição do restaurante teste",
    managerId: "custom-user-id",
    createdAt: new Date(),
    updatedAt: null,
  });
});
