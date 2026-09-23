import type { ServicePageContent } from "./types";

const productEngineering: ServicePageContent = {
  slug: "product-engineering",
  metaTitle: "Product Engineering Services | Future Lithics",
  metaDescription:
    "Product engineering from discovery and MVP to production launch and iteration, with senior ownership of the technical path from idea to reliable software.",
  hero: {
    headline: "From idea to production-ready software.",
    lede: "Product engineering means owning the whole technical path: understanding what the product needs to do, deciding how to build it, shipping it, and keeping it healthy after launch. It starts with understanding the people the product serves and depends on clear communication and sound judgment at every step. I work as a hands-on engineer who takes responsibility for the outcome, not just the next ticket.",
  },
  problem: {
    heading: "Tickets aren't what defines a product",
    paragraphs: [
      "Many teams can describe what they want to build but lack someone who can turn that description into a working, maintainable system. Work gets divided into tasks, handed to whoever is available, and assembled late. The result often runs, but it is hard to change, hard to deploy, and nobody is quite sure why it was built the way it was.",
      "Early-stage founders face a version of the same problem. An MVP needs to be small enough to ship quickly, yet sound enough that the second and third releases do not require starting over. Getting that balance right takes product judgment as much as coding skill.",
      "Product engineering closes that gap. The goal is a system whose scope, architecture, and delivery process all serve the product you are actually trying to build.",
    ],
  },
  capabilities: {
    heading: "What product engineering covers",
    intro:
      "Engagements are shaped around where the product is today. Some start with a blank page; others start with a prototype or an existing codebase that needs direction.",
    items: [
      {
        title: "Product discovery and technical planning",
        body: "Listening closely to users and stakeholders to understand their workflows, frustrations, and constraints, then translating what I hear into a scoped plan with clear priorities and known risks. Discovery ends with decisions, not a slide deck.",
      },
      {
        title: "MVP development",
        body: "Building the smallest version of the product that proves its value, with the foundations (authentication, data model, deployment) done properly so the next release builds on it rather than around it.",
      },
      {
        title: "Frontend, backend, and data engineering",
        body: "Full-stack delivery with an eye for interface design: polished, intuitive frontends built on modern JavaScript and TypeScript frameworks, backed by solid APIs, relational databases, and data-heavy features such as dashboards and interactive visualizations.",
      },
      {
        title: "Architecture and integrations",
        body: "Choosing a structure that fits the product's size and trajectory, and connecting it cleanly to payment providers, analytics, identity services, and the other platforms it depends on.",
      },
      {
        title: "Accessibility, security, and compliance",
        body: "Interfaces that follow WCAG accessibility guidelines, secure authentication and data handling, and early attention to regulatory requirements such as HIPAA, so these qualities are designed in rather than bolted on later.",
      },
      {
        title: "Deployment, iteration, and maintainability",
        body: "Repeatable builds, automated tests, and a routine release process, followed by measured iteration after launch. Readable code and documented decisions keep the product easy to hand to a growing team, or to keep with me.",
      },
    ],
  },
  spotlight: {
    kind: "steps",
    id: "product-process",
    heading: "How a product engagement typically runs",
    intro:
      "Every product is different, but most engagements move through the same four stages. Each one produces something you can review before committing to the next.",
    steps: [
      {
        title: "Discover",
        icon: "lightbulb",
        body: "Map the problem, users, and constraints by talking with the people involved. Agree on what the first release must do and, just as importantly, what it will not do.",
      },
      {
        title: "Plan",
        icon: "clipboard-list",
        body: "Define the architecture, data model, and delivery milestones. Identify the riskiest assumptions and decide how to test them early.",
      },
      {
        title: "Build and ship",
        icon: "rocket",
        body: "Deliver in small, working increments with regular demos and plain-language progress updates, so you always know where things stand and course corrections are cheap.",
      },
      {
        title: "Iterate",
        icon: "arrows-rotate",
        body: "Use real usage and feedback to decide what matters most, pay down shortcuts deliberately, and keep the system ready for the next stage of growth.",
      },
    ],
  },
  fit: {
    heading: "When product engineering makes sense",
    items: [
      "You have a validated idea or a clear internal need and want one accountable engineer to take it from concept to production.",
      "An existing prototype proved the concept, but it was never built to support real users, real data, or ongoing development.",
      "Your team is strong on product and domain knowledge but needs senior technical ownership, and someone who can explain architecture and delivery tradeoffs in plain terms.",
      "Previous development produced features without a coherent system, and you want the next phase to be planned rather than improvised.",
      "You need a data-intensive product for analytics, reporting, or visualization, where interface quality and data handling both matter.",
      "Your product handles sensitive or regulated data and needs accessibility, security, and compliance considered from the first release.",
    ],
  },
  evidence: [
    {
      title: "QuietMetric",
      body: "I designed and engineered QuietMetric, a privacy-first analytics product. The work spanned product definition, data-intensive interfaces, AI-assisted insights, and the production infrastructure needed to run it reliably: the full product engineering lifecycle in a single project.",
      links: [{ label: "QuietMetric", href: "https://quietmetric.com/" }],
    },
    {
      title: "Interactive data visualization",
      body: "The D3.js chart library on this site, with bar, line, pie, and network charts, reflects the frontend and data engineering work that often sits at the center of analytics-oriented products.",
      links: [{ label: "Data Visualization", href: "/services/data-viz" }],
    },
  ],
  related: ["software-architecture", "dev", "ux"],
  cta: {
    heading: "Have a product you want to build?",
    body: "Tell me where the product stands today, whether it's an idea, a prototype, or a codebase that needs direction, and we can talk through a practical path to production.",
  },
};

export default productEngineering;
