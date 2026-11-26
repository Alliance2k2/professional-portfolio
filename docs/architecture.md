# Architecture

## Application structure

The site uses the Next.js 16 App Router, React Server Components by default, strict TypeScript and Tailwind CSS. Main profile sections share a finite route; project and research records use nested detail routes. Reviewed MDX is the only article publishing path. Unknown sections, project slugs and unpublished articles return 404.

Client components are limited to navigation and theme switching, project filtering/search, contact interaction, print controls and the local portfolio assistant. GitHub repository information is fetched on the server with a one-hour cache, a timeout, runtime validation and a public-profile fallback.

Public professional content is maintained in `src/lib/content.ts`. The website has no CMS, database, account system, tracking scripts or model API requirement. The original CV is not served because it contains personal contact information that is not approved for publication.

## Project case studies

`Project` records use descriptive titles and retain the original creative title as a subtitle. The typed schema supports source notes, duration, contribution, objectives, technologies, architecture steps, screenshot galleries, methodology, results, repository/demo links, technical challenges, lessons, limitations and future improvements. Optional sections render only when supported content is available. Screenshot items carry a `synthetic` flag so invented demonstration data cannot be mistaken for field results.

`ProjectCaseStudy` is shared by all seven project routes. The CS-IRCFS architecture summary and dashboard captures are attributed to its inspected public repository. The capture captions identify the examples as synthetic demonstration data. No live project deployment is claimed.

## Research records

Research entries support abstracts, methods, equations, figures, downloads, APA/BibTeX citation data, publication status and research interests. KaTeX renders reviewed TeX with `trust: false`; its stylesheet is loaded with research pages instead of the homepage. The current malaria and citizen-science records contain only supplied, reviewed summary material. No thesis PDF, manuscript, figure, DOI or publication status has been invented or exposed.

## Local assistant retrieval

`src/lib/assistant.ts` builds a public-only index from profile, contact, work history, education, skills, development, projects, research and interests. It normalizes and chunks text, applies BM25 with weighted synonyms and a minimum relevance threshold, ranks up to three distinct source pages, and abstains below that threshold. Queries remain in the visitor's browser; no external service or persistent conversation store is used. Answers are retrieved portfolio excerpts, not LLM-generated prose.

The chat supports suggested and contextual follow-up questions, source links, a bounded transcript and a reset action. Its BM25 index is dynamically imported only when a visitor asks a question. `src/lib/assistant-evaluation.ts` contains a fixed, manually curated set of 18 questions; its test reports top-one accuracy, Recall@3, mean reciprocal rank and abstentions. This small in-domain set is a regression check, not an independent or representative quality study. See the engineering report for measured results and failure cases.

A future server-side answer provider can be added behind a typed adapter after security, evidence and privacy review. The shipped default stays deterministic and local.

## Security and privacy

`src/proxy.ts` creates a fresh nonce for each rendered page and enforces a Content Security Policy. The root layout and reviewed article JSON-LD attach the request nonce to their inline data/script elements; Next.js receives the policy on the request so its framework scripts can be nonced. The CSP blocks third-party script, frame and object sources. It allows only same-origin scripts, styles, images, connections and fonts, with `unsafe-eval` only in development. `style-src-attr` permits one SHA-256-hashed `color:transparent` attribute emitted by Next Image while its image is loading; arbitrary inline style attributes remain blocked. Proxy excludes APIs and static/image assets from per-page nonce handling.

Nonce-based CSP requires request-time rendering. Reading request headers in the root layout makes the portfolio pages dynamically rendered rather than statically prerendered; deployment caches must not reuse a response nonce with unrelated HTML. This is an intentional CSP/performance trade-off and should be revisited only with a verified hash-based static policy.

Contact delivery is fail-closed. The route validates content type, same-origin request, body size, fields and a honeypot; it returns an explicit undelivered response unless provider credentials and the operator acknowledgement flag are set. The flag does not implement rate limiting. Email delivery must remain disabled until credentials and deployment-wide rate limiting are configured and verified. No contact message database or message logging is used. Direct email remains available.

Privacy text describes browser-local theme and assistant state, server-side GitHub fetching, hosting logs and optional email delivery. There is no analytics or advertising tracker.

## Accessibility and presentation

The site supports keyboard navigation, visible focus, reduced-motion preferences, an accessible mobile menu, a transcript with source links, semantic project/research figures and dark/light themes. CSS handles layout and subtle entry/hover transitions; no animation runtime is installed. Supplied local photographs and reviewed project screenshots use Next image optimization. Synthetic CS-IRCFS data is labelled at each figure.

## Validation

Vitest covers content, retrieval, contact boundaries and components. Playwright runs desktop Chrome and iPhone-sized Chromium with axe checks and route, navigation, search, theme, assistant, CSP and contact-fallback coverage. `npm run build` and Lighthouse measurements are maintained in `docs/engineering-report.md`; no score is published without a completed measurement.
