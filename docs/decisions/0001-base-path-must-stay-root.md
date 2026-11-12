# 0001 — Keep Vite `base` at `/`

**Status:** Accepted
**Date:** 2026-11-04

## Context

This site is deployed to GitHub Pages from the repo `yashs3090/yashs3090.github.io`.

GitHub Pages has two repo types, and they serve from different paths:

| Type | Repo name | Served at | Correct `base` |
|---|---|---|---|
| **User page** (this one) | `<username>.github.io` | domain root | `/` |
| Project page | anything else | `/<repo-name>/` | `/<repo-name>/` |

Nearly every Vite + GitHub Pages tutorial, blog post, and LLM answer assumes a *project*
page and instructs you to set `base: '/repo-name/'`. That advice is wrong here.

## Decision

`base` stays at its default `/` in `vite.config.ts`, with an inline comment explaining why.

## Consequences

- Built asset paths are root-relative (`/assets/index-abc123.js`), which is what Pages serves.
- **If someone sets `base: '/yashs3090.github.io/'`, the site breaks:** every asset request
  resolves to `/yashs3090.github.io/assets/...`, which doesn't exist. The page renders blank
  with a console full of 404s.
- **The build still passes.** This failure appears only in the deployed site, which makes it
  disproportionately expensive to diagnose. Hence this ADR and the inline comment.
- Verification: after `npm run build`, asset paths in `dist/index.html` must start with
  `/assets/`, not `/yashs3090.github.io/`.

## Alternatives considered

- **`base: './'` (relative paths)** — works, and is more portable across hosting paths. Rejected
  because relative paths interact badly with client-side routing: assets resolve against the
  current URL, so `/resume` would request `/assets/...` relative to `/`, but a nested route like
  `/projects/foo` would request `/projects/assets/...`. Root-relative is unambiguous.
- **Moving to a project page repo** — would require a `base`, and gives a worse URL. No upside.
