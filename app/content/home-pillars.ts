import type { ServicePath } from "@/app/types/service";

export type HomePillar = {
  id: string;
  title: string;
  body: string;
  href: ServicePath;
  linkLabel: string;
  topics: string[];
  icon: "arrows-rotate" | "gears" | "sitemap";
};

export const homePillars: HomePillar[] = [
  {
    id: "application-modernization",
    title: "Application Modernization",
    body: "Modernize legacy applications through incremental frontend upgrades, framework migrations, dependency refreshes, API improvements, and practical rewrite alternatives.",
    href: "/legacy-app-modernization",
    linkLabel: "Explore application modernization",
    topics: [
      "Frontend modernization",
      "Vue to Nuxt migration",
      "React application modernization",
      "Ruby on Rails modernization",
      "Legacy application assessment",
      "Application modernization vs rewrite",
    ],
    icon: "arrows-rotate",
  },
  {
    id: "business-systems-automation",
    title: "Business Systems & Automation",
    body: "Connect disconnected tools, replace spreadsheet-driven workflows, and automate operational handoffs with custom internal systems, reporting, and integrations.",
    href: "/business-systems",
    linkLabel: "Explore business systems and automation",
    topics: [
      "Workflow automation",
      "Spreadsheet to web application",
      "Custom internal tools",
      "CRM integration services",
      "Business process automation",
      "Dashboard development",
    ],
    icon: "gears",
  },
  {
    id: "software-architecture",
    title: "Software Architecture",
    body: "Design maintainable application, API, data, and integration architectures that reduce technical debt and support growth without unnecessary complexity.",
    href: "/software-architecture",
    linkLabel: "Explore software architecture",
    topics: [
      "Software architecture review",
      "Technical debt assessment",
      "API integration architecture",
      "SaaS architecture consulting",
    ],
    icon: "sitemap",
  },
];
