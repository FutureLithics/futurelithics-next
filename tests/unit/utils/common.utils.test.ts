import { describe, expect, it } from "vitest";
import cardRoutes from "@/app/service-routes";
import { getRouteDataBySlug } from "@/app/utils/common.utils";

describe("getRouteDataBySlug", () => {
  it("returns null when routes are empty or missing", () => {
    expect(getRouteDataBySlug("data-viz")).toBeNull();
    expect(getRouteDataBySlug("data-viz", [])).toBeNull();
  });

  it("finds a top-level service by slug", () => {
    const match = getRouteDataBySlug("data-viz", cardRoutes);

    expect(match).not.toBeNull();
    expect(match?.title).toBe("Data Visualization & Analysis");
    expect(match?.path).toBe("/services/data-viz");
  });

  it("finds nested routes by slug segment", () => {
    const match = getRouteDataBySlug("chart-card", cardRoutes);

    expect(match).not.toBeNull();
    expect(match?.title).toBe("D3.js Chart Library");
    expect(match?.path).toBe("/services/data-viz/chart-card");
  });

  it("finds deeply nested chart routes", () => {
    const match = getRouteDataBySlug("bar", cardRoutes);

    expect(match).not.toBeNull();
    expect(match?.title).toBe("Bar Charts");
    expect(match?.path).toBe("/charts/bar");
  });

  it("returns null for unknown slugs", () => {
    expect(getRouteDataBySlug("not-a-real-service", cardRoutes)).toBeNull();
  });
});
