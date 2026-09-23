import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact-section");
  });

  test("shows validation errors when required fields are empty", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText("Required").first()).toBeVisible();
  });

  test("submits successfully when the API accepts the request", async ({
    page,
  }) => {
    await page.route("**/api/mailer/contact-me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Email sent successfully",
        }),
      });
    });

    await page.getByPlaceholder("First Name").fill("Ada");
    await page.getByPlaceholder("Last Name").fill("Lovelace");
    await page.getByPlaceholder("Email").fill("ada@example.com");
    await page
      .getByPlaceholder("Provide the reason for contacting...")
      .fill("Interested in workflow automation.");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByRole("dialog")).toContainText("Email Successful!");
  });

  test("shows an error modal when the API fails", async ({ page }) => {
    await page.route("**/api/mailer/contact-me", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Failed to send email",
        }),
      });
    });

    await page.getByPlaceholder("First Name").fill("Ada");
    await page.getByPlaceholder("Last Name").fill("Lovelace");
    await page.getByPlaceholder("Email").fill("ada@example.com");
    await page
      .getByPlaceholder("Provide the reason for contacting...")
      .fill("Need help with a legacy app.");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByRole("dialog")).toContainText("Email Unsuccessful.");
  });
});
