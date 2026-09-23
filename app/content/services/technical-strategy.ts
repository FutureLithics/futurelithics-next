import type { ServicePageContent } from "./types";

const technicalStrategy: ServicePageContent = {
  slug: "technical-strategy",
  metaTitle: "Technical Strategy & Roadmapping | Future Lithics",
  metaDescription:
    "Technical strategy consulting: discovery, technology evaluation, build-versus-buy analysis, modernization planning, codebase assessments, and roadmaps.",
  hero: {
    headline: "Turn business objectives into a practical technical plan.",
    lede: "Technical strategy connects what the business needs to accomplish with what its software, team, and budget can realistically support. The result is a candid, plain-language plan you can execute, not a list of aspirations.",
  },
  problem: {
    heading: "Goals without a technical path",
    paragraphs: [
      "Leaders often know where they want the business to go: a new product line, a better customer experience, faster operations, or an acquisition. What is less clear is how the technology gets there. Should the existing system be extended or replaced? Is it better to build, buy, or integrate? What should happen first, and what can wait?",
      "Without clear answers, organizations tend to make technical decisions reactively: choosing tools because a vendor called, starting rewrites because frustration peaked, or hiring before knowing what the team needs to build.",
      "Technical strategy provides those answers. It grounds decisions in the current state of your systems and the constraints you actually face, then sequences the work so each step creates value.",
    ],
  },
  capabilities: {
    heading: "Strategy services",
    intro:
      "Engagements can be broad or focused on a single decision, depending on what you need to move forward.",
    items: [
      {
        title: "Technical discovery",
        body: "Structured conversations with leadership and the people closest to the work, plus a review of existing systems, to understand goals, constraints, existing technology, and the problems worth solving first.",
      },
      {
        title: "Architecture and technology evaluation",
        body: "Comparing frameworks, platforms, and hosting approaches against your requirements, team skills, and long-term costs.",
      },
      {
        title: "Modernization planning",
        body: "Assessing aging systems and defining a staged plan for improving or replacing them without disrupting operations.",
      },
      {
        title: "Build-versus-buy analysis",
        body: "Weighing custom development against commercial products and integrations, including total cost of ownership and lock-in risk.",
      },
      {
        title: "Product technical planning",
        body: "Translating a product vision into scoped releases, technical milestones, and realistic timelines.",
      },
      {
        title: "Codebase assessment and technical due diligence",
        body: "Reviewing code quality, architecture, security posture, and maintainability for internal planning, investment, or acquisition decisions.",
      },
    ],
  },
  spotlight: {
    kind: "steps",
    id: "discovery-engagement",
    heading: "Starting point: Technical Discovery & Roadmapping",
    intro:
      "A focused, fixed-scope engagement for organizations that need clarity before committing to a larger project.",
    steps: [
      {
        title: "Kickoff and goals",
        icon: "bullseye",
        body: "Align on business objectives, constraints, timelines, and the decisions the roadmap needs to support.",
      },
      {
        title: "Current-state review",
        icon: "magnifying-glass",
        body: "Examine existing systems, code, data, and workflows, and talk with the people who use and maintain them.",
      },
      {
        title: "Options and tradeoffs",
        icon: "scale-balanced",
        body: "Identify viable paths forward and compare them on cost, risk, time to value, and long-term maintainability.",
      },
      {
        title: "Roadmap and recommendations",
        icon: "route",
        body: "Deliver a prioritized, phased plan written for both technical and non-technical readers, with clear next steps that your team (or I) can begin executing.",
      },
    ],
    deliverables: [
      "A written summary of current systems, risks, and opportunities",
      "Evaluated options with a recommended direction",
      "A phased roadmap with priorities and dependencies",
      "A review session to walk through findings and answer questions",
    ],
  },
  fit: {
    heading: "When technical strategy makes sense",
    items: [
      "You have clear business goals but are unsure what technology changes they require or in what order.",
      "A major decision is pending, such as a rewrite, platform change, or significant vendor purchase, and you want an independent assessment first.",
      "You are planning to hire engineers or engage a development partner and want to define the work before you do.",
      "You are investing in or acquiring a software business and need a candid review of its codebase and architecture.",
      "Past technology initiatives stalled, and you want to understand why before starting the next one.",
    ],
  },
  evidence: [
    {
      title: "Product planning",
      body: "Bringing QuietMetric from concept to production required the same work a strategy engagement involves: defining scope, evaluating technologies, choosing an architecture, and sequencing releases.",
    },
    {
      title: "Modernization planning",
      body: "Experience with enterprise healthcare modernization and long-lived Rails applications informs how I assess aging systems and plan staged improvements that keep production stable.",
    },
  ],
  related: ["software-architecture", "product-engineering", "legacy-app-modernization"],
  cta: {
    heading: "Need a clear technical direction?",
    body: "Share the goals you are working toward and the decisions in front of you. We can discuss whether a Technical Discovery & Roadmapping engagement is the right place to start.",
  },
};

export default technicalStrategy;
