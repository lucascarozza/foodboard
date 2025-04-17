import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../get-profile";

export const getProfileHandler = http.get<never, never, GetProfileResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "custom-user-id",
      name: "Gerente",
      email: "manager@example.com",
      phone: null,
      role: "manager",
      createdAt: new Date(),
      updatedAt: null,
    });
  }
);
