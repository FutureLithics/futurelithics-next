import { describe, expect, it } from "vitest";
import cardRoutes from "./service-routes";

type ServiceRoute = {
  name: string;
  title: string;
  description: string;
  path: string;
  type: string;
  image: { src: string; alt: string };
  routes?: ServiceRoute[];
};

const collectRoutes = (routes: ServiceRoute[]): ServiceRoute[] =>
  routes.flatMap((route) =>
    route.routes ? [route, ...collectRoutes(route.routes)] : [route],
  );

describe("service-routes", () => {
  it("defines three top-level homepage services", () => {
    expect(cardRoutes).toHaveLength(3);
    expect(cardRoutes.map((route) => route.name)).toEqual(["data", "dev", "ux"]);
  });

  it("requires core fields on every route", () => {
    for (const route of collectRoutes(cardRoutes as ServiceRoute[])) {
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
    const allRoutes = collectRoutes(cardRoutes as ServiceRoute[]);
    const names = allRoutes.map((route) => route.name);

    expect(new Set(names).size).toBe(names.length);
  });

  it("uses unique paths for active and external routes", () => {
    const routable = collectRoutes(cardRoutes as ServiceRoute[]).filter(
      (route) => route.type === "active" || route.type === "external",
    );
    const paths = routable.map((route) => route.path);

    expect(new Set(paths).size).toBe(paths.length);
  });

  it("maps homepage services to expected paths", () => {
    expect(cardRoutes.map((route) => route.path)).toEqual([
      "/services/data-viz",
      "/services/dev-stack",
      "/services/design",
    ]);
  });
});
