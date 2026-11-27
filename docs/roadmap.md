# Portfolio roadmap

## V4 implementation and review — 27 November 2026

V4 already exists locally in `4dccf29`, based on merged V3 at `95b9633`. The development branch is `codex/portfolio-v4-performance`; release requires PR review and passing GitHub checks before merging into `main`.

- Implemented: concise portrait homepage, dedicated Work/Research navigation, eight project case studies, consistent image previews, original charts and screenshots, and an enlargeable visual gallery.
- Implemented: on-demand assistant panel, expanded development/held-out retrieval evaluation, typo handling and reviewed multilingual query aliases.
- Corrected during synchronization: architecture follow-up excerpts and numeric country-count excerpts; added regression and task-manager route coverage.
- Preserved: latest approved portrait caption, existing source and local work artifacts. Local research exports, private-document candidates and preparation tools are excluded from Git.
- Remaining: independent retrieval assessment, V4 Lighthouse and deployed smoke checks, reviewed public documents, verified contact delivery/rate limiting and author-approved articles.
- No new V4 requirements document was supplied; this status describes observed code and does not claim every possible performance improvement is complete.

## Historical V3 implementation (merged in PR #1)

- Recruiter-oriented homepage, local portrait, IA favicon, dark/light design, responsive navigation and direct contact links.
- Seven descriptive project titles with creative subtitles and a reusable, evidence-aware case-study component.
- Optional project fields for contribution, duration, objectives, technologies, architecture, screenshot galleries, live demos, challenges, lessons, limitations and future improvements.
- CS-IRCFS architecture flow and three repository screenshots with synthetic-data labels.
- Research record schema for abstracts, methodologies, equations, figures, downloads, citations/BibTeX, publication status and research interests.
- Local BM25 portfolio retrieval with chunking, query normalization, weighted synonyms, a relevance threshold, multi-source attribution, follow-up context, reset and abstention.
- A curated assistant retrieval evaluation set and automated measurement.
- Lazy loading of retrieval data and research-only KaTeX styles to reduce homepage work.
- Nonce-based CSP, consistent contact-delivery fail-closed behavior, SEO metadata and a public asset manifest.
- Local production-build Lighthouse measurements and responsive before/after screenshots; see the engineering report.

## Awaiting author or source material

- An approved public-safe CV PDF.
- Reviewed MSc thesis abstract, results, figures, citation and public PDF.
- Approved research summary or documents for the citizen-science library.
- Verified implementation notes, screenshots or demonstrations for six non-CS-IRCFS projects.
- Certificate images or credential URLs; current development entries remain descriptions from the CV.
- Reviewed writing before any blog article is published.
- First-person lessons learned and more detailed individual-contribution notes where project records do not document them.

## Awaiting production configuration or independent validation

- Verified contact-email credentials and deployment-wide rate limiting; email delivery stays disabled until both exist.
- Public production browser smoke checks and V4 Lighthouse measurements after release. The recorded V3 local Lighthouse scores do not cover V4 or the deployed host.
- External evaluation of assistant retrieval on recruiter questions beyond the curated regression set, plus human review of abstentions and source quality.
- Production CSP verification against Vercel caching behavior, and periodic dependency/security review.
- Optional custom domain and its HTTPS/canonical URL configuration.

Do not publish unpublished research, private contact details, certificates or project screenshots unless the relevant source and disclosure are approved.
