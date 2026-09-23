import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightArrowLeft,
  faArrowsRotate,
  faBullseye,
  faCircleCheck,
  faClipboardList,
  faComments,
  faDatabase,
  faLightbulb,
  faMagnifyingGlass,
  faRocket,
  faRoute,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";

export const SERVICE_STEP_ICONS = [
  "lightbulb",
  "clipboard-list",
  "rocket",
  "arrows-rotate",
  "bullseye",
  "magnifying-glass",
  "scale-balanced",
  "route",
  "comments",
  "database",
  "arrow-right-arrow-left",
  "circle-check",
] as const;

export type ServiceStepIconName = (typeof SERVICE_STEP_ICONS)[number];

const iconMap: Record<ServiceStepIconName, IconDefinition> = {
  lightbulb: faLightbulb,
  "clipboard-list": faClipboardList,
  rocket: faRocket,
  "arrows-rotate": faArrowsRotate,
  bullseye: faBullseye,
  "magnifying-glass": faMagnifyingGlass,
  "scale-balanced": faScaleBalanced,
  route: faRoute,
  comments: faComments,
  database: faDatabase,
  "arrow-right-arrow-left": faArrowRightArrowLeft,
  "circle-check": faCircleCheck,
};

export function getServiceStepIcon(name: ServiceStepIconName): IconDefinition {
  return iconMap[name];
}
