# 0004 — Build and deploy in GitHub Actions, publishing only `dist/`

**Status:** Accepted
**Date:** 2026-11-04

## Context

The original plan listed "automated deployment via GitHub Actions" as a *future enhancement*
and described day-one deployment as "push repo to GitHub, deploy to Pages."

That doesn't work. This is a Vite app: the deployable artifact is the output of `vite build`.
GitHub Pages is a static file server — it will not run a build for you. Pushing source to a
branch and pointing Pages at it serves raw `.tsx` files, not a website.

There are only two real options: build in CI, or build locally and commit the output.

A second, separate concern: **Pages branch-serving publishes the entire branch.** With
"deploy from branch / root", everything in the repo becomes a public URL — `CLAUDE.md`,
`agents/plan.md`, `resume.md`, `docs/`. The repo is public anyway, so this isn't a secrets
leak, but it's sloppy and it puts working notes on the production domain.

## Decision

Pages source is set to **GitHub Actions**. `.github/workflows/deploy.yml` runs on push to
`main` and on `workflow_dispatch`:

checkout → setup-node (20, npm cache) → `npm ci` → `npm run build` →
`cp dist/index.html dist/404.html` → `upload-pages-artifact` → `deploy-pages`

Only the `dist/` artifact is uploaded, so only built output is ever public.

## Consequences

- `main` is the deploy trigger. A failed build means no deploy, so a broken `main` can't take
  the live site down.
- `npm ci` requires `package-lock.json` to be committed and in sync with `package.json`. If
  they drift, CI fails with a lockfile error — run `npm install` and commit the result.
- Repo-internal files (`docs/`, `agents/`, `CLAUDE.md`) are never served. To publish something
  publicly, it goes in `public/`.
- Deploys need `permissions: { pages: write, id-token: write }` on the job. Omitting these is
  the most common cause of a deploy step failing with an opaque permissions error.
- No manual deploy path, and that's intentional — hand-deploys are how a local-only change
  reaches production unreviewed.

## Alternatives considered

- **Commit `dist/` to a `gh-pages` branch** (via the `gh-pages` package) — works, no Actions
  needed. Rejected: build output in git means noisy diffs, merge conflicts in minified bundles,
  and a repo where the deployed thing can silently diverge from the source.
- **Deploy from `main` root, no build step** — would require abandoning Vite/React for
  hand-written HTML. Viable for a simpler site; rejected given the plan's scope.
