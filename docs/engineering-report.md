# Engineering report — 24 November 2026

## Executive summary

Created the public `Alliance2k2/professional-portfolio` GitHub repository with the requested description, initialized README and MIT license. Implemented a Next.js portfolio in the supplied Windows workspace. The application works without a database or paid model API. Application hosting is not yet deployed.

## Implemented features

Responsive home page with an original IA monogram, conceptual data/research/engineering hero, flagship project illustration, research highlights, technical toolkit, career timeline, public GitHub repository section, writing status and collaboration invitation.

All requested main sections are implemented: About, Experience, Education, Projects, Research, Skills, Certifications/Professional Development, Blog, Résumé, Contact and Privacy. Five project detail routes and two research detail routes render source notes and verification limits. Unknown routes and unpublished drafts return 404.

Interactive features include project filtering/search, collapsible timeline entries, keyboard-operable responsive navigation, persistent light/dark themes, a local knowledge assistant with source links, and print/save-as-PDF résumé controls. Contact input is validated server-side and displays an honest direct-email fallback when delivery is not configured.

The reviewed-MDX publishing pipeline supports metadata, author/date/category/tags, reading time, code highlighting, mathematical notation, table of contents, related articles and Article schema. Three clearly marked draft outlines remain excluded from the published site.

## Architecture and files

Server-rendered Next.js App Router, React, strict TypeScript and Tailwind CSS. Interactive client components are isolated. No animation or chart runtime was added because the initial release has no verified quantitative visualization requiring one. See `architecture.md` for decisions.

Created `src/app` routes and metadata, `src/components` UI, `src/lib` content/search/validation/MDX modules, `public/icon.svg`, `content/blog` draft outlines, `tests` unit and browser suites, GitHub Actions CI, Next.js/TypeScript/ESLint/Prettier/Tailwind/test configuration, a lockfile, environment template and deployment documentation. Updated the generated README; preserved the generated MIT license.

## Verification

The final production build succeeded and prerendered all main portfolio pages, seven case studies and two research details. `npm run lint`, `npm run typecheck`, and `npm test` passed. Vitest reported 10 tests across one file. `npm run test:e2e`, using installed Microsoft Edge in desktop and iPhone 13 viewports, passed all 8 checks.

Browser verification covered the main routes and project/research details returning HTTP 200, draft articles returning 404, mobile and desktop navigation, project search, the contact fallback, theme persistence, local assistant answers and keyboard focus, and horizontal overflow. Axe checks on the homepage in both themes and on the contact page reported no violations. The final first-screen screenshot checks returned HTTP 200, no JavaScript page errors, and no page overflow at 1440px and 390px widths. `npm audit` reported zero vulnerabilities. `git diff --check` passed.

Initial checks found and fixed an Open Graph image layout error, accessibility contrast and link-label issues, incorrect theme persistence, a local same-origin contact mismatch and small-screen overflow. A dependency audit found an MDX advisory; the affected packages were upgraded and the final audit reported zero vulnerabilities.

## Security assessment

No original CV PDF, private phone number, address, identification number, participant record or secret is included. Public professional email and LinkedIn details come from the CV. Assistant inputs remain in the browser and cannot trigger model calls or access private files. Blog MDX is restricted to trusted reviewed repository content.

The contact route includes schema validation, field lengths, a total post-read body size limit, a honeypot, browser same-origin checking, provider timeout and explicit failure responses. External delivery remains disabled until credentials and verified deployment-wide rate limiting are configured. The enablement flag does not itself implement a limiter. Reverse-proxy request-size limits should also be applied at hosting. There is no claim of penetration testing or complete abuse prevention.

HTTP headers disable framing and MIME sniffing and restrict unnecessary browser permissions. A nonce-based Content Security Policy and production transport/firewall review remain future hardening work.

## Performance assessment

Most routes are statically prerendered; client JavaScript is limited to interactions. GitHub uses a server-side one-hour cache, a short timeout, schema validation and fallback links. No remote fonts, large photos, external trackers, model calls or decorative chart dependencies block the hero. CSS respects reduced motion. Lighthouse targets have not been measured and are not claimed.

## Partially implemented and unverified

- Email delivery integration exists but real delivery and platform rate limiting are unconfigured and untested. The verified default is the direct-email fallback.
- The original supplied CV is not a public download because it contains a phone number; the online résumé prints to PDF.
- No original portrait, reviewed screenshots, thesis figures, thesis PDF, DOI records or certificate documents were supplied. Placeholders and missing-material notes are explicit.
- Research publication status and the production-optimization implementation are not independently verified. Project descriptions state their provenance and limits.
- GitHub live fetching depends on deployment egress and public API limits; failure does not break the site. This portfolio does not independently rerun the linked projects’ tests.
- No reviewed article is published. The MDX infrastructure is implemented; publication awaits author review.
- Native Vercel deployment, real-domain canonical metadata, email-provider behavior and Lighthouse scores are not verified. Local browser results do not establish hosted performance.
- No persistent RAG/vector pipeline is implemented in this portfolio. Alliance AI is labeled as local search.

## Assets and configuration needed

A real portrait, public-safe CV PDF or explicit telephone-disclosure approval, reviewed project screenshots, thesis/manuscript and figures, certification documents if desired, reviewed articles, the final domain, and optional email/provider rate-limit configuration.

## Deployment and next steps

Follow the README to import the repository into Vercel, set Node.js 24 and `SITE_URL`, build a preview and review it before public promotion. Keep email delivery disabled until both provider configuration and shared deployment-wide rate limiting are verified. Validate the actual domain, contact delivery, metadata, privacy wording and Lighthouse scores on hosting. Author review and real source assets are the next content priorities.
