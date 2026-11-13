# 0002 — Serve deep links by copying `index.html` to `404.html`

**Status:** Accepted
**Date:** 2026-11-04

## Context

The site is a client-side-routed React SPA with routes `/`, `/resume`, and `/apps`.

GitHub Pages is a static file server with **no SPA fallback** and no rewrite rules. It maps
URL paths to files on disk. Only `/index.html` exists, so:

- Navigating in-app to `/apps` works — the router handles it, no server request.
- Visiting `https://yashs3090.github.io/apps` **directly** asks Pages for a file at `/apps`.
  There isn't one → 404.
- Refreshing the page while on `/apps` → same 404.

Direct visits are the ones that matter most: a link pasted into LinkedIn, a URL shared with a
recruiter, a bookmark, anything someone types.

Pages does serve `404.html` for unmatched paths. If `404.html` *is* the app, the app boots and
the router reads the URL from `window.location` and renders the right route.

## Decision

The deploy workflow copies the built `index.html` to `404.html`:

```yaml
- name: SPA fallback for deep links (see docs/decisions/0002)
  run: cp dist/index.html dist/404.html
```

Use `BrowserRouter` (clean paths), which this makes safe.

## Consequences

- Deep links and refreshes work on every route.
- **Removing the copy step silently breaks every deep link.** Local dev is unaffected (Vite's
  dev server has its own fallback), the build passes, and in-app navigation still works — so
  the breakage is invisible until someone opens a shared URL.
- Pages returns HTTP 404 with the app's HTML on deep loads. Browsers don't care; it's a minor
  SEO wart on non-root routes. Acceptable at this size.
- Genuinely-unknown paths (`/nonsense`) also boot the app, so the app needs its own NotFound
  route. It has one.
- **Missing static assets return HTML, not a clean 404.** This is the fallback's sharpest
  edge. A request for a file that does not exist — `/resume.pdf`, an `og:image`, a favicon —
  gets `404.html`, which is the app's HTML, served as `text/html`. A `<a download>` link will
  cheerfully save that HTML under the requested filename, producing a "PDF" that will not
  open. This already happened once with the resume download. Anything linked as a static
  file must be gated on the file actually existing (see `site.resumePdfUrl`), because the
  platform will not tell you it is missing.
- The copy must happen after `vite build` and before artifact upload. Order matters.

## Alternatives considered

- **`HashRouter` (`/#/apps`)** — needs no fallback and cannot break this way. Rejected: hash
  URLs look dated on a site whose whole job is to make a professional impression.
- **Pre-rendering / SSG each route to its own file** — the robust fix, and correct if this grows
  real content volume. Rejected for now as disproportionate for three routes; it would mean
  adding a framework (Astro, Next static export) over a Vite SPA.
- **Single page, no routing** — simplest, but gives up `/resume` and `/apps` as linkable URLs.
