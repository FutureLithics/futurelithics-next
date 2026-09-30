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
  test("renders hero, pillars, services, selected work, and contact sections", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Software Engineering, Application Modernization & Automation",
        level: 1,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Services", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Selected Work", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Core Engineering Pillars", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Schedule a Consultation",
        exact: true,
      }),
    ).toBeVisible();
  });

  test("places pillars before services, then selected work, then contact", async ({ page }) => {
    await page.goto("/");

    const pillarsBox = await page.locator("#primary-pillars").boundingBox();
    const servicesBox = await page.locator("#services-section").boundingBox();
    const selectedWorkBox = await page.locator("#selected-work").boundingBox();
    const contactBox = await page.locator("#contact-section").boundingBox();

    expect(pillarsBox).not.toBeNull();
    expect(servicesBox).not.toBeNull();
    expect(selectedWorkBox).not.toBeNull();
    expect(contactBox).not.toBeNull();

    expect((pillarsBox?.y ?? 0) < (servicesBox?.y ?? 0)).toBe(true);
    expect((servicesBox?.y ?? 0) < (selectedWorkBox?.y ?? 0)).toBe(true);
    expect((selectedWorkBox?.y ?? 0) < (contactBox?.y ?? 0)).toBe(true);
  });

  test("shows three pillar cards with service links", async ({
    page,
  }) => {
    await page.goto("/");

    const section = page.locator("#primary-pillars");
    await expect(section.getByRole("article")).toHaveCount(3);

    const expectedLinks = [
      {
        label: "Explore application modernization",
        href: "/legacy-app-modernization",
      },
      {
        label: "Explore business systems and automation",
        href: "/business-systems",
      },
      {
        label: "Explore software architecture",
        href: "/software-architecture",
      },
    ];

    for (const link of expectedLinks) {
      await expect(section.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }
  });

  test("shows four selected work cards with project links and stack pills", async ({ page }) => {
    await page.goto("/");

    const section = page.locator("#selected-work");
    await expect(section.getByRole("article")).toHaveCount(4);
    await expect(section.getByRole("button")).toHaveCount(0);

    const expectedLinks = [
      { label: "QuietMetric", href: "https://quietmetric.com/" },
      { label: "eHealth", href: "https://www.ehealthinsurance.com/" },
      { label: "Experity", href: "https://www.experityhealth.com/" },
      { label: "House Renovation Guide", href: "https://houserenovationguide.com/" },
      { label: "PianoLog", href: "https://pianolog.com/" },
    ];

    await expect(section.getByRole("link")).toHaveCount(expectedLinks.length);

    for (const link of expectedLinks) {
      await expect(section.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }

    const stacks = section.locator(".selected-work-stacks li");
    await expect(stacks.filter({ hasText: "WordPress" })).toHaveCount(2);
    await expect(stacks.filter({ hasText: "Django" })).toHaveCount(1);
    await expect(stacks.filter({ hasText: "GraphQL" })).toHaveCount(1);

    const cards = section.locator(".selected-work-card");
    await expect(cards).toHaveCount(4);

    for (let index = 0; index < 4; index += 1) {
      await expect(cards.nth(index)).toHaveCSS("cursor", "default");
    }
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
