// Draft copy for the six service pages; pending owner review before launch.
import aiWorkflowAutomation from "./ai-workflow-automation";
import businessSystems from "./business-systems";
import legacyAppModernization from "./legacy-app-modernization";
import productEngineering from "./product-engineering";
import softwareArchitecture from "./software-architecture";
import technicalStrategy from "./technical-strategy";
import type { ServicePageContent } from "./types";

export const servicePages: Record<string, ServicePageContent> = {
  [productEngineering.slug]: productEngineering,
  [legacyAppModernization.slug]: legacyAppModernization,
  [aiWorkflowAutomation.slug]: aiWorkflowAutomation,
  [softwareArchitecture.slug]: softwareArchitecture,
  [businessSystems.slug]: businessSystems,
  [technicalStrategy.slug]: technicalStrategy,
};

export function getServicePageContent(
  slug: string,
): ServicePageContent | undefined {
  return Object.hasOwn(servicePages, slug) ? servicePages[slug] : undefined;
}
