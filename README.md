# Irigenera Alliance — Professional Portfolio

Professional portfolio showcasing my expertise in Data Science, AI, Research and Software Engineering.

A responsive Next.js App Router application with strict TypeScript, Tailwind CSS, structured content, project case studies, research pages, an MDX publishing workflow and a free deterministic portfolio assistant.

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
npm run build
npx playwright install chromium
npm run test:e2e
```

For an existing Windows Edge installation, set `PLAYWRIGHT_CHANNEL=msedge` instead of downloading Chromium. Browser tests start an isolated production server on port 3100 after a production build. They do not send email. CI runs the same checks on Linux.

## Architecture

- `src/app`: server-rendered homepage, shared section routes, project/research/article detail routes, contact Route Handler, metadata, social image, sitemap and robots.
- `src/components`: shared navigation, timeline, footer, project search, assistant and contact form. Client components are limited to interactive areas.
- `src/lib/content.ts`: centralized public profile, CV-derived career/education, skills, project and research content.
- `src/lib/blog.ts`: validates metadata and loads reviewed, non-draft MDX from the repository.
- `src/lib/assistant.ts`: deterministic public-content retrieval with source-page links. No LLM or network access.
- `content/blog`: unpublished draft templates. Public GitHub source includes these outlines; they are not published as authored articles on the website.
- `tests`: content, validation, component and API tests plus desktop/mobile Playwright and axe checks.

The site uses CSS transitions with reduced-motion support rather than adding an animation runtime. No charts are displayed without verified data. The home hero pairs the supplied portrait with an original CSS composition; the flagship illustration is conceptual, not research evidence. No image-generation or paid service is needed.

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

Keep contact delivery disabled until the provider and deployment-wide limiter are configured and verified. Leave `NEXT_PUBLIC_ASSISTANT_ENABLED=true`, or set it to `false` at build time to remove the assistant UI. Review contact behavior, metadata and privacy wording on the hosted site. Lighthouse scores have not been measured and are not claimed.

GitHub repository creation is separate from application deployment. The repository is public and MIT-licensed. Avoid committing private CVs, `.env` files, tokens or participant data.

## Content provenance and limits

Public content is drawn from the supplied CV and development brief. CS-IRCFS and Arrowstack Identity READMEs were inspected through the connected GitHub service on 24 November 2026. Their implementation descriptions are attributed to those sources; their tests were not independently rerun here. No live demo, paper acceptance, employment outcome, research impact or certification document is invented.

Remaining content assets: a public-safe CV PDF, reviewed thesis/manuscript and research figures, reviewed project screenshots and author-approved articles. Production email delivery and deployment-wide rate limiting remain unconfigured; a custom domain is optional. See `docs/engineering-report.md` for verification limits.
