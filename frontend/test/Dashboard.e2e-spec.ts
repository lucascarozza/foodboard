import { test, expect } from "@playwright/test";

test("displays monthly revenue correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("R$ 1.864,20")).toBeVisible();
  expect(page.getByText("+24% em relação ao mês")).toBeVisible();
});

test("displays monthly orders correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("200")).toBeVisible();
  expect(page.getByText("+23% em relação ao mês")).toBeVisible();
});

test("displays daily orders amount correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("12", { exact: true })).toBeVisible();
  expect(page.getByText("-50% em relação ao mês")).toBeVisible();
});

test("displays monthly canceled orders amount correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(page.getByText("3", { exact: true })).toBeVisible();
  expect(page.getByText("-50% em relação ao mês")).toBeVisible();
});

test("displays revenue graph correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(
    page.getByRole("img", { name: "Gráfico de linha mostrando a" })
  ).toBeVisible();
});

test("displays popular products graph correctly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  expect(
    page.getByRole("img", { name: "Gráfico de pizza mostrando os" })
  ).toBeVisible();
});
