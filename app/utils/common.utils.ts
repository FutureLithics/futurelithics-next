import type { ServiceRoute } from "@/app/types/service";

export const getRouteDataBySlug = (
  slug: string,
  routes?: ServiceRoute[],
): ServiceRoute | null => {
  if (!routes || routes.length === 0) return null;

  const directMatch = routes.find((route) => route.path === `/services/${slug}`);
  if (directMatch) return directMatch;

  const slugMatch = routes.find((route) => route.path.endsWith(`/${slug}`));
  if (slugMatch) return slugMatch;

  for (const route of routes) {
    if (route.routes) {
      const childMatch = getRouteDataBySlug(slug, route.routes);
      if (childMatch) return childMatch;
    }
  }

  return null;
};
