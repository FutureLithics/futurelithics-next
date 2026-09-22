import type { HomepageServiceName } from "@/app/types/service";

export type ServiceHighlight = {
  title: string;
  body: string;
};

export type ServiceSpotlight =
  | {
      kind: "steps";
      id: string;
      heading: string;
      intro: string;
      steps: ServiceHighlight[];
      deliverables?: string[];
    }
  | {
      kind: "comparison";
      id: string;
      heading: string;
      intro: string;
      columns: [
        { title: string; items: string[] },
        { title: string; items: string[] },
      ];
      closing: string;
    }
  | {
      kind: "assessment";
      id: string;
      heading: string;
      paragraphs: string[];
      note: string;
    };

export type ServicePageContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    headline: string;
    lede: string;
  };
  problem: {
    heading: string;
    paragraphs: string[];
  };
  capabilities: {
    heading: string;
    intro: string;
    items: ServiceHighlight[];
  };
  spotlight: ServiceSpotlight;
  fit: {
    heading: string;
    items: string[];
  };
  evidence: ServiceHighlight[];
  related: HomepageServiceName[];
  cta: {
    heading: string;
    body: string;
  };
};
