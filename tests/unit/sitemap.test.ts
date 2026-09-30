import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/app/utils/metadata";

describe("sitemap", () => {
  it("includes the homepage and all public internal routes", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/services/data-viz`);
    expect(urls).toContain(`${SITE_URL}/services/dev-stack`);
    expect(urls).toContain(`${SITE_URL}/services/design`);
    expect(urls).toContain(`${SITE_URL}/product-engineering`);
    expect(urls).toContain(`${SITE_URL}/legacy-app-modernization`);
    expect(urls).toContain(`${SITE_URL}/ai-workflow-automation`);
    expect(urls).toContain(`${SITE_URL}/software-architecture`);
    expect(urls).toContain(`${SITE_URL}/business-systems`);
    expect(urls).toContain(`${SITE_URL}/technical-strategy`);
    expect(urls).toContain(`${SITE_URL}/charts/bar`);
    expect(urls).toContain(`${SITE_URL}/charts/line`);
    expect(urls).toContain(`${SITE_URL}/charts/pie`);
    expect(urls).toContain(`${SITE_URL}/charts/myco-network`);
  });

  it("excludes external and inactive routes without duplicates", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls.every((url) => url.startsWith(SITE_URL))).toBe(true);
    expect(urls.some((url) => url.includes("tableau.com"))).toBe(false);
    expect(urls.some((url) => url.includes("lyricitriade.com"))).toBe(false);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
