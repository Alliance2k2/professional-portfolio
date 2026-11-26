# Portfolio roadmap

## Implemented in the V3 branch

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
- Public production browser smoke checks and Lighthouse measurements after V3 is deployed. The recorded local Lighthouse scores do not cover the deployed host.
- External evaluation of assistant retrieval on recruiter questions beyond the curated regression set, plus human review of abstentions and source quality.
- Production CSP verification against Vercel caching behavior, and periodic dependency/security review.
- Optional custom domain and its HTTPS/canonical URL configuration.

Do not publish unpublished research, private contact details, certificates or project screenshots unless the relevant source and disclosure are approved.
