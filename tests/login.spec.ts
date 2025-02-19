// tests/login.spec.ts
import { test, expect } from "@playwright/test";

test("Пользователь может войти в систему", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "user@example.com");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');
  await expect(page.locator("text=Logout")).toBeVisible();
});
