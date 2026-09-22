import { test, expect } from "@playwright/test";

const ORIGINAL_SERVICE_PAGES = [
  {
    path: "/services/data-viz",
    title: "Data Visualization & Analysis",
    cards: ["D3.js Chart Library", "Tableau"],
  },
  {
    path: "/services/dev-stack",
    title: "Full Stack Web Development",
    cards: ["Node-Express w/ React"],
  },
  {
    path: "/services/design",
    title: "UI/UX & Design",
    cards: ["Mockups w/ Figma"],
  },
] as const;

test.describe("Service pages", () => {
  for (const service of ORIGINAL_SERVICE_PAGES) {
    test(`loads ${service.path} with hero, cards, and contact form`, async ({ page }) => {
      await page.goto(service.path);

      await expect(
        page.getByRole("heading", { name: service.title, level: 1 }),
      ).toBeVisible();

      for (const card of service.cards) {
        await expect(page.getByRole("heading", { name: card })).toBeVisible();
      }

      await expect(
        page.getByRole("heading", { name: "Schedule a Consultation", exact: true }),
      ).toBeAttached();
    });
  }

  test("hero CTA scrolls to the contact form", async ({ page }) => {
    await page.goto("/services/design");
    await page.getByRole("link", { name: "Schedule Consultation" }).click();

    await expect(page.locator("#contact-section")).toBeInViewport();
  });

  test("returns not found for unknown service slugs", async ({ page }) => {
    const response = await page.goto("/services/not-a-real-service");

    expect(response?.status()).toBe(404);
  });
});
