// tests/cancel-ticket.spec.ts
import { test, expect } from "@playwright/test";

test("Пользователь может отменить билет", async ({ page }) => {
  await page.goto("/my-tickets/1");
  await page.click('button', { hasText: "Cancel Ticket" });
  await expect(page.locator("text=Ticket successfully cancelled")).toBeVisible();
});
