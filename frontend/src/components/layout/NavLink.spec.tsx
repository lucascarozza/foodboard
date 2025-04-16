import { render } from "@testing-library/react";
import { NavLink } from "./NavLink";
import { MemoryRouter } from "react-router-dom";

describe("NavLink", () => {
  it("should highlight the nav link for the current page", () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/", "/orders"]}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/orders">Pedidos</NavLink>
      </MemoryRouter>
    );

    expect(wrapper.getByText("Pedidos").dataset.current).toEqual("true");
    expect(wrapper.getByText("Home").dataset.current).toEqual("false");
  });
});
