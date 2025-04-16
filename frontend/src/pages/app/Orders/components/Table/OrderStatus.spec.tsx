import { render } from "@testing-library/react";
import { OrderStatus } from "./OrderStatus";

describe("OrderStatus", () => {
  it("should display the correct text based on the order status", () => {
    const wrapper = render(<OrderStatus status="pending" />);
    expect(wrapper.getByText("Pendente")).toBeInTheDocument();
  });
});