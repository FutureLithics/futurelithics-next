import { test, expect } from "@playwright/test";

const NEW_SERVICE_PAGES = [
  {
    path: "/product-engineering",
    title: "Product Engineering",
  },
  {
    path: "/legacy-app-modernization",
    title: "Legacy App Modernization",
  },
  {
    path: "/ai-workflow-automation",
    title: "AI & Workflow Automation",
  },
  {
    path: "/software-architecture",
    title: "Software Architecture",
  },
  {
    path: "/business-systems",
    title: "Business Systems",
  },
  {
    path: "/technical-strategy",
    title: "Technical Strategy",
  },
] as const;

test.describe("New service landing pages", () => {
  for (const service of NEW_SERVICE_PAGES) {
    test(`loads ${service.path}`, async ({ page }) => {
      const response = await page.goto(service.path);

      expect(response?.status()).toBe(200);
      await expect(
        page.getByRole("heading", { name: service.title, level: 2 }),
      ).toBeVisible();
    });
  }

  test("returns not found for unknown top-level slugs", async ({ page }) => {
    const response = await page.goto("/not-a-real-service");

    expect(response?.status()).toBe(404);
  });
});
