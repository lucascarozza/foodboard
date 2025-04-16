import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

const onPageChangeCallback = vi.fn();

describe("Pagination", () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  const renderPagination = (props = {}) =>
    render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
        {...props}
      />
    );

  it("should display the correct number of pages and results", () => {
    const wrapper = renderPagination();

    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 itens")).toBeInTheDocument();
  });

  it("should navigate to the next page", async () => {
    const user = userEvent.setup();
    const wrapper = renderPagination({ onPageChange: onPageChangeCallback });

    const nextPageButton = wrapper.getByRole("button", {
      name: "Próxima página",
    });
    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalled();
  });

  it("should navigate to the previous page", async () => {
    const user = userEvent.setup();
    const wrapper = renderPagination({
      pageIndex: 5,
      onPageChange: onPageChangeCallback,
    });

    const previousPageButton = wrapper.getByRole("button", {
      name: "Página anterior",
    });
    await user.click(previousPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  it("should navigate to the first page", async () => {
    const user = userEvent.setup();
    const wrapper = renderPagination({
      pageIndex: 5,
      onPageChange: onPageChangeCallback,
    });

    const firstPageButton = wrapper.getByRole("button", {
      name: "Primeira página",
    });
    await user.click(firstPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  it("should navigate to the last page", async () => {
    const user = userEvent.setup();
    const wrapper = renderPagination({
      pageIndex: 0,
      onPageChange: onPageChangeCallback,
    });

    const lastPageButton = wrapper.getByRole("button", {
      name: "Última página",
    });
    await user.click(lastPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });
});
