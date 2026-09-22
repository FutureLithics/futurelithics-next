export type ServiceLinkType = "active" | "inactive" | "external" | "page";

export type ServiceImage = {
  src: string;
  alt: string;
  preprocess?: boolean;
};

export type ServiceRoute = {
  name: string;
  title: string;
  description: string;
  path: string;
  type: ServiceLinkType;
  image: ServiceImage;
  componentType?: "service-directory" | "chart" | "service-landing";
  chart?: string;
  level?: number;
  routes?: ServiceRoute[];
};

/** Fields required to render a service card. */
export type ServiceCardData = Pick<
  ServiceRoute,
  "name" | "title" | "description" | "path" | "type" | "image"
>;

/** Top-level homepage service card shape. */
export type HomepageService = ServiceRoute & {
  level: 1;
  routes: ServiceRoute[];
};

export const SERVICE_PATHS = {
  DATA_VIZ: "/services/data-viz",
  DEV_STACK: "/services/dev-stack",
  DESIGN: "/services/design",
  PRODUCT_ENGINEERING: "/product-engineering",
  LEGACY_APP_MODERNIZATION: "/legacy-app-modernization",
  AI_WORKFLOW_AUTOMATION: "/ai-workflow-automation",
  SOFTWARE_ARCHITECTURE: "/software-architecture",
  BUSINESS_SYSTEMS: "/business-systems",
  TECHNICAL_STRATEGY: "/technical-strategy",
} as const;

export const HOMEPAGE_SERVICE_ORDER = [
  "data",
  "dev",
  "ux",
  "product-engineering",
  "legacy-app-modernization",
  "ai-workflow-automation",
  "software-architecture",
  "business-systems",
  "technical-strategy",
] as const;

export type ServicePath =
  (typeof SERVICE_PATHS)[keyof typeof SERVICE_PATHS];
