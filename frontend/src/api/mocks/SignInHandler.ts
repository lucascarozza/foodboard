import { http, HttpResponse } from "msw";
import { SignInBody } from "../sign-in";

export const signInHandler = http.post<never, SignInBody>(
  "/authenticate",
  async ({ request }) => {
    const { email } = await request.json();

    if (email === "contact@lucascarozza.com") {
      return new HttpResponse(null, {
        status: 200,
        headers: {
          "Set-Cookie": "auth-sample.jwt",
        },
      });
    }

    return new HttpResponse(null, { status: 401 });
  }
);
