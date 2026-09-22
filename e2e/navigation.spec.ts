import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("logo returns to the homepage", async ({ page }) => {
    await page.goto("/services/data-viz");
    await page.getByRole("link", { name: "Future Lithics" }).click();

    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("heading", { name: "Services", exact: true }),
    ).toBeVisible();
  });

  test("desktop services menu exposes top-level services", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    await page.locator(".desktop-toggle").click();

    const menu = page.locator(".desktop-nav");

    await expect(
      menu.getByRole("link", {
        name: "Data Visualization & Analysis",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      menu.getByRole("link", {
        name: "Full Stack Web Development",
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      menu.getByRole("link", { name: "UI/UX & Design", exact: true }),
    ).toBeVisible();
  });
});
