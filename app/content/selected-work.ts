import type { SelectedWorkIconName } from "./selected-work-icons";

export type SelectedWorkLink = {
  label: string;
  href: string;
};

export type SelectedWorkItem = {
  id: string;
  title: string;
  body: string;
  stacks: string[];
  links: SelectedWorkLink[];
  icon: SelectedWorkIconName;
};

export const selectedWorkItems: SelectedWorkItem[] = [
  {
    id: "quietmetric",
    title: "QuietMetric",
    body: "Designed and engineered a privacy-first analytics product with data-intensive interfaces, AI-assisted insights, and production infrastructure.",
    stacks: ["Django", "Postgres", "AI Integration", "Next.js"],
    links: [{ label: "QuietMetric", href: "https://quietmetric.com/" }],
    icon: "chart-line",
  },
  {
    id: "healthcare-modernization",
    title: "Healthcare Platform Modernization",
    body: "Modernized an enterprise healthcare application through Vue-to-Nuxt migration, GraphQL integration, real-time communication, telemetry, and administrative workflows.",
    stacks: ["Vue", "Nuxt", "Rails", "GraphQL"],
    links: [
      { label: "eHealth", href: "https://www.ehealthinsurance.com/" },
      { label: "Experity", href: "https://www.experityhealth.com/" },
    ],
    icon: "heart-pulse",
  },
  {
    id: "house-renovation-guide",
    title: "House Renovation Guide",
    body: "Redesigned and repositioned a content platform around search-focused editorial content, structured information architecture, and an interactive renovation ROI calculator.",
    stacks: ["WordPress", "Custom Theme", "Custom Plugin Development"],
    links: [{ label: "House Renovation Guide", href: "https://houserenovationguide.com/" }],
    icon: "house",
  },
  {
    id: "pianolog",
    title: "PianoLog",
    body: "Redesigned and expanded a piano education and publishing platform with editorial content, affiliate resources, ecommerce, products, and email acquisition.",
    stacks: ["WordPress", "Custom Theme", "Custom Plugin Development"],
    links: [{ label: "PianoLog", href: "https://pianolog.com/" }],
    icon: "music",
  },
];
