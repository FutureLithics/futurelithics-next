import type { MetadataRoute } from "next";
import cardRoutes from "@/app/service-routes";
import type { ServiceRoute } from "@/app/types/service";
import { SITE_URL } from "@/app/utils/metadata";

const collectPublicPaths = (routes: ServiceRoute[]): string[] =>
  routes.flatMap((route) => {
    const path =
      route.type !== "inactive" && route.path.startsWith("/")
        ? [route.path]
        : [];

    return route.routes
      ? [...path, ...collectPublicPaths(route.routes)]
      : path;
  });

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePaths = [...new Set(collectPublicPaths(cardRoutes))];

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePaths.map((path) => ({
      url: new URL(path, SITE_URL).toString(),
      changeFrequency: "monthly" as const,
      priority: path.split("/").filter(Boolean).length === 1 ? 0.8 : 0.6,
    })),
  ];
}
