import { test, expect } from "@playwright/test";

const HOMEPAGE_SERVICE_TITLES = [
  "Data Visualization & Analysis",
  "Full Stack Web Development",
  "UI/UX & Design",
  "Product Engineering",
  "Legacy App Modernization",
  "AI & Workflow Automation",
  "Software Architecture",
  "Business Systems",
  "Technical Strategy",
] as const;

test.describe("Homepage", () => {
  test("renders hero, services, and contact sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Let’s get started building your vision today.",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Services", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Schedule a Consultation",
        exact: true,
      }),
    ).toBeVisible();
  });

  test("shows nine service cards in the specified order", async ({ page }) => {
    await page.goto("/");

    const cards = page.locator(".service-card-inner h5");
    await expect(cards).toHaveCount(9);
    await expect(cards).toHaveText([...HOMEPAGE_SERVICE_TITLES]);
  });

  test("links each homepage service card to its route", async ({ page }) => {
    await page.goto("/");

    const expectedLinks = [
      "/services/data-viz",
      "/services/dev-stack",
      "/services/design",
      "/product-engineering",
      "/legacy-app-modernization",
      "/ai-workflow-automation",
      "/software-architecture",
      "/business-systems",
      "/technical-strategy",
    ];

    const links = page.locator(".service-card-link");
    await expect(links).toHaveCount(9);

    for (let index = 0; index < expectedLinks.length; index += 1) {
      await expect(links.nth(index)).toHaveAttribute(
        "href",
        expectedLinks[index],
      );
    }
  });

  test("links consultation CTA to the contact section", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link", { name: "Schedule Consultation" })
      .click();

    await expect(page.locator("#contact-section")).toBeInViewport();
  });
});
