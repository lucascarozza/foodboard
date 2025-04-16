import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SignIn } from "./SignIn";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

describe("SignIn", () => {
  const renderSignIn = (initialEntries: string[]) =>
    render(<SignIn />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </MemoryRouter>
      ),
    });

  it("should set default email input value if present on search params", () => {
    const wrapper = renderSignIn(["/sign-in?email=contact@lucascarozza.com"]);

    const emailInput = wrapper.getByLabelText("Seu e-mail") as HTMLInputElement;

    expect(emailInput.value).toEqual("contact@lucascarozza.com");
  });
});
