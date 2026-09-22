import { test, expect } from "@playwright/test";

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

  test("shows three service cards on the homepage", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Data Visualization & Analysis" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Full Stack Web Development" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "UI/UX & Design" }),
    ).toBeVisible();
  });

  test("links consultation CTA to the contact section", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link", { name: "Schedule Consultation" })
      .click();

    await expect(page.locator("#contact-section")).toBeInViewport();
  });
});
