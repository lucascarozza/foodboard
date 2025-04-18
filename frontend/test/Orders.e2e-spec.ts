import { test, expect } from "@playwright/test";

test("displays orders list correctly", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  expect(
    page.getByRole("cell", { name: "customer-1", exact: true })
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "customer-10", exact: true })
  ).toBeVisible();
});

test("navigates between order pages correctly", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Próxima página" }).click();

  expect(
    page.getByRole("cell", { name: "customer-11", exact: true })
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "customer-20", exact: true })
  ).toBeVisible();

  await page.getByRole("button", { name: "Página anterior" }).click();

  expect(
    page.getByRole("cell", { name: "customer-1", exact: true })
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "customer-10", exact: true })
  ).toBeVisible();

  await page.getByRole("button", { name: "Última página" }).click();

  expect(
    page.getByRole("cell", { name: "customer-51", exact: true })
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "customer-60", exact: true })
  ).toBeVisible();

  await page.getByRole("button", { name: "Primeira página" }).click();

  expect(
    page.getByRole("cell", { name: "customer-1", exact: true })
  ).toBeVisible();

  expect(
    page.getByRole("cell", { name: "customer-10", exact: true })
  ).toBeVisible();
});

test("filters orders by id correctly", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("textbox", { name: "ID do Pedido" }).fill("order-23");

  await page.getByRole("button", { name: "Filtrar pedidos" }).click();

  expect(
    page.getByRole("cell", { name: "order-23", exact: true })
  ).toBeVisible();
});

test("filters orders by customer correctly", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do cliente" })
    .fill("customer-32");

  await page.getByRole("button", { name: "Filtrar pedidos" }).click();

  expect(
    page.getByRole("cell", { name: "customer-32", exact: true })
  ).toBeVisible();
});
