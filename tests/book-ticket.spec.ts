// tests/book-ticket.spec.ts
import { test, expect } from "@playwright/test";

test("Пользователь может забронировать билет", async ({ page }) => {
  await page.goto("/events/1");
  await page.fill('input[name="quantity"]', "1");
  await page.click('button', { hasText: "Book Ticket" });
  await expect(page.locator("text=Ticket successfully booked")).toBeVisible();
});
