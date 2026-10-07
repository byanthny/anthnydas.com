# anthnydas.com site audit — 2026-10-06

## Summary

- **Site:** anthnydas.com (Next.js 16 App Router on Vercel, plus the static `public/sports.html` served at `/sports`).
- **Date / baseline:** 2026-10-06, baseline commit `a8c84e6` (main); fixes on branch `claude/site-audits-sports-tracker-216000`.
- **Scope:** security, privacy, SEO, dependencies/tooling, accessibility, performance, code health. Routes: `/`, `/log`, `/log/welcome`, `/sports`.
- **Findings:** 36 total: **3 High, 6 Med, 27 Low**.
- **Fixed in this PR (10):** security headers, 95 of 99 `pnpm audit` advisories (both criticals in `next`), dependency refresh, empty-href anchors, red lint on main, duplicate ESLint configs, `engines`/`.nvmrc`, `.gitignore` gaps, missing 404/error pages, stale `content/README.md`.
- **Recommended (16):** the main ones are the mobile layout padding (High), CI, enforcing the CSP with nonces, and fixing the list nesting.
- **Deferred (10):** HSTS preload (Tony's call), 4 transitive advisories that have no patch yet, major version upgrades, and everything about `/sports`, which moves to `sports.anthnydas.com`.
- **Unchanged on purpose:** HSTS, mobile padding, list nesting, the `byanthny` social handles, and the `/sports` page.

## Method

- **Commands run on baseline `a8c84e6` and on HEAD:** `pnpm install --frozen-lockfile`, `pnpm audit`, `pnpm outdated`, `pnpm lint`, `pnpm build`, and `curl -sI http://localhost:3000/` against `pnpm start` for the response headers.
- **Source checks:** `git grep` across the tracked tree for env vars, secrets, forms, cookies, storage, fonts, images, `<script>` and `<h1>`. Every `file:line` below is as of the commit that adds this report.
- **Lighthouse:** 13.5.0 CLI with headless Chrome against a local production server (`pnpm build && pnpm start`, `http://localhost:3000`). It ran on 4 routes × 2 form factors: mobile is the default (simulated throttling, 412×823) and desktop uses `--preset=desktop`. There were two runs, one before (baseline) and one after (HEAD). Scores are single runs, so treat ±1 as noise.
- **Screenshots:** Playwright `npx playwright screenshot --full-page` at 1440×900 and 375×812 for all 4 routes, before and after. The screenshots are not committed.
- **Visual verification:**
  - `/log`, `/log/welcome` and `/sports` are byte-identical before and after at both widths.
  - On `/` at 1440 and 375 (the 375 pair was pixel-compared), the only difference is that drosophila, pintOS and CoGS no longer have link colour. They render as plain text now (see SEO-2). Layout and page dimensions are identical.
  - `curl /sports` is byte-identical to `public/sports.html`.

## Security

| ID | Severity | Finding | Evidence | Fix | Status |
|---|---|---|---|---|---|
| SEC-1 | High | No security headers were sent. The baseline response had only Next/caching headers. | baseline `curl -sI /` output; headers now set in `next.config.mjs:3-24` | Added `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` and `Content-Security-Policy-Report-Only` on `/(.*)`. Verified on `/` and `/sports`. | Fixed in PR |
| SEC-2 | High | `pnpm audit` found 99 advisories (2 critical, 55 high). 33 of them were in `next` itself, including two unauthenticated RCEs (GHSA-p293-qw3h-jr36, GHSA-2xp9-vwfh-vxw4, fixed in 16.3.3). | `pnpm audit` before/after (Appendix); `package.json:19` | `next` 16.1.3 → 16.4.0 plus `pnpm update` → 4 advisories left | Fixed in PR |
| SEC-3 | Low | The 4 advisories that remain are all transitive with no patched version in range: `braces` (high, dev-only via `eslint-config-next`), `sprintf-js` (moderate, via `gray-matter`, build-time), and `postcss-selector-parser` (moderate, via tailwind and typography, build-time). | `pnpm audit` after (Appendix) | Re-run `pnpm audit` when upstream ships fixes. None of them reach the browser bundle. | Deferred |
| SEC-4 | Med | The CSP is report-only. Enforcing it without `'unsafe-inline'` needs nonces or hashes for the inline JSON-LD blocks and for the inline script in `/sports`. | `app/page.tsx:25-30`, `app/log/[slug]/page.tsx:83-88`, `public/sports.html:1148`; policy at `next.config.mjs:17-20` | Add nonce-based CSP via middleware for App Router pages. `/sports` leaves this repo (see SEO-1). | Recommended |
| SEC-5 | Low | The report-only CSP has no `report-to`/`report-uri`, so violations only appear in each visitor's DevTools console. Nobody collects them. | `next.config.mjs:19-20` | Add a reporting endpoint, or check DevTools on a Vercel preview before enforcing | Recommended |
| SEC-6 | Low | CSP `script-src` allows `https://va.vercel-scripts.com`. `@vercel/analytics` v2 loads `/_vercel/insights/script.js` (same origin) in production and only uses that host for the debug build. | `next.config.mjs:20`; `node_modules/@vercel/analytics/dist/react/index.mjs:80,85` | Re-check the allowed hosts against real report traffic before ever enforcing | Recommended |
| SEC-7 | Low | HSTS is not set in the app config. Vercel sends `Strict-Transport-Security` by default on its domains. Adding `preload` is close to irreversible. | `next.config.mjs:3-24` (no HSTS entry, on purpose) | Leave Vercel's default. Opting into preload is Tony's call. | Deferred |
| SEC-8 | Low | The `X-Powered-By: Next.js` header discloses the framework. | `curl -sI /` before and after | `poweredByHeader: false` in `next.config.mjs` | Recommended |

**Checked, no issue:** `git grep` finds no `process.env`, no secrets, API keys or tokens, no `<form>`/`<input>`, and no `cookie`/`localStorage`/`sessionStorage` anywhere in the tracked source, including `public/sports.html`. `.env` files are now gitignored (DEP-4).

## Privacy

| ID | Severity | Finding | Evidence | Fix | Status |
|---|---|---|---|---|---|
| PRIV-1 | Low | The email address is a plain `mailto:` link, so scrapers can harvest it. | `components/Items.tsx:16` | Optional: obfuscate it or use a contact alias. Low value for a personal site. | Deferred |

**Checked:**
- The only third party is Vercel Analytics (`app/layout.tsx:2,65`). It is cookieless, so no consent banner is needed.
- There are no web fonts, no embeds and no external images.
- The upcoming `sports.anthnydas.com` will add one strictly-necessary auth cookie. That cookie is consent-exempt, so it doesn't need a banner either.

## SEO

| ID | Severity | Finding | Evidence | Fix | Status |
|---|---|---|---|---|---|
| SEO-1 | Med | `/sports` is a static HTML file outside the App Router, served by a rewrite. It has no `og:image` (`twitter:card` is `summary`), and the root `metadataBase`/`robots` metadata does not cover it. | `next.config.mjs:26-31`; `public/sports.html:10-14`; `app/layout.tsx:14,39-49` | Resolved by moving sports to `sports.anthnydas.com` and redirecting `/sports` there. A separate cutover PR will add the redirect and remove the static file. | Recommended |
| SEO-2 | Low | Three project entries (drosophila, pintOS, CoGS) were `<a href="">` dead links back to the same page. | `components/Items.tsx:194,203,211` (now plain text) | Replaced the anchors with text. The visible change is that these 3 lose link colour. | Fixed in PR |
| SEO-3 | Low | `sitemap.xml` lists `/sports`. Once the redirect lands, this would point crawlers at a redirect. | `app/sitemap.ts:19-23` | Remove the entry in the sports cutover PR | Deferred |
| SEO-4 | Low | Log JSON-LD reuses the entry `date` as `dateModified`. | `app/log/[slug]/page.tsx:67-68` | Add an optional `updated` frontmatter field and fall back to `date` | Recommended |

**Checked:**
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, OG image routes and JSON-LD (`app/page.tsx:12-20`, `app/log/[slug]/page.tsx:62-79`) are all present and render. Lighthouse SEO is 100 on every route.
- **The `byanthny` social handles are correct.** They are Tony's real GitHub and LinkedIn handles (`lib/site.ts:18-21`, `components/Items.tsx:30,33`). Only the display name was rebranded. Do not "fix" them.

## Dependencies / tooling

| ID | Severity | Finding | Evidence | Fix | Status |
|---|---|---|---|---|---|
| DEP-1 | Med | The dependencies were stale. See the before→after table below. | `pnpm outdated` before (Appendix); `package.json:15-32` | `pnpm update`, then `next` and `eslint-config-next` pinned to `16.4.0`, and `@vercel/analytics` raised to `^2.0.1` | Fixed in PR |
| DEP-2 | Low | `@vercel/analytics` 1.3.1 → 2.0.1 is a major bump. Both properties below were checked, but runtime behaviour on Vercel can't be verified locally. Locally the script 404s because `/_vercel/insights` only exists on Vercel. | `package.json:17`; `app/layout.tsx:2,65` | Check the Vercel Analytics dashboard after deploy | Recommended |
| DEP-3 | Low | There was no Node version contract. | `package.json:5-7`; `.nvmrc:1` | Added `"engines": { "node": ">=20.9" }` and an `.nvmrc` set to `22` | Fixed in PR |
| DEP-4 | Low | `.gitignore` covered only `.env*.local`, so a plain `.env` or `.env.production` could be committed. | `.gitignore:29-31` | Added `.env` and `.env.production` | Fixed in PR |
| DEP-5 | Low | There were no custom `not-found`/`error` pages, so the site fell back to the Next defaults. | `app/not-found.tsx:1-15`, `app/error.tsx:1-28` | Added both, styled like the site | Fixed in PR |
| DEP-6 | Med | No tests and no CI. Lint was red on main without anyone noticing (CODE-1). | no `.github/`; `package.json:8-13` (no `test` script) | Add a GitHub Actions workflow that runs `pnpm lint && pnpm build` on PRs. It is not added in this PR. | Recommended |
| DEP-7 | Low | `pnpm update` raised the caret floors in `package.json`, for example `"eslint": "^9"` → `"^9.39.5"`. The majors are the same. | `package.json:16-31` | Cosmetic. Keep it, or restore the loose ranges by hand. | Deferred |
| DEP-8 | Low | Majors not taken: react/react-dom 19.3.0, @types/react(-dom) 19.3.0, @types/node 26, eslint 10, tailwindcss 4, typescript 7. | `pnpm outdated` after (Appendix) | Upgrade one at a time in separate PRs. Tailwind 4 is a config migration. | Deferred |

**Versions before → after:**

| Package | Before | After |
|---|---|---|
| next | 16.1.3 | 16.4.0 (exact) |
| eslint-config-next | 16.1.3 | 16.4.0 (exact) |
| @vercel/analytics | 1.3.1 | 2.0.1 (major) |
| next-mdx-remote-client | 2.1.7 | 2.1.12 |
| @types/mdx | 2.0.13 | 2.0.14 |
| @tailwindcss/typography | 0.5.19 | 0.5.20 |
| @types/node | 20.16.1 | 20.19.43 |
| eslint | 9.39.2 | 9.39.5 |
| postcss | 8.4.41 | 8.5.29 |
| tailwindcss | 3.4.10 | 3.4.19 |
| typescript | 5.5.4 | 5.9.3 |
| react / react-dom | 19.2.3 | 19.2.3 (unchanged; `next` 16.4.0 keeps React at 19.2.3) |

**Analytics compatibility check:** `@vercel/analytics` 2.0.1 still exports `Analytics` from `@vercel/analytics/react`, and all of its props are optional. The usage in `app/layout.tsx:2,65` is therefore unchanged.

**Tooling also fixed in this PR:**
- The legacy `.eslintrc.json` is removed (CODE-2).
- `content/README.md` is corrected (CODE-3).

## Accessibility

| ID | Severity | Finding | Evidence | Fix | Status |
|---|---|---|---|---|---|
| A11Y-1 | High | The root layout wraps every page in `px-[25%]`. At 375px that leaves a ~187px content column, about 50% of the width. Log entries add `px-6` inside that, which leaves ~139px. | `app/layout.tsx:61`; `app/log/[slug]/page.tsx:82` | Use `px-6 md:px-[15%] lg:px-[25%]`. Acceptance criteria: no horizontal overflow at 375px, and the content column is at least 300px. Not applied here because it is a visible change. | Recommended |
| A11Y-2 | Med | Invalid list nesting. `<ul>` and `<h2>` sit directly inside `<ul>` throughout the home list, and Lighthouse `list` fails with 9 nodes. Screen readers announce list counts wrongly. | `components/Items.tsx:9-13` (pattern repeats to `:264`) | Nest each sub-`<ul>` inside its parent `<li>`. Not fixed because the global `ul` rule in `app/globals.css:5-7` (padding) would change the rendering. Do it together with a visual check. | Recommended |
| A11Y-3 | Low | Inline links are distinguished by colour only, with no underline. Lighthouse `link-in-text-block` fails with 16 nodes on `/` and 1 on `/log`. | `app/globals.css:9-11`; `components/EntryLink.tsx:10` | Underline links inside text, or use a non-colour cue | Recommended |
| A11Y-4 | Low | `/log`, `/log/welcome` and `/sports` have no `<main>` landmark (Lighthouse `landmark-one-main`). Only `/` has one. | `app/page.tsx:24`; `app/log/page.tsx:23-30`; `app/log/[slug]/page.tsx:82`; `app/layout.tsx:61` | Move `<main>` into the root layout wrapper and drop it from `app/page.tsx` | Recommended |
| A11Y-5 | Low | The `/sports` tooltip `touchstart` handler calls `preventDefault()`, which blocks page scrolling when a swipe starts on a bar. | `public/sports.html:1155-1156` | Resolved by the `sports.anthnydas.com` rewrite | Deferred |
| A11Y-6 | Low | `/sports` timeline headers fail contrast on 8 nodes: `#888` on `#2a2a2a` is 4.04:1 at 8px, and the year at `opacity: 0.7` is 2.73:1. Lighthouse accessibility is 81 on this route. | `public/sports.html:87-94,105-108` | Resolved by the `sports.anthnydas.com` rewrite | Deferred |

**Checked:**
- **Contrast:** secondary text `text-neutral-400` (#a3a3a3) on the `bg-black` body (`app/layout.tsx:59`) is **8.33:1**. That passes WCAG AA for normal text (4.5:1) and large text (3:1), and also AAA (7:1). Body links `text-cyan-500` (#06b6d4) are 8.65:1 and log links `text-cyan-400` are 11.62:1, so both pass.
- **Single `<h1>` per page:** `/` (`app/page.tsx:31`, sr-only), `/log` (`app/log/page.tsx:24`, sr-only), log entries (`app/log/[slug]/page.tsx:90`), 404 (`app/not-found.tsx:6`), error (`app/error.tsx:14`), `/sports` (`public/sports.html:356`).
- `<html lang="en">` is set (`app/layout.tsx:58`).

## Performance

| ID | Severity | Finding | Evidence | Fix | Status |
|---|---|---|---|---|---|
| PERF-1 | Low | Best Practices is 96 on the App Router routes. The cause is console errors from `/_vercel/insights/script.js`, which returns 404 and is served as `text/plain` on localhost. That path only exists on Vercel, so this is a local artifact, but it has not been confirmed in production. | Lighthouse `errors-in-console`, before and after | Re-run Lighthouse on a Vercel preview URL to confirm | Recommended |
| PERF-2 | Low | `/sports` requests `/favicon.ico`, which returns 404. The static file has no icon link, and the App Router `/icon` route doesn't apply to it. | Lighthouse `errors-in-console` on `/sports`; `public/sports.html:4-14` | Resolved by the subdomain move | Deferred |

**Lighthouse before → after** (Performance / Accessibility / Best Practices / SEO; local production server, single runs):

| Route | Form factor | Perf | A11y | BP | SEO |
|---|---|---|---|---|---|
| `/` | mobile | 99 → 99 | 91 → 91 | 96 → 96 | 100 → 100 |
| `/` | desktop | 100 → 100 | 91 → 91 | 96 → 96 | 100 → 100 |
| `/log` | mobile | 99 → 100 | 94 → 94 | 96 → 96 | 100 → 100 |
| `/log` | desktop | 100 → 100 | 94 → 94 | 96 → 96 | 100 → 100 |
| `/log/welcome` | mobile | 100 → 99 | 98 → 98 | 96 → 96 | 100 → 100 |
| `/log/welcome` | desktop | 100 → 100 | 98 → 98 | 96 → 96 | 100 → 100 |
| `/sports` | mobile | 100 → 100 | 81 → 81 | 96 → 96 | 100 → 100 |
| `/sports` | desktop | 100 → 100 | 81 → 81 | 96 → 96 | 100 → 100 |

- **No regressions.** The ±1 changes in Performance are run-to-run noise.
- **What drives the remaining non-100 scores:**
  - Accessibility: A11Y-2, A11Y-3, A11Y-4, A11Y-6.
  - Best Practices: PERF-1 and PERF-2.
- **Already lean:** there are no web fonts (no `next/font`, no Google Fonts), no images (no `<img>`/`next/image`), and the only external script is Vercel Analytics. Every App Router route is prerendered as static.

## Code health

| ID | Severity | Finding | Evidence | Fix | Status |
|---|---|---|---|---|---|
| CODE-1 | Med | **Lint was red on main.** Baseline `pnpm lint` failed with `@next/next/no-html-link-for-pages` on the `<a href="/log">` back link. | baseline `pnpm lint` (was `app/log/[slug]/page.tsx:97`); now `app/log/[slug]/page.tsx:4,98` | Replaced it with `<Link href="/log">`. `pnpm lint` exits 0. | Fixed in PR |
| CODE-2 | Low | Both ESLint configs existed: the legacy `.eslintrc.json` and the flat `eslint.config.mjs` with unused `path`/`__dirname` shims. | `eslint.config.mjs:1-6` | Deleted `.eslintrc.json` and trimmed the flat config to `eslint-config-next/core-web-vitals` | Fixed in PR |
| CODE-3 | Low | The example in `content/README.md` did not match the real frontmatter format, and it referenced a nonexistent `mdx-components.tsx`. | `content/README.md:9-21` | Rewrote the example as YAML frontmatter that matches `types/log.ts:1-7` and `content/welcome.mdx` | Fixed in PR |
| CODE-4 | Low | The home page content is ~250 lines of hardcoded nested JSX, which is hard to edit and is where the invalid nesting (A11Y-2) comes from. | `components/Items.tsx:8-265` | Later: move it to a data file (projects/roles) rendered by a small recursive list component. That also fixes A11Y-2. | Recommended |
| CODE-5 | Low | Log entries are sorted by string comparison of `date`. This works only while every date is ISO `YYYY-MM-DD`. | `lib/log.ts:67-69` | Validate the date format in `readMDXFile`, or compare `Date` values | Deferred |
| CODE-6 | Low | `EntryLink` uses a plain `<a>` for internal `/log/...` links, which causes a full page reload. Lint does not flag it because the href is a template literal. | `components/EntryLink.tsx:10` | Use `next/link` | Recommended |
| CODE-7 | Low | The new 404 and error pages use an unstyled visible `<h1>`. Every other App Router page uses an `sr-only` h1 or a styled title. | `app/not-found.tsx:6`; `app/error.tsx:14` | Match one of the existing patterns | Recommended |

## Recommended next steps

1. Fix mobile padding (A11Y-1): use `px-6 md:px-[15%] lg:px-[25%]` and check at 375px.
2. Add CI (DEP-6): a GitHub Actions workflow that runs `pnpm lint && pnpm build` on every PR.
3. After deploy, confirm analytics still records in the Vercel Analytics dashboard (DEP-2), and re-run Lighthouse on the preview URL (PERF-1).
4. Move `/sports` to `sports.anthnydas.com`. Then, in the cutover PR, redirect `/sports`, delete `public/sports.html` and remove the sitemap entry. This resolves SEO-1, SEO-3, A11Y-5, A11Y-6 and PERF-2.
5. Restructure the home list into data plus valid nesting (CODE-4, A11Y-2), and add link underlines (A11Y-3) and a layout-level `<main>` (A11Y-4) in the same visual pass.
6. Collect CSP reports (SEC-5), prune `script-src` (SEC-6), then move to a nonce-based enforcing CSP (SEC-4).
7. Small cleanups: `poweredByHeader: false` (SEC-8), `next/link` in `EntryLink` (CODE-6), styled 404/error h1 (CODE-7), `dateModified` (SEO-4).
8. Plan the major upgrades one at a time: React 19.3, ESLint 10, Tailwind 4, TypeScript 7 (DEP-8).

## Appendix

### `pnpm audit` — before (baseline `a8c84e6`)

```
99 vulnerabilities found
Severity: 7 low | 35 moderate | 55 high | 2 critical
critical  next  GHSA-p293-qw3h-jr36  Unauthenticated RCE on windows-hosted servers  (>=16.0.0 <16.3.3)
critical  next  GHSA-2xp9-vwfh-vxw4  Unauthenticated RCE in Image Optimization API (AVIF)  (>=16.0.0 <16.3.3)
Advisories by package (top): next 33, brace-expansion 16, js-yaml 8, minimatch 6,
postcss 4, picomatch 4, nanoid 4, sharp 3, postcss-selector-parser 2, flatted 2,
browserslist 2, yaml 1, sprintf-js 1, source-map-js 1, glob 1, cross-spawn 1, ...
```

### `pnpm audit` — after (HEAD)

```
4 vulnerabilities found
Severity: 3 moderate | 1 high
high      braces <=3.0.3            .>eslint-config-next>@next/eslint-plugin-next>fast-glob>micromatch>braces  (no patch)
moderate  sprintf-js <=1.1.3        .>gray-matter>js-yaml>argparse>sprintf-js                                  (no patch)
moderate  postcss-selector-parser   .>@tailwindcss/typography>postcss-selector-parser
          <7.1.6                    .>tailwindcss>postcss-selector-parser                                      (>=7.1.6)
```

### `pnpm outdated` — after (HEAD)

```
Package                 Current   Latest
@types/react (dev)      19.2.8    19.3.0
@types/react-dom (dev)  19.2.3    19.3.0
react                   19.2.3    19.3.0
react-dom               19.2.3    19.3.0
@types/node (dev)       20.19.43  26.6.4
eslint (dev)            9.39.5    10.12.0
tailwindcss (dev)       3.4.19    4.3.3
typescript (dev)        5.9.3     7.0.2
```
