import type { ServicePageContent } from "./types";

const aiWorkflowAutomation: ServicePageContent = {
  slug: "ai-workflow-automation",
  metaTitle: "AI & Workflow Automation | Future Lithics",
  metaDescription:
    "Automate repetitive work and connect business systems with practical workflow automation and AI-assisted processes, with human review where judgment matters.",
  hero: {
    headline:
      "Automate repetitive work. Connect your systems. Keep people in control where judgment matters.",
    lede: "Good automation removes tedious, error-prone steps from everyday work. Sometimes that involves AI; often it does not. The goal is a dependable process, not a demonstration of the newest tool.",
  },
  problem: {
    heading: "Too much work moves by hand",
    paragraphs: [
      "In many organizations, information arrives in one system and has to be retyped, copied, or reformatted into another. Emails are read and forwarded, documents are opened and summarized, and spreadsheets are updated from other spreadsheets. Each step is small, but together they consume hours every week and introduce avoidable mistakes.",
      "At the same time, there is pressure to “add AI” without a clear sense of where it helps. Language models are genuinely useful for reading unstructured text, classifying requests, and drafting responses. They are also probabilistic, which makes them a poor fit for tasks that demand exact, repeatable results. For many workflows, a well-designed rule, integration, or scheduled job is cheaper, faster, and more reliable than any model.",
      "Effective automation starts with the workflow itself: what comes in, what decisions are made, what must be recorded, and who needs to be involved. The right tools follow from those answers.",
    ],
  },
  capabilities: {
    heading: "Automation capabilities",
    intro:
      "Solutions range from simple integrations to AI-assisted pipelines, and many combine both.",
    items: [
      {
        title: "Workflow automation",
        body: "Connecting forms, inboxes, databases, and business applications so routine handoffs happen automatically, using platforms such as n8n or custom code where more control is needed.",
      },
      {
        title: "AI-assisted processes",
        body: "Using language models for classification, extraction, summarization, and drafting, bounded by clear instructions, validation, and fallbacks when confidence is low.",
      },
      {
        title: "Document and email processing",
        body: "Turning incoming documents and messages into structured data that can be routed, stored, and acted on, instead of read and rekeyed by hand.",
      },
      {
        title: "AI features in existing applications",
        body: "Adding focused capabilities such as search, summaries, suggested responses, and insight generation to software you already run, without rebuilding it.",
      },
      {
        title: "System integration",
        body: "Reliable connections between CRMs, spreadsheets, databases, and third-party APIs, with error handling, retries, and logs that make failures visible.",
      },
      {
        title: "Human-in-the-loop review",
        body: "Designing approval steps where people confirm, correct, or reject automated output before it has consequences, and using those corrections to improve the process.",
      },
    ],
  },
  spotlight: {
    kind: "assessment",
    id: "workflow-assessment",
    heading: "What problem are you trying to solve?",
    paragraphs: [
      "An interactive workflow assessment is being added to this page. It will ask a few questions about a process you want to improve and suggest whether rules-based automation, AI assistance, or a combination is the better fit.",
      "Until it is available, you can describe the workflow in the consultation form below and I will follow up with an initial recommendation.",
    ],
    note: "Please do not include passwords, confidential customer information, or regulated personal data when describing a workflow.",
  },
  fit: {
    heading: "When automation makes sense",
    items: [
      "The same manual steps are performed many times a week, following a pattern that can be described clearly.",
      "Information arrives as emails, documents, or form submissions and has to be sorted, extracted, or re-entered elsewhere.",
      "Several systems hold overlapping data, and staff spend time keeping them in sync.",
      "You want to explore AI but need someone to identify where it adds value and where a simple rule or API call would be more reliable.",
      "Decisions require human judgment, but the preparation and paperwork around them do not.",
    ],
  },
  evidence: [
    {
      title: "QuietMetric",
      body: "QuietMetric, a privacy-first analytics product I designed and engineered, includes AI-assisted insights that turn raw analytics data into readable observations. It is an example of adding a bounded AI feature to a data-driven application.",
    },
    {
      title: "Integrations across the stack",
      body: "Full-stack projects routinely involve connecting applications to external APIs, databases, and third-party services, which is the same foundation reliable automation depends on.",
    },
  ],
  related: ["business-systems", "product-engineering", "data"],
  cta: {
    heading: "Have a process you'd like to automate?",
    body: "Walk me through the workflow: what comes in, what happens to it, and where it slows down. I'll give you an honest view of what can be automated and whether AI belongs in it.",
  },
};

export default aiWorkflowAutomation;
