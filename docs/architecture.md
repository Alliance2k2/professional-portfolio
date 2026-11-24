# Architecture decisions

The application uses server components by default and small client components for navigation, theme switching, project filtering, contact, printing and the assistant. The shared `[section]` route renders the finite set of main pages; unknown sections return 404. Explicit nested routes handle case studies, research and reviewed MDX posts.

Public content is a typed source module; no CMS or database is needed initially. Research statuses do not infer publication. MDX is trusted source controlled by the portfolio author. Draft and review flags must both permit publication before an article is routable.

GitHub public repository data is fetched server-side from the official API with a one-hour Next.js fetch cache, a timeout, runtime schema validation and a profile-link fallback on errors and rate limits. No token is required or exposed. API requests do not block the main hero because the section is behind Suspense.

The assistant returns only matching public source entries and links. It never executes instructions, accesses private documents or sends queries to a model. Its simple lexical search is intentionally limited and can abstain. A future retrieval interface can replace `answerQuestion` with an asynchronous adapter returning `{text, href, label}`. Future RAG should implement reviewed-document ingestion, versioned chunks, embeddings, permission-aware vector retrieval, context assembly, source validation and model-generated answers with abstention. That future pipeline is not implemented in this portfolio.

Contact delivery is fail-closed by default. Provider configuration and verified platform rate limiting are prerequisites to enabling external delivery. Raw messages are not logged or stored by the application. Browser same-origin checks are not a substitute for spam protection; the honeypot and validation are supplemental controls.

Security headers prevent framing and MIME sniffing, restrict browser capabilities and limit referrer disclosure. A strict CSP is deferred because Next.js inline hydration scripts need a tested nonce/hash setup; no CSP protection is claimed. Hosting transport, firewall enforcement and service retention policies need production review.
