# Engineering report — V4 synchronization

**Assessment date:** 27 November 2026

**Repository:** `Alliance2k2/professional-portfolio`

**Development branch:** `codex/portfolio-v4-performance`; PR target: `main`.

Reviewed commits: `4dccf29` contains the existing V4 implementation; `c2e5d8b` contains the assistant corrections, approved caption, local-artifact exclusions and expanded validation. Documentation is recorded in a separate follow-up commit. Publishing this branch requests review only; no force push or merge is part of this task. GitHub CI and Vercel preview results must be checked on the PR before release.

## Current audit and preservation

Fetched GitHub before editing. `origin/main` was `95b9633`, the merged V3 PR #1; local HEAD was `4dccf29`, one commit ahead and zero behind. V4 was already implemented, so no redesign or recreation was needed. The only tracked working changes at entry were the approved homepage caption and generated development route imports in `next-env.d.ts`. Local `main` was behind GitHub; it was not reset or rewritten.

Reviewed untracked paths: repository inventories/README exports, original analytical chart exports and CSV summaries, browser review images/check scripts, Python preparation scripts, a contact sheet and an application work-sample PDF. These are retained locally and excluded using explicit ignore rules. Inaccessible `.pdf-deps` package directories were not read or altered; they are document-tool dependencies excluded from publication. No private PDF, raw CSV export or machine-specific preparation script is included in the reviewed commits. The generated `next-env.d.ts` remains outside the commit.

The V4 baseline adds eight project records, consistent original-image previews, per-project screenshots/charts with provenance, dedicated Work/Research pages, a concise portrait homepage, an enlargeable gallery, an on-demand assistant panel and expanded retrieval evaluations. The approved portrait caption is “Data. Research. Real-world impact.” / “Turning complex questions into useful solutions.”

## Corrections in this review

- Kept each project's architecture flow together in the assistant index and prioritized architecture sentences for architecture questions, fixing contextual follow-ups that omitted the documented stack.
- Prioritized relevant quantity-bearing sentences for count questions, fixing an erroneous abstention on the documented 13-country analysis. Added an explicit regression test.
- Joined education labels to their qualification/institution and removed duplicate excerpt sentences, fixing the education follow-up failure discovered in the full browser suite. Added a unit regression.
- Added task-manager detail-page coverage to the existing desktop/mobile route checks.
- Scoped lint away from preserved local document tooling and review artifacts.
- Included the separate held-out evaluation command in GitHub Actions.
- Updated README and roadmap to describe observed V4 behavior and distinguish historical V3 measurements from current validation.

## Security review

Checked tracked text for common GitHub/OpenAI/AWS token formats, private-key headers and credential-bearing URLs without printing possible secret values. No matches were found. `.env.example` contains empty configuration placeholders; no real environment file is tracked. Reviewed the public asset inventory and existing provenance captions: public assets consist of portrait, application images, aggregate analytical figures and labeled diagrams. No private PDF or raw research export is staged. This is a targeted repository review, not a guarantee that every possible secret format is detectable or an independent disclosure review of the underlying research.

## Current validation

| Check | V4 result |
| --- | --- |
| Lint | `npm run lint` passed. |
| Type checking | `npm run typecheck` and production-build TypeScript passed. |
| Unit suite | `npm test`: 20 passed across 2 files. |
| Held-out evaluation | `npm run evaluate:assistant`: 1 reporting test passed; quality metrics below. |
| Production build | `npx next build --webpack` passed, generating 28 page-data entries. |
| Browser suite | `PLAYWRIGHT_CHANNEL=msedge npm run test:e2e`: all 12 desktop/mobile tests passed (1.9 minutes). |
| Dependency review | `npm audit`: 0 vulnerabilities, including development dependencies. |
| Patch hygiene | `git diff --check` passed. |

The held-out set contains 65 cases (42 supported and 23 expected abstentions). Top-one retrieval and citation correctness were 90.48%, Recall@3 97.62%, MRR 0.9365, abstention accuracy 100%, and valid citation rate 100%. Measured response latency was p50 1.65 ms / p95 7.86 ms on this machine under concurrent browser testing; these are not user-facing or production latency guarantees. Four cases selected a different page than expected (thesis publication status, authentication security, flagship geospatial tools and thesis DOI). The reporting test does not enforce perfect ranking. These are remaining retrieval-quality limitations, not independently validated factual-answer accuracy. The held-out cases were not used to tune the fixes in this review.

Windows subprocess restrictions require permitted execution for Node workers. The installed Edge channel is used for Playwright because the bundled Chromium executable is absent. Production validation uses Webpack after the default Turbopack build stalled in the earlier session. No package upgrade or website redesign was needed. The historical report that follows is retained for provenance; its scores and deployment statements describe the earlier V3 task only.

## Historical engineering report — V3

**Assessment date:** 26 November 2026

**Branch:** `codex/portfolio-v3-premium`

**Production state:** V3 has not been pushed or deployed. The existing public production version is unchanged.

## Repository audit

The V3 work preserves the existing Next.js App Router application and its established routes, project content, local theme, contact fallback, reviewed-MDX workflow, sitemap, and GitHub repository section. The branch starts from `main`/`origin/main` at `62392a9`. The seven project records and two research records remain content-driven; optional details appear only when supported by reviewed material.

The root `npm ci` could not replace an existing `lightningcss` native module because Windows reported `EPERM` while unlinking that file. No running user processes were stopped. To avoid validating a partial install, I created a clean ignored copy at `.v3-validation`; `npm ci` completed there with 632 packages installed and `npm audit` reported zero vulnerabilities. All checks below ran from that clean copy. The generated `next-env.d.ts` change and the pre-existing untracked `AGENTS.md` were excluded from the V3 commit.

## Implemented

- Reworked the homepage, typography, navy/teal palette, dark/light presentation, IA favicon, recruiter calls to action, responsive navigation, cards, focus styles, reduced-motion behavior, and portrait layout.
- Made financial analytics a professional interest and baking a personal interest.
- Gave all seven projects descriptive titles and preserved their creative titles as subtitles. Added a reusable evidence-aware case-study component and optional contribution, duration, objective, method, result, architecture, gallery, repository/demo, limitation, lesson, challenge, and future-work fields. CS-IRCFS is the flagship case study.
- Inspected the public CS-IRCFS repository and added its three existing screenshots. Each caption identifies their values as synthetic. The other projects do not claim unreviewed screenshots, results, or live demos.
- Extended research records and pages for abstracts, methods, equations, figures, downloads, citations, publication status, and interests. No unavailable thesis, unpublished manuscript, DOI, result, or certificate is exposed.
- Replaced keyword matching with in-browser BM25 retrieval over public portfolio content, including chunking, query normalization, synonyms, a relevance threshold, multiple cited pages, follow-up context, reset, suggested questions, and abstention. The retrieval index loads on the first assistant query. It is deterministic local search, not generated or LLM text.
- Added the curated retrieval evaluation and reusable accessible screenshot gallery. KaTeX styles load on research pages rather than the homepage.
- Added nonce-based CSP, required security headers, contact body/field validation, same-origin checks, a honeypot, and fail-closed email behavior. A narrow CSP hash allows the single `color:transparent` style emitted by Next Image; other inline style attributes remain blocked.
- Kept contact email delivery disabled. `CONTACT_RATE_LIMIT_ENABLED` is an operator acknowledgement only; production-wide rate limiting must be configured and verified before delivery is enabled.

## Validation results

| Check | Result |
| --- | --- |
| Clean `npm ci` | Passed in `.v3-validation`; the root install hit the existing Windows file-lock issue described above. |
| `npm run lint` | Passed. |
| `npm run typecheck` | Passed during the final production build. |
| `npm test` | 15 tests passed across 2 files. |
| `npm run build` | Passed; Next.js generated all 27 page-data entries. Portfolio sections and project/research routes use request rendering for per-request CSP nonces. |
| `npm run test:e2e` | 8 tests passed on desktop and iPhone-sized Chromium: routes, 404 behavior, navigation, project search, contact fallback, theme, assistant, CSP nonce, axe, and overflow. |
| `npm audit` | 0 vulnerabilities. |
| Lighthouse console errors | 0 on both final runs. |

The route smoke test waits for the document and visible heading rather than every image. The optional GitHub API can be unavailable without preventing the site from rendering. Playwright and Lighthouse used the installed Chrome channel.

## Responsive screenshots

Before and after full-page homepage captures use the same viewport widths: desktop 1440 px, tablet 768 px, and mobile 390 px. The final screenshots returned HTTP 200, had no browser page errors, and had document widths equal to their viewport widths.

The captures are local, ignored test artifacts (not committed as public content):

- Before: `test-results/portfolio-v3-before/{desktop,tablet,mobile}.jpg`
- After: `test-results/portfolio-v3-after/{desktop,tablet,mobile}.jpg`

## Lighthouse measurements

Lighthouse **13.6.0** ran against the local production build at `http://127.0.0.1:3100/` on 26 November 2026. Desktop used the desktop preset; mobile used Lighthouse's mobile emulation and CPU/network throttling. These are lab measurements of this machine and local server, not field Core Web Vitals or measurements of the deployed site.

| Metric | Desktop | Mobile |
| --- | ---: | ---: |
| Performance | 97 | 73 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 0.5 s | 2.0 s |
| Largest Contentful Paint | 0.5 s | 2.0 s |
| Speed Index | 1.1 s | 3.0 s |
| Total Blocking Time | 130 ms | 1,310 ms |
| Cumulative Layout Shift | 0 | 0 |

The mobile performance score and blocking time remain the main performance limitation. `INP` is not reported by this Lighthouse lab run. The nonce-based dynamic response also prevents back/forward-cache use; this trade-off is documented and should be weighed against a separately validated hash-based CSP before trying to make the content statically cacheable. Raw local Lighthouse JSON is in `test-results/lighthouse-{desktop,mobile}.json` and is not committed.

## Retrieval evaluation

The 18 manually curated in-domain questions produced **15/18 top-one accuracy (83.3%)**, **18/18 Recall@3 (100%)**, and **0.917 mean reciprocal rank**. No case missed its expected page within the top three. Three questions placed another relevant portfolio page first: the MSc topic, citizen-science feedback, and CS-IRCFS architecture queries. This small regression set is not independent or representative evidence of general retrieval quality. The source excerpts and rank-order errors are inspectable in `src/lib/assistant-evaluation.ts` and the test output.

## Security and privacy assessment

The original CV PDF, private phone number, home address, identification details, participant information, API keys, and email credentials are not included. Public contact links appear on the site. Assistant queries stay in the browser and do not call a model provider. No analytics or advertising scripts were added. The contact route does not store messages and responds honestly that messages were not sent while email delivery is disabled.

The CSP nonce and HTML are generated per request; cache layers must preserve the corresponding header/HTML pair. Browser and Lighthouse checks found no CSP console errors. The contact API still needs a verified shared deployment-wide rate limit before any email credentials are enabled. No penetration test or independent review of the linked projects was performed.

## Remaining requirements and deployment readiness

The branch builds and passes its local checks, but V3 is **prepared for review, not deployed**. It has not been pushed, merged, or deployed in this task. After release, run the public production smoke checks in `docs/deployment.md`; the local Lighthouse results do not replace those checks.

Remaining source material includes an approved public-safe CV PDF, reviewed thesis and citizen-science documents, thesis figures/citation details, screenshots or demos for the other six projects, certificate records, and author-reviewed writing. Production email delivery, a verified shared rate limiter, and an optional custom domain also remain unconfigured. No unpublished manuscript or unsupported achievement should be added without review.
