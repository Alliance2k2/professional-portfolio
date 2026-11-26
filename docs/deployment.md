# Deployment guide

## Production deployment

The portfolio is connected to Vercel and the public GitHub repository `Alliance2k2/professional-portfolio`. The current production URL is [professional-portfolio-three-virid.vercel.app](https://professional-portfolio-three-virid.vercel.app). Pushes to `main` trigger production deployment; preview deployment access remains restricted. The V3 work is prepared on `codex/portfolio-v3-premium` and has not been pushed or deployed as part of this change.

The root `SITE_URL` should be set to the exact HTTPS production origin. This controls canonical URLs, metadata and sitemap output. No custom domain is configured.

## Runtime and checks

Use Node.js 24 and the committed `package-lock.json`:

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm audit
```

Playwright's configured browser must be installed in CI (`npx playwright install --with-deps chromium`) or selected with `PLAYWRIGHT_CHANNEL` for an installed compatible browser. Browser tests build and serve the production bundle on port 3100; they do not send email. In Vercel, inspect deployment build logs and perform the smoke checks below after promotion.

## Security configuration

The site creates a fresh nonce-bearing CSP for each page request. Page rendering is dynamic to support the nonce, and a CDN must preserve the matching HTML/header pair rather than reuse a nonce with different HTML. Confirm the browser console has no CSP violations, that the response includes the same nonce in the policy and framework scripts, and that local portrait/gallery images load.

Contact delivery is intentionally disabled by default. Keep it disabled until a verified sender, server-only `RESEND_API_KEY` and `CONTACT_FROM` values, and deployment-wide rate limiting are configured. `CONTACT_RATE_LIMIT_ENABLED=true` is only an operator acknowledgement; it does not create a limiter. Do not add secrets to GitHub, client-prefixed variables or the public bundle. If shared rate limiting is not available, preserve the direct-email fallback.

`NEXT_PUBLIC_ASSISTANT_ENABLED=false` removes the local assistant UI at build time. The default is free BM25 retrieval in the visitor's browser with no API credential. Do not configure an LLM key in a public client variable.

The site sends no analytics events. Vercel may process operational request logs under its service terms; review those terms and retention settings before deployment changes.

## Post-deploy smoke checks

1. Open `/`, `/projects`, `/projects/cs-ircfs`, `/research`, `/contact`, `/resume`, `/sitemap.xml` and `/robots.txt` without signing in.
2. Check mobile navigation, color-theme control, project search and category filters, case-study source links, assistant sources/reset, and résumé printing.
3. Confirm the CS-IRCFS gallery labels every capture as synthetic demonstration data.
4. Submit a valid contact-form sample and confirm the site states that it was not sent while delivery remains disabled; use the direct email link for actual contact.
5. Inspect page metadata, social image, canonical URL, CSP nonce and security headers in browser developer tools.
6. Run Lighthouse against the deployed production URL after CSP and dynamic rendering are in place. Record the URL, date, device mode and report rather than estimating scores.

## Rollback and release

Review the branch diff and test report before merging. Keep the existing public production version available until the V3 production deployment passes the smoke checks. Vercel deployment rollback is the recovery path; no database migration or stateful service is introduced.
