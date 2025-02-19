// tests/home.spec.ts
import { test, expect } from "@playwright/test";

test("Главная страница отображает список событий", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Upcoming Events");
  await expect(page.locator("a", { hasText: "Login" })).toBeVisible();
});
