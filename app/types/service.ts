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
  componentType?: "service-directory" | "chart";
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
  componentType: "service-directory";
  routes: ServiceRoute[];
};

export const SERVICE_PATHS = {
  DATA_VIZ: "/services/data-viz",
  DEV_STACK: "/services/dev-stack",
  DESIGN: "/services/design",
} as const;

export type ServicePath =
  (typeof SERVICE_PATHS)[keyof typeof SERVICE_PATHS];
