# Irigenera Alliance — Professional Portfolio

Professional portfolio showcasing my expertise in Data Science, AI, Research and Software Engineering.

A responsive Next.js App Router application with strict TypeScript, Tailwind CSS, structured content, eight evidence-aware project case studies, research records, an MDX publishing workflow and a free local BM25 portfolio assistant.

## Run locally

Requirements: Node.js 24 and npm. On Windows, use `npm.cmd` if execution policy prevents `npm.ps1`.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Copy `.env.example` to `.env.local` if configuring optional services. No paid API or database is required.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run evaluate:assistant
npm run build
npx playwright install chromium
npm run test:e2e
npm audit
```

For an existing Windows Edge installation, set `PLAYWRIGHT_CHANNEL=msedge` instead of downloading Chromium. Browser tests start an isolated production server on port 3100 after a production build. They do not send email. CI runs the same checks on Linux.

## Architecture

- `src/app`: server-rendered homepage, shared section routes, project/research/article detail routes, contact Route Handler, metadata, social image, sitemap and robots.
- `src/components`: shared navigation, timeline, footer, project search, assistant and contact form. Client components are limited to interactive areas.
- `src/lib/content.ts`: centralized public profile, CV-derived career/education, skills, project and research content.
- `src/lib/blog.ts`: validates metadata and loads reviewed, non-draft MDX from the repository.
- `src/lib/assistant.ts`: chunked local BM25 retrieval over public profile, project, research, skill and career content. It returns source links, handles contextual follow-ups, resets locally and abstains on unsupported questions. No LLM or query network access.
- `src/lib/assistant-evaluation.ts`: curated retrieval questions and ranking metrics used by the automated regression test.
- `src/components/project-case-study.tsx`: reusable evidence-aware case-study presentation for all eight projects.
- `src/lib/project-images.ts`: reviewed screenshot and chart metadata, captions and provenance labels.
- `docs/asset-manifest.md`: source and provenance for the portrait, IA icon, generated social card and reviewed project screenshots.
- `content/blog`: unpublished draft templates. Public GitHub source includes these outlines; they are not published as authored articles on the website.
- `tests`: content, validation, component and API tests plus desktop/mobile Playwright and axe checks.

The concise homepage links to dedicated Work and Research pages. Project previews use consistent frames without cropping charts or zooming on hover; case-study visuals can be enlarged. Original charts, application screenshots, diagrams and demonstration data are distinguished in their captions. The assistant panel and retrieval index load on demand. No image-generation or paid service is needed.

## Updating content

Edit `src/lib/content.ts`. Add new projects with a unique slug, factual source note and explicit implementation/verification limits. The detail pages and assistant index derive from this file. Add research entries to `research`. Update `src/app/[section]/page.tsx` for additional page-specific copy.

To publish a blog post, add a matching `<slug>.json` and `<slug>.mdx` pair under `content/blog`. Copy an existing metadata template, write and review the article, then set `reviewed: true` and `draft: false`. The JSON schema requires title, description, ISO date, author, category and tags. Reviewed articles enter the blog index, static parameters, sitemap and related-post lists. MDX supports fenced-code highlighting, GFM, math, heading links, reading time and article structured data. MDX is trusted repository code: never compile visitor-submitted MDX.

The original CV is intentionally excluded because it includes a telephone number. `/resume` supports printing/saving a public-safe résumé as PDF. To add the original download later, first remove private details or explicitly approve public disclosure, place the reviewed PDF in `public/`, and add the real download link. No broken download control is displayed.

## Optional contact delivery

The default form returns HTTP 503 with direct-email instructions and explicitly states that the message was not sent. There is no application message database.

To enable email delivery, configure `RESEND_API_KEY` and a verified `CONTACT_FROM` on the server. Configure and verify deployment-wide rate limiting for POST `/api/contact` before setting `CONTACT_RATE_LIMIT_ENABLED=true`; the flag is an operator acknowledgement, not a rate limiter. On Vercel use a Firewall rate-limit rule (for example, 5 requests per minute per IP); verify available plan support. If unavailable, leave delivery disabled or integrate a shared limiter before enabling it. Do not use per-process memory as a substitute on serverless hosts.

Server-side Zod validation, same-origin browser checks, a honeypot, input-length limits and a provider timeout are implemented. Success means the email provider acknowledged acceptance, not proof of inbox delivery. Resend is optional; direct email works without it. No secret is sent to the client.

## Hosting

The production site is hosted at [professional-portfolio-three-virid.vercel.app](https://professional-portfolio-three-virid.vercel.app). The Vercel project is connected to the public `Alliance2k2/professional-portfolio` GitHub repository; pushes to `main` deploy to production, and preview deployments require Vercel Authentication. No custom domain is configured.

The production `SITE_URL` is set to the HTTPS site origin for canonical metadata and the sitemap. For local builds, use `npm ci` and `npm run build`.

Rendered pages use a nonce-based Content Security Policy. The nonce requires request-time rendering; see [Architecture](docs/architecture.md) for caching and performance implications and [Deployment](docs/deployment.md) for production checks.

Keep contact delivery disabled until the provider and deployment-wide limiter are configured and verified. Leave `NEXT_PUBLIC_ASSISTANT_ENABLED=true`, or set it to `false` at build time to remove the assistant UI. V3 was merged through pull request #1. V4 is implemented on `codex/portfolio-v4-performance` for review against `main`; this work does not merge or deploy it to production. Historical Lighthouse scores describe V3 only; V4 performance has not been measured. See [Engineering report](docs/engineering-report.md) for validation and limitations.

GitHub repository creation is separate from application deployment. The repository is public and MIT-licensed. Avoid committing private CVs, `.env` files, tokens or participant data.

## Content provenance and limits

Public content is drawn from the supplied CV and user-provided development brief. CS-IRCFS and Arrowstack Identity READMEs were inspected through the connected GitHub service. The CS-IRCFS gallery images come from its public repository and are marked synthetic. Project test suites were not independently rerun here. No live demo, paper acceptance, employment outcome, research impact or certification document is invented.

Remaining content assets: a public-safe CV PDF, reviewed public thesis/manuscript and citation details, empirical production-optimization charts, certificate records and author-approved articles. Selected aggregate research figures and project screenshots are included with provenance and limitations. Production email delivery and deployment-wide rate limiting remain unconfigured; a custom domain is optional.

Local work-sample PDFs, research exports, review screenshots, document dependencies and machine-specific preparation scripts are ignored and preserved locally. Commit only reviewed public assets under `public/`; do not add private CVs or raw participant records. On Windows, if Turbopack stalls, `npx next build --webpack` is an alternative production build using the same application source. The full browser suite requires that production build and uses port 3100.

See [Architecture](docs/architecture.md), [Deployment](docs/deployment.md), [Roadmap](docs/roadmap.md), [Asset manifest](docs/asset-manifest.md) and the [Engineering report](docs/engineering-report.md) for implementation evidence and outstanding validation.
