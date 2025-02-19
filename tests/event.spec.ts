// tests/event.spec.ts
import { test, expect } from "@playwright/test";

test("Пользователь может просматривать событие", async ({ page }) => {
  await page.goto("/events/1");
  await expect(page.locator("h1")).toContainText("Event Details");
});
