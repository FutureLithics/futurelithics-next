import type { ServicePageContent } from "./types";

const softwareArchitecture: ServicePageContent = {
  slug: "software-architecture",
  metaTitle: "Software Architecture Consulting | Future Lithics",
  metaDescription:
    "Software architecture consulting for application, data, API, and cloud design, plus architecture reviews that keep complexity matched to the real problem.",
  hero: {
    headline: "Make important technical decisions before they become expensive ones.",
    lede: "Architecture is the set of decisions that are hardest to change later: how a system is divided, where data lives, how components communicate, and how it all runs in production. Getting them right early saves months of rework, and explaining them clearly keeps everyone aligned.",
  },
  problem: {
    heading: "Early shortcuts, lasting costs",
    paragraphs: [
      "Architectural problems rarely announce themselves at the start. A system grows one feature at a time, and each decision seems reasonable in isolation. Eventually the codebase becomes difficult to reason about: changes in one area break another, performance degrades unpredictably, and integrating with a new service requires touching everything.",
      "The opposite failure is just as common. Teams adopt microservices, event buses, and elaborate cloud infrastructure long before the product needs them, then spend their time operating machinery instead of delivering features.",
      "Good architecture sits between those extremes. It gives a system enough structure to grow while keeping it as simple as the problem allows.",
    ],
  },
  capabilities: {
    heading: "Architecture services",
    intro:
      "Work can focus on a new system, a specific decision, or a review of what already exists.",
    items: [
      {
        title: "Application architecture",
        body: "Defining module boundaries, responsibilities, and dependencies so the codebase stays understandable as features and contributors are added.",
      },
      {
        title: "Data architecture and flow",
        body: "Designing schemas, choosing storage approaches, and mapping how data moves between services, jobs, and reporting tools, including where sensitive data lives, who can access it, and where it should not be duplicated.",
      },
      {
        title: "API and integration architecture",
        body: "Shaping REST and GraphQL APIs, versioning strategies, and integration patterns with third-party platforms so external dependencies do not dictate internal design.",
      },
      {
        title: "Cloud and deployment architecture",
        body: "Selecting hosting, environments, and deployment pipelines appropriate to your scale, budget, and operational capacity.",
      },
      {
        title: "Architecture reviews",
        body: "Evaluating an existing system's structure, identifying the risks that matter most, and producing a prioritized set of recommendations your team can act on.",
      },
      {
        title: "Decision records and documentation",
        body: "Capturing the reasoning behind significant choices in plain language, so developers and the non-technical stakeholders who fund the work understand not just what was built, but why.",
      },
    ],
  },
  spotlight: {
    kind: "comparison",
    id: "appropriate-complexity",
    heading: "Architecture appropriate to the problem",
    intro:
      "The right design depends on the product's size, team, and trajectory. Both sets of warning signs below are common, and both are fixable.",
    columns: [
      {
        title: "Signs of too little structure",
        items: [
          "Business logic is scattered across controllers, views, and background jobs.",
          "Small changes routinely cause regressions in unrelated features.",
          "There is no clear owner or boundary for core data.",
          "Integrations are wired directly into application code with no isolation.",
        ],
      },
      {
        title: "Signs of too much infrastructure",
        items: [
          "There are more services than developers, and most changes span several of them.",
          "Significant time goes to maintaining deployment tooling rather than the product.",
          "Distributed-systems problems (consistency, tracing, retries) appear in an application with modest traffic.",
          "Abstractions were built for requirements that never arrived.",
        ],
      },
    ],
    closing:
      "I favor the simplest structure that meets real requirements, with clear seams where the system is likely to grow.",
  },
  fit: {
    heading: "When an architecture engagement makes sense",
    items: [
      "You are starting a new product or major feature and want the foundations designed deliberately.",
      "An existing system has become hard to change, and you need to understand why before deciding what to do.",
      "You are evaluating a significant technical decision, such as a new database, a move to services, or a platform migration, and want an independent perspective.",
      "Your team is growing, and the codebase needs clearer boundaries so people can work without stepping on each other.",
      "Leadership, partners, or investors need confidence that the technical approach will support the business as it grows.",
    ],
  },
  evidence: [
    {
      title: "QuietMetric",
      body: "Architecting QuietMetric meant designing how a privacy-first analytics product collects, stores, and processes data, how its AI-assisted insights are produced, and how the whole system runs reliably in production.",
    },
    {
      title: "Enterprise systems work",
      body: "On an enterprise healthcare platform, I worked within a large, established architecture during a Vue-to-Nuxt migration, integrating GraphQL APIs, real-time communication, and telemetry across existing system boundaries.",
      links: [{ label: "Experity", href: "https://www.experityhealth.com/" }],
    },
  ],
  related: ["technical-strategy", "product-engineering", "legacy-app-modernization"],
  cta: {
    heading: "Facing a consequential technical decision?",
    body: "Share the system or decision you are working through. We can talk about the tradeoffs and whether an architecture review or design engagement would help.",
  },
};

export default softwareArchitecture;
