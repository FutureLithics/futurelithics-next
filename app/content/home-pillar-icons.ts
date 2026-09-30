import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowsRotate,
  faGears,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";

export const HOME_PILLAR_ICONS = [
  "arrows-rotate",
  "gears",
  "sitemap",
] as const;

export type HomePillarIconName = (typeof HOME_PILLAR_ICONS)[number];

const iconMap: Record<HomePillarIconName, IconDefinition> = {
  "arrows-rotate": faArrowsRotate,
  gears: faGears,
  sitemap: faSitemap,
};

export function getHomePillarIcon(name: HomePillarIconName): IconDefinition {
  return iconMap[name];
}
