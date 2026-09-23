import { describe, expect, it } from "vitest";
import cardRoutes, { homepageServices } from "@/app/service-routes";
import {
  HOMEPAGE_SERVICE_ORDER,
  SERVICE_PATHS,
  type ServiceRoute,
} from "@/app/types/service";

const collectRoutes = (routes: ServiceRoute[]): ServiceRoute[] =>
  routes.flatMap((route) =>
    route.routes ? [route, ...collectRoutes(route.routes)] : [route],
  );

describe("service-routes", () => {
  it("exports homepage services as the default route list", () => {
    expect(homepageServices).toBe(cardRoutes);
  });

  it("defines nine top-level homepage services in the specified order", () => {
    expect(cardRoutes).toHaveLength(9);
    expect(cardRoutes.map((route) => route.name)).toEqual([
      ...HOMEPAGE_SERVICE_ORDER,
    ]);
  });

  it("requires core fields on every route", () => {
    for (const route of collectRoutes(cardRoutes)) {
      expect(route.name).toBeTruthy();
      expect(route.title).toBeTruthy();
      expect(route.description).toBeTruthy();
      expect(route.path).toBeTruthy();
      expect(route.type).toBeTruthy();
      expect(route.image?.src).toBeTruthy();
      expect(route.image?.alt).toBeTruthy();
    }
  });

  it("contains no em or en dashes in card copy", () => {
    for (const route of collectRoutes(cardRoutes)) {
      expect(`${route.title} ${route.description}`).not.toMatch(/[—–]/);
    }
  });

  it("uses unique route names", () => {
    const allRoutes = collectRoutes(cardRoutes);
    const names = allRoutes.map((route) => route.name);

    expect(new Set(names).size).toBe(names.length);
  });

  it("uses unique paths for active and external routes", () => {
    const routable = collectRoutes(cardRoutes).filter(
      (route) => route.type === "active" || route.type === "external",
    );
    const paths = routable.map((route) => route.path);

    expect(new Set(paths).size).toBe(paths.length);
  });

  it("maps homepage services to expected paths", () => {
    expect(cardRoutes.map((route) => route.path)).toEqual([
      SERVICE_PATHS.DATA_VIZ,
      SERVICE_PATHS.DEV_STACK,
      SERVICE_PATHS.DESIGN,
      SERVICE_PATHS.PRODUCT_ENGINEERING,
      SERVICE_PATHS.LEGACY_APP_MODERNIZATION,
      SERVICE_PATHS.AI_WORKFLOW_AUTOMATION,
      SERVICE_PATHS.SOFTWARE_ARCHITECTURE,
      SERVICE_PATHS.BUSINESS_SYSTEMS,
      SERVICE_PATHS.TECHNICAL_STRATEGY,
    ]);
  });

  it("uses local image assets for the six new homepage services", () => {
    const newServices = cardRoutes.slice(3);

    for (const service of newServices) {
      expect(service.image.src).toMatch(/^\/images\/[a-z-]+\.jpg$/);
      expect(service.image.preprocess).toBe(true);
      expect(service.routes).toEqual([]);
    }
  });
});
