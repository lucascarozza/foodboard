import { http, HttpResponse } from "msw";
import { RegisterRestaurantBody } from "../register-restaurant";

export const registerRestaurantHandler = http.post<
  never,
  RegisterRestaurantBody
>("/restaurants", async ({ request }) => {
  const { restaurantName } = await request.json();

  if (restaurantName === "Restaurante Teste") {
    return new HttpResponse(null, { status: 201 });
  }

  return new HttpResponse(null, { status: 400 });
});
