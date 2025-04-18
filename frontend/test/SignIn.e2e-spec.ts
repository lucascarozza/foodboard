import { test, expect } from "@playwright/test";

test("user can successfully sign in", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("contact@lucascarozza.com");

  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText("Enviamos um link de login para o seu e-mail.");

  expect(toast).toBeVisible();
});

test("displays error for invalid sign-in credentials", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("example@example.com");

  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText("Erro ao enviar o link de login.");

  expect(toast).toBeVisible();
});

test("user can navigate to sign-up page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Novo restaurante" }).click();

  expect(page.url()).toContain("/sign-up");
});
