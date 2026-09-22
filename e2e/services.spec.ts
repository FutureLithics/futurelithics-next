import { test, expect } from "@playwright/test";

test.describe("Service pages", () => {
  test("loads the data visualization directory", async ({ page }) => {
    await page.goto("/services/data-viz");

    await expect(
      page.getByRole("heading", {
        name: "Data Visualization & Analysis",
        level: 2,
      }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "D3.js Chart Library" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Tableau" })).toBeVisible();
  });

  test("loads the development stack directory", async ({ page }) => {
    await page.goto("/services/dev-stack");

    await expect(
      page.getByRole("heading", {
        name: "Full Stack Web Development",
        level: 2,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Node-Express w/ React" }),
    ).toBeVisible();
  });

  test("loads the design directory", async ({ page }) => {
    await page.goto("/services/design");

    await expect(
      page.getByRole("heading", { name: "UI/UX & Design", level: 2 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Mockups w/ Figma" }),
    ).toBeVisible();
  });

  test("returns not found for unknown service slugs", async ({ page }) => {
    const response = await page.goto("/services/not-a-real-service");

    expect(response?.status()).toBe(404);
  });
});
