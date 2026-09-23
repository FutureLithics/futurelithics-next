# Future Lithics: Next.js Site

Marketing site for Future Lithics LLC, built with Next.js 15 (App Router), React 19, TypeScript, and SCSS/Bootstrap.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

If the dev server shows intermittent 500s or `ENOENT` errors for `_buildManifest.js.tmp.*` in the terminal, stop the server and run:

```bash
npm run dev:clean
```

That clears `.next/` and `.next-e2e/` and starts fresh. This usually happens when a production build (`npm run build` or `npm run test:e2e`) ran while the dev server was still active. Avoid running builds against `.next/` while `dev` is running; use `npm run test:e2e:dev` to test against your live dev server instead.

If Turbopack reload issues persist after a clean start, try the webpack dev server:

```bash
npm run dev:webpack
```

Other useful commands:

```bash
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint
npx tsc --noEmit     # type check
```

## Testing

The project uses **Vitest** for unit/integration tests and **Playwright** for end-to-end browser tests.

### First-time setup

Install the Playwright Chromium browser once per machine:

```bash
npm run test:e2e:install
```

### Unit tests

Unit and component tests live in `tests/unit/`, which mirrors the structure of `app/`. A test for `app/utils/metadata.ts` lives at `tests/unit/utils/metadata.test.ts`. Import the code under test with the `@/app/...` alias.

```bash
npm run test           # run once
npm run test:watch     # watch mode during development
```

Current unit test areas:

- `tests/unit/service-routes.test.ts`: service data shape, order, and uniqueness
- `tests/unit/content/services/service-pages.test.ts`: service page copy, metadata, and related links
- `tests/unit/utils/`: slug resolution, landing service lookup, and page metadata
- `tests/unit/_components/shared/`: `ServiceCard` and `ServicePageShell` rendering
- `tests/unit/_components/pages/services/ServiceLandingPage.test.tsx`: new service page sections
- `tests/unit/api/mailer/contact-me/route.test.ts`: contact API handler (mocked email)

### End-to-end tests

E2E specs live in `e2e/` and exercise the running app in a real browser.

```bash
npm run test:e2e       # build, start isolated server on :3099, run tests
npm run test:e2e:dev   # run against dev server on :3001 (adjust port if needed)
npm run test:e2e:ui    # interactive Playwright UI
```

To run against a dev server on another port:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3001 npm run test:e2e
```

When `PLAYWRIGHT_BASE_URL` is set, Playwright skips its own `webServer` startup and hits that URL directly.

**Port collision:** `npm run test:e2e` uses port **3099** by default so it does not accidentally hit another local Next.js app on `:3000` (a common cause of all e2e tests failing). If you explicitly set `PLAYWRIGHT_BASE_URL` or `PORT`, the global setup verifies the target page contains "Future Lithics" and fails fast with a clear error when the wrong app is running.

**Dev server safety:** The isolated e2e build uses `.next-e2e/` so it does not corrupt your dev server's `.next/` cache (a common cause of random 500 errors during local development).

Current e2e coverage:

- `e2e/home.spec.ts`: homepage sections and service cards
- `e2e/services.spec.ts`: original service directory pages and 404 handling
- `e2e/new-services.spec.ts`: new service pages, metadata, and navigation
- `e2e/charts.spec.ts`: chart demo pages
- `e2e/contact.spec.ts`: form validation and success/error modals (API mocked)
- `e2e/navigation.spec.ts`: logo link and desktop services menu

### Run everything

```bash
npm run test:all
```

### Test artifacts

Playwright reports and traces are written to `test-results/` and `playwright-report/` (gitignored). After a failed e2e run:

```bash
npx playwright show-report
```

## Project layout

| Path | Purpose |
|---|---|
| `app/` | Next.js App Router pages, components, API routes |
| `app/service-routes.ts` | Service card and navigation data |
| `public/images/` | Static service card and site images |
| `app/content/services/` | Copy for the six new service pages |
| `tests/unit/` | Vitest unit and component tests (mirrors `app/`) |
| `e2e/` | Playwright end-to-end specs |
| `vitest.config.ts` | Unit test configuration |
| `playwright.config.ts` | E2E test configuration |

## Deployment

The site is intended for deployment on [Vercel](https://vercel.com). See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

Required environment variables for the contact form (not committed):

- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `EMAIL_RECIPIENT`
