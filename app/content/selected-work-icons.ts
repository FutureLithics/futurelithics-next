import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faChartLine,
  faHeartPulse,
  faHouse,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

export const SELECTED_WORK_ICONS = [
  "chart-line",
  "heart-pulse",
  "house",
  "music",
] as const;

export type SelectedWorkIconName = (typeof SELECTED_WORK_ICONS)[number];

const iconMap: Record<SelectedWorkIconName, IconDefinition> = {
  "chart-line": faChartLine,
  "heart-pulse": faHeartPulse,
  house: faHouse,
  music: faMusic,
};

export function getSelectedWorkIcon(name: SelectedWorkIconName): IconDefinition {
  return iconMap[name];
}
