import { test, expect } from "@playwright/test";

test("user can successfully sign up", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do restaurante" })
    .fill("Restaurante Teste");

  await page
    .getByRole("textbox", { name: "Nome do responsável" })
    .fill("Rafael");

  await page.getByRole("textbox", { name: "E-mail" }).fill("example@email.com");

  await page.getByRole("textbox", { name: "Telefone" }).fill("11970935837");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Conta criada com sucesso!");

  expect(toast).toBeVisible();
});

test("displays error for invalid sign-up credentials", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do restaurante" })
    .fill("Restaurante Inválido");

  await page
    .getByRole("textbox", { name: "Nome do responsável" })
    .fill("Rafael");

  await page.getByRole("textbox", { name: "E-mail" }).fill("example@email.com");

  await page.getByRole("textbox", { name: "Telefone" }).fill("11970935837");
  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Não foi possível criar sua conta.");

  expect(toast).toBeVisible();
});

test("user can navigate to sign-in page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Fazer Log In" }).click();

  expect(page.url()).toContain("/sign-in");
});
