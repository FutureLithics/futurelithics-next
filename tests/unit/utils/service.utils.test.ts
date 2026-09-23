import { describe, expect, it } from "vitest";
import { SERVICE_PATHS } from "@/app/types/service";
import {
  getLandingServiceBySlug,
  getLandingServiceSlugs,
} from "@/app/utils/service.utils";

describe("service.utils", () => {
  it("returns landing services by slug", () => {
    const service = getLandingServiceBySlug("product-engineering");

    expect(service).toBeDefined();
    expect(service?.title).toBe("Product Engineering");
    expect(service?.path).toBe(SERVICE_PATHS.PRODUCT_ENGINEERING);
  });

  it("returns undefined for unknown landing slugs", () => {
    expect(getLandingServiceBySlug("not-a-real-service")).toBeUndefined();
    expect(getLandingServiceBySlug("data-viz")).toBeUndefined();
  });

  it("lists only top-level landing page slugs", () => {
    expect(getLandingServiceSlugs()).toEqual([
      "product-engineering",
      "legacy-app-modernization",
      "ai-workflow-automation",
      "software-architecture",
      "business-systems",
      "technical-strategy",
    ]);
  });
});
