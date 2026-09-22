import { describe, expect, it } from "vitest";
import cardRoutes from "@/app/service-routes";
import { getLandingServiceSlugs } from "@/app/utils/service.utils";
import { getServicePageContent, servicePages } from "./index";
import type { ServicePageContent } from "./types";

const collectText = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectText);
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !["slug", "id", "kind", "related"].includes(key))
      .flatMap(([, entry]) => collectText(entry));
  }
  return [];
};

const wordCount = (content: ServicePageContent) =>
  collectText(content).join(" ").split(/\s+/).filter(Boolean).length;

const pages = Object.values(servicePages);

describe("service page content", () => {
  it("provides content for every landing service and nothing else", () => {
    expect(Object.keys(servicePages).sort()).toEqual(
      getLandingServiceSlugs().sort(),
    );
  });

  it("keys each page by its own slug", () => {
    for (const [slug, content] of Object.entries(servicePages)) {
      expect(content.slug).toBe(slug);
      expect(getServicePageContent(slug)).toBe(content);
    }
  });

  it("returns undefined for unknown slugs", () => {
    expect(getServicePageContent("not-a-real-service")).toBeUndefined();
  });

  it("uses unique, search-friendly titles and descriptions", () => {
    const titles = pages.map((page) => page.metaTitle);
    const descriptions = pages.map((page) => page.metaDescription);
    const headlines = pages.map((page) => page.hero.headline);

    expect(new Set(titles).size).toBe(pages.length);
    expect(new Set(descriptions).size).toBe(pages.length);
    expect(new Set(headlines).size).toBe(pages.length);

    for (const page of pages) {
      expect(page.metaTitle.length).toBeLessThanOrEqual(60);
      expect(page.metaDescription.length).toBeGreaterThanOrEqual(70);
      expect(page.metaDescription.length).toBeLessThanOrEqual(160);
    }
  });

  it("includes every required section", () => {
    for (const page of pages) {
      expect(page.hero.lede).toBeTruthy();
      expect(page.problem.paragraphs.length).toBeGreaterThanOrEqual(2);
      expect(page.capabilities.items.length).toBeGreaterThanOrEqual(4);
      expect(page.fit.items.length).toBeGreaterThanOrEqual(3);
      expect(page.evidence.length).toBeGreaterThanOrEqual(1);
      expect(page.cta.heading).toBeTruthy();
      expect(page.cta.body).toBeTruthy();
    }
  });

  it("links to two or three valid related services, excluding itself", () => {
    const serviceNames = cardRoutes.map((service) => service.name);

    for (const page of pages) {
      expect(page.related.length).toBeGreaterThanOrEqual(2);
      expect(page.related.length).toBeLessThanOrEqual(3);
      expect(page.related).not.toContain(page.slug);
      expect(new Set(page.related).size).toBe(page.related.length);

      for (const name of page.related) {
        expect(serviceNames).toContain(name);
      }
    }
  });

  it("contains no em or en dashes", () => {
    for (const page of pages) {
      for (const text of collectText(page)) {
        expect(text).not.toMatch(/[—–]/);
      }
    }
  });

  it("has substantive copy rather than a stub", () => {
    for (const page of pages) {
      expect(wordCount(page)).toBeGreaterThanOrEqual(600);
    }
  });

  it("includes the service-specific sections called for in the brief", () => {
    expect(servicePages["legacy-app-modernization"].spotlight).toMatchObject({
      kind: "comparison",
      id: "modernize-or-rewrite",
    });
    expect(servicePages["ai-workflow-automation"].spotlight).toMatchObject({
      kind: "assessment",
      id: "workflow-assessment",
    });

    const discovery = servicePages["technical-strategy"].spotlight;
    expect(discovery.kind).toBe("steps");
    expect(discovery.heading).toContain("Technical Discovery & Roadmapping");
    expect(discovery.kind === "steps" && discovery.deliverables?.length).toBeGreaterThan(0);
  });
});
