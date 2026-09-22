import { test, expect } from "@playwright/test";
import { servicePages } from "../app/content/services";

const SITE_URL = "https://futurelithics.com";

const NEW_SERVICE_PAGES = [
  { slug: "product-engineering", title: "Product Engineering" },
  { slug: "legacy-app-modernization", title: "Legacy App Modernization" },
  { slug: "ai-workflow-automation", title: "AI & Workflow Automation" },
  { slug: "software-architecture", title: "Software Architecture" },
  { slug: "business-systems", title: "Business Systems" },
  { slug: "technical-strategy", title: "Technical Strategy" },
] as const;

test.describe("New service pages", () => {
  for (const { slug, title } of NEW_SERVICE_PAGES) {
    const content = servicePages[slug];

    test(`${slug} renders all required sections`, async ({ page }) => {
      const response = await page.goto(`/${slug}`);

      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { name: title, level: 1 })).toBeVisible();

      for (const id of ["problem", "capabilities", content.spotlight.id, "fit", "evidence", "related", "consultation"]) {
        await expect(page.locator(`section#${id} h2`)).toBeVisible();
      }

      await expect(page.locator("#contact-section")).toBeAttached();

      const relatedLinks = page.locator("section#related a");
      await expect(relatedLinks).toHaveCount(content.related.length);
    });

    test(`${slug} exposes unique metadata`, async ({ page }) => {
      await page.goto(`/${slug}`);

      await expect(page).toHaveTitle(content.metaTitle);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        content.metaDescription,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${SITE_URL}/${slug}`,
      );
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        content.metaTitle,
      );
    });
  }

  test("opens a new service page through client navigation", async ({ page }) => {
    await page.goto("/");
    await page.locator('.service-card-link[href="/software-architecture"]').click();

    await expect(page).toHaveURL("/software-architecture");
    await expect(
      page.getByRole("heading", { name: "Software Architecture", level: 1 }),
    ).toBeVisible();
  });

  test("hero CTA scrolls to the contact form", async ({ page }) => {
    await page.goto("/business-systems");
    await page.getByRole("link", { name: "Schedule Consultation" }).first().click();

    await expect(page.locator("#contact-section")).toBeInViewport();
  });

  test("reserves a section for the workflow assessment", async ({ page }) => {
    await page.goto("/ai-workflow-automation");

    await expect(
      page.getByRole("heading", { name: "What problem are you trying to solve?", level: 2 }),
    ).toBeVisible();
  });

  test("returns not found for unknown top-level slugs", async ({ page }) => {
    const response = await page.goto("/not-a-real-service");

    expect(response?.status()).toBe(404);
  });
});
