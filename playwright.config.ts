import { defineConfig, devices } from "@playwright/test";

// Use a dedicated port so e2e does not collide with other local Next.js apps
// (e.g. QuietMetric) that often occupy :3000 or :3001.
const PORT = process.env.PORT ?? "3099";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  globalSetup: "./e2e/global-setup.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `NEXT_E2E=1 npm run build && NEXT_E2E=1 npm run start -- -p ${PORT}`,
        url: `${baseURL}/`,
        reuseExistingServer: process.env.PLAYWRIGHT_REUSE_SERVER === "1",
        timeout: 180_000,
      },
});
