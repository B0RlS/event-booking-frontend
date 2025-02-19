// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3001",
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:3001",
    browserName: "chromium",
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: "on",
  },
});
