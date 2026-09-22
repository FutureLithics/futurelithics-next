import type { FullConfig } from "@playwright/test";

const SITE_MARKER = "Future Lithics";

export default async function globalSetup(config: FullConfig) {
  // When Playwright manages its own webServer, globalSetup runs before it starts.
  // Only validate an externally supplied target here.
  if (!process.env.PLAYWRIGHT_BASE_URL) {
    return;
  }

  const baseURL =
    config.projects[0]?.use?.baseURL ?? process.env.PLAYWRIGHT_BASE_URL;

  let response: Response;
  try {
    response = await fetch(`${baseURL}/`);
  } catch {
    throw new Error(
      `Could not reach PLAYWRIGHT_BASE_URL (${baseURL}). ` +
        "Start the Future Lithics dev server first.",
    );
  }

  if (!response.ok) {
    throw new Error(
      `E2E target ${baseURL} returned HTTP ${response.status}. ` +
        "Restart your dev server or run npm run test:e2e without PLAYWRIGHT_BASE_URL " +
        "to let Playwright start an isolated production server on port 3099.",
    );
  }

  const html = await response.text();
  if (!html.includes(SITE_MARKER)) {
    throw new Error(
      `E2E target ${baseURL} is not the Future Lithics site (missing "${SITE_MARKER}"). ` +
        "Another app is likely using that port. Either stop it, set PLAYWRIGHT_BASE_URL " +
        "to your Future Lithics dev server (e.g. http://localhost:3001), or run " +
        "npm run test:e2e to use the dedicated port 3099.",
    );
  }
}
