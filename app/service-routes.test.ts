import { describe, expect, it } from "vitest";
import cardRoutes, { homepageServices } from "./service-routes";
import { SERVICE_PATHS, type ServiceRoute } from "./types/service";

const collectRoutes = (routes: ServiceRoute[]): ServiceRoute[] =>
  routes.flatMap((route) =>
    route.routes ? [route, ...collectRoutes(route.routes)] : [route],
  );

describe("service-routes", () => {
  it("exports homepage services as the default route list", () => {
    expect(homepageServices).toBe(cardRoutes);
  });

  it("defines three top-level homepage services", () => {
    expect(cardRoutes).toHaveLength(3);
    expect(cardRoutes.map((route) => route.name)).toEqual(["data", "dev", "ux"]);
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
    ]);
  });
});
