import { test, expect } from "@playwright/test";

const chartPages = [
  { path: "/charts/bar", label: "Bar Charts" },
  { path: "/charts/line", label: "Line Chart" },
  { path: "/charts/pie", label: "Pie Chart" },
  { path: "/charts/myco-network", label: "MycoNetwork Chart" },
];

test.describe("Chart demo pages", () => {
  for (const chart of chartPages) {
    test(`loads ${chart.label}`, async ({ page }) => {
      await page.goto(chart.path);

      await expect(page.getByRole("button", { name: "Go Back" })).toBeVisible();
      await expect(page.locator("svg").first()).toBeVisible();
    });
  }
});
