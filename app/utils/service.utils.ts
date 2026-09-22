import cardRoutes from "@/app/service-routes";
import type { HomepageService } from "@/app/types/service";

export function getLandingServiceBySlug(
  slug: string,
): HomepageService | undefined {
  return cardRoutes.find((service) => service.path === `/${slug}`);
}

export function getLandingServiceSlugs(): string[] {
  return cardRoutes
    .filter((service) => !service.path.startsWith("/services/"))
    .map((service) => service.path.slice(1));
}
