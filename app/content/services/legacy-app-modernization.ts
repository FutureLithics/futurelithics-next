import type { ServicePageContent } from "./types";

const legacyAppModernization: ServicePageContent = {
  slug: "legacy-app-modernization",
  metaTitle: "Legacy App Modernization | Future Lithics",
  metaDescription:
    "Modernize aging web applications incrementally: frontend upgrades, Rails, Django, and Node modernization, dependency updates, testing, and safer migrations.",
  hero: {
    headline:
      "Improve the software you depend on without automatically rebuilding it.",
    lede: "Older applications often still run important parts of a business. Modernization makes them faster, safer, and easier to change, usually in stages while the system stays in production.",
  },
  problem: {
    heading: "Old software, current obligations",
    paragraphs: [
      "Most legacy applications were not built badly. They were built for a different time: older frameworks, different traffic, smaller teams, and requirements that have since changed several times. Over the years, dependencies fall behind, workarounds accumulate, and the people who understood the original decisions move on.",
      "The symptoms are familiar. Simple changes take weeks. Upgrades are postponed because nobody is sure what will break. Security patches become harder to apply. New developers need months to become productive, and the interface looks and feels its age.",
      "The tempting response is a full rewrite. Sometimes that is right, but often it trades a known set of problems for a long, expensive project with its own risks. Modernization starts by understanding what the existing system does well and improving the parts that are holding it back.",
    ],
  },
  capabilities: {
    heading: "Modernization services",
    intro:
      "Work is scoped to the problems that matter most, and each change is delivered so the application keeps running.",
    items: [
      {
        title: "Outdated frontend modernization",
        body: "Migrating aging interfaces (jQuery, legacy Vue or React, server-rendered templates) to current frameworks, often one screen or module at a time rather than all at once.",
      },
      {
        title: "Rails, Django, Node, and API modernization",
        body: "Upgrading backend frameworks and runtimes, untangling tightly coupled code, and introducing clearer API boundaries so the frontend and integrations can evolve independently.",
      },
      {
        title: "Framework and dependency upgrades",
        body: "Planning and executing major version upgrades, replacing abandoned libraries, and resolving the security advisories that accumulate when upgrades are deferred.",
      },
      {
        title: "Performance, reliability, and observability",
        body: "Finding the real bottlenecks through profiling and query analysis, then adding the logging, metrics, and error tracking needed to see problems before users report them.",
      },
      {
        title: "Testing and maintainability",
        body: "Adding characterization tests around critical behavior before changing it, so improvements can be made with confidence rather than hope.",
      },
      {
        title: "Incremental migration",
        body: "Moving functionality piece by piece using techniques such as strangler-pattern routing, feature flags, and parallel runs, keeping production stable throughout.",
      },
    ],
  },
  spotlight: {
    kind: "comparison",
    id: "modernize-or-rewrite",
    heading: "Modernize or rewrite?",
    intro:
      "Neither answer is correct by default. The decision depends on what the current system gets right and how much of it would need to change.",
    columns: [
      {
        title: "Modernize when",
        items: [
          "The core business logic is sound and encodes years of edge cases that would be expensive to rediscover.",
          "Users depend on the system daily and cannot tolerate a long freeze or a risky cutover.",
          "Problems are concentrated in specific areas, such as an aging frontend, outdated dependencies, or a slow reporting module.",
          "The data model still fits the business reasonably well.",
        ],
      },
      {
        title: "Consider a rewrite when",
        items: [
          "The platform or language is no longer supported and cannot be upgraded incrementally.",
          "The data model fundamentally conflicts with how the business now operates.",
          "The system is small enough that rebuilding is cheaper than understanding it.",
          "Nearly every part of the application would need to change to meet current requirements.",
        ],
      },
    ],
    closing:
      "Often the right plan is a mix: keep and harden the core, replace the parts that are beyond repair, and sequence the work so value is delivered along the way.",
  },
  fit: {
    heading: "When modernization makes sense",
    items: [
      "A business-critical application has become slow, fragile, or difficult to change, but still does important work well.",
      "Framework or dependency upgrades have been deferred long enough that they now feel risky or impossible.",
      "You are weighing a full rewrite and want an informed second opinion before committing to it.",
      "Onboarding new developers takes too long because the codebase lacks tests, documentation, or a clear structure.",
      "The interface needs a modern experience, but the backend and data should stay in place.",
    ],
  },
  evidence: [
    {
      title: "Healthcare platform modernization",
      body: "I contributed to the modernization of an enterprise healthcare application, including a Vue-to-Nuxt migration, GraphQL integration, real-time communication, telemetry, and administrative workflows, all while the platform remained in active use.",
    },
    {
      title: "Mature Rails applications",
      body: "I have built and maintained multiple Ruby on Rails applications backed by Postgres and ActiveRecord, including integrating Vue and React frontends into established Rails codebases.",
    },
  ],
  related: ["software-architecture", "technical-strategy", "dev"],
  cta: {
    heading: "Have an application that's holding you back?",
    body: "Describe the system, what it does well, and where it hurts. We can discuss whether targeted modernization, a staged migration, or a rewrite makes the most sense.",
  },
};

export default legacyAppModernization;
