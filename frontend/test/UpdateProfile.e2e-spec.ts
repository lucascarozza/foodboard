import { test, expect } from "@playwright/test";

test("user can successfully update their restaurant profile", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Restaurante Teste" }).click();

  await page.getByRole("menuitem", { name: "Perfil da Loja" }).click();
  await page
    .getByRole("textbox", { name: "Nome do Restaurante" })
    .fill("Restaurante Teste 2");

  await page
    .getByRole("textbox", { name: "Descrição" })
    .fill("Nova descrição do restaurante");

  await page.getByRole("button", { name: "Salvar" }).click();
  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Restaurante atualizado com sucesso!");

  expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();

  expect(page.getByRole("button", { name: "Restaurante Teste 2" })).toBeVisible();
});