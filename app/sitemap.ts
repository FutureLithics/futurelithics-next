import type { MetadataRoute } from "next";
import { homepageServices } from "@/app/service-routes";
import { SITE_URL } from "@/app/utils/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePaths = homepageServices
    .filter((route) => route.type === "active" && route.path.startsWith("/"))
    .map((route) => route.path);

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePaths.map((path) => ({
      url: new URL(path, SITE_URL).toString(),
      changeFrequency: "monthly" as const,
      priority: path.startsWith("/services/") ? 0.7 : 0.8,
    })),
  ];
}
