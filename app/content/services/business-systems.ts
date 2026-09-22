import type { ServicePageContent } from "./types";

const businessSystems: ServicePageContent = {
  slug: "business-systems",
  metaTitle: "Business Systems & Integrations | Future Lithics",
  metaDescription:
    "Custom business systems connecting your tools, data, and workflows: internal tools, dashboards, CRM integrations, data sync, and spreadsheet replacement.",
  hero: {
    headline: "Connect the software, data, and workflows your business depends on.",
    lede: "Most businesses run on a patchwork of platforms, spreadsheets, and habits. Business systems work turns that patchwork into a coherent set of tools that fit how your team actually operates.",
  },
  problem: {
    heading: "Operations spread across too many places",
    paragraphs: [
      "As organizations grow, they adopt tools one problem at a time: a CRM for sales, a project tracker for delivery, accounting software, a scheduling app, and a collection of spreadsheets that fill the gaps between them. Each tool is reasonable on its own. Together they create duplicate data, manual reconciliation, and reports that nobody fully trusts.",
      "The spreadsheets deserve particular attention. They often start as a quick fix and gradually become critical infrastructure: shared by many people, edited by hand, and understood by one or two. When they break, work stops.",
      "Business systems work looks at operations as a whole. The aim is not to replace everything, but to connect what works, retire what does not, and build custom pieces only where off-the-shelf tools fall short.",
    ],
  },
  capabilities: {
    heading: "Business systems services",
    intro:
      "Solutions are designed around your existing platforms and the way your team works today.",
    items: [
      {
        title: "Internal tools and dashboards",
        body: "Purpose-built interfaces for the tasks your team performs every day, and dashboards that bring operational data into one place.",
      },
      {
        title: "CRM and operational integrations",
        body: "Connecting CRMs, scheduling, billing, and support platforms so customer and operational data flows where it is needed without manual transfer.",
      },
      {
        title: "Data synchronization",
        body: "Keeping records consistent across systems with clear rules about which platform owns which data and how conflicts are resolved.",
      },
      {
        title: "Workflow management",
        body: "Modeling approval chains, status changes, and handoffs so work moves predictably and nothing waits in someone's inbox.",
      },
      {
        title: "Reporting and analytics",
        body: "Reliable reports and visualizations built on consistent data, so decisions rest on numbers people agree on.",
      },
      {
        title: "Custom software around existing platforms",
        body: "Extending the tools you already pay for with custom applications, plugins, and APIs rather than replacing them wholesale.",
      },
    ],
  },
  spotlight: {
    kind: "steps",
    id: "spreadsheet-replacement",
    heading: "Replacing a spreadsheet-driven process",
    intro:
      "Retiring a critical spreadsheet is less about technology than about understanding the process it quietly supports.",
    steps: [
      {
        title: "Understand the process",
        body: "Document who uses the spreadsheet, what decisions depend on it, and which formulas and conventions encode real business rules.",
      },
      {
        title: "Choose the right home",
        body: "Decide whether the data belongs in an existing platform, a lightweight database with a simple interface, or a custom application.",
      },
      {
        title: "Migrate and validate",
        body: "Move the data, reproduce the rules, and run old and new side by side until the results match.",
      },
      {
        title: "Retire and improve",
        body: "Switch over, archive the spreadsheet, and use the new structure to add validation, history, and reporting that were not possible before.",
      },
    ],
  },
  fit: {
    heading: "When business systems work makes sense",
    items: [
      "Important business processes depend on spreadsheets that are edited by hand and understood by only a few people.",
      "Staff regularly copy information between systems that should be talking to each other.",
      "Leadership lacks a trustworthy, current view of operations without assembling reports manually.",
      "An off-the-shelf platform covers most of your needs, but the remaining gaps are costing real time.",
      "You are adding tools as you grow and want them to form a system rather than a collection.",
    ],
  },
  evidence: [
    {
      title: "Healthcare operational software",
      body: "Work on an enterprise healthcare platform included administrative workflows and telemetry, the kind of operational tooling staff rely on to manage day-to-day activity within a larger system.",
    },
    {
      title: "House Renovation Guide",
      body: "For House Renovation Guide, I restructured a content platform's information architecture and built an interactive renovation ROI calculator, turning scattered information into a structured, usable tool.",
    },
    {
      title: "Reporting and visualization",
      body: "The Tableau dashboards and D3.js charts featured on this site reflect the reporting and analytics work that often completes a business systems project.",
    },
  ],
  related: ["ai-workflow-automation", "data", "technical-strategy"],
  cta: {
    heading: "Ready to untangle your operations?",
    body: "Tell me which tools, spreadsheets, and handoffs are causing the most friction. We can identify where integration, custom tooling, or simplification would have the greatest impact.",
  },
};

export default businessSystems;
