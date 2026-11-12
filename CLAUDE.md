# CLAUDE.md

Entry point for AI agents and humans working in this repo. Read this first.

## What this is

Yash Saraiya's personal website, served at **https://yashs3090.github.io**.
React + TypeScript + Vite, deployed to GitHub Pages via GitHub Actions.

It serves **two separate audiences**, and that split drives most structural decisions:

| Audience | Surface | Optimize for |
|---|---|---|
| Recruiters / hiring managers | `/resume` | A 45-second skim. Experience leads. |
| Yash | `/apps` | A link list for personal apps and tools. Not recruiter-facing. **Currently unlinked in the UI** — the route resolves, but nothing navigates to it while the page is a placeholder. |

`/` is a deliberately sparse landing page pending a design pass — **do not add content
sections to it** ([ADR 0007](docs/decisions/0007-landing-minimal-content-on-resume.md)).
All substantive content lives on `/resume`.

When a change would help one audience and hurt the other, say so instead of splitting
the difference.

## Non-negotiable constraints

These exist because GitHub Pages behaves in specific ways. Each one has cost someone
an afternoon somewhere. Do not "fix" them without reading the linked decision.

1. **`base` in `vite.config.ts` MUST stay `/`.** This is a *user* page served from the
   domain root, not a project page. Setting `base: '/repo-name/'` — which almost every
   Vite + Pages tutorial tells you to do — yields a blank page and 404s on every asset.
   → [ADR 0001](docs/decisions/0001-base-path-must-stay-root.md)

2. **`dist/404.html` must stay a copy of `dist/index.html`.** GitHub Pages has no SPA
   fallback, so a direct visit or refresh on `/apps` would 404. The copy step lives in
   the deploy workflow. Removing it silently breaks every deep link — including any URL
   a recruiter was sent.
   → [ADR 0002](docs/decisions/0002-spa-404-fallback.md)

3. **Only `dist/` is published.** Deploying from a branch root would serve the entire
   repo publicly, this file included. The workflow uploads the build artifact only.
   → [ADR 0004](docs/decisions/0004-deploy-via-github-actions.md)

4. **Nothing secret goes in this repo, ever.** It is public, and so is its history. The
   bundle is client-side: there is no such thing as a hidden value here. No tokens,
   credentials, or private URLs.

## Where things live

```
.github/workflows/deploy.yml   build + deploy (owns the 404.html copy step)
agents/plan.md                 the roadmap, phased
resume.md                      source of truth for resume content
docs/                          why the code looks like it does — read before changing shape
  decisions/                   ADRs, numbered, immutable once accepted
  architecture.md              how the app is put together
  conventions.md               code conventions
src/
  routes/                      one file per route
  components/                  presentational, reusable
  content/                     ALL copy and data lives here, typed
  styles/                      tokens.css (theme) + global.css
  lib/                         theme state, hooks
public/                        static passthrough; resume.pdf goes here
```

## The rule that matters most

**Content is data, not JSX.** Every piece of copy — experience bullets, project
descriptions, skills, app entries — lives in a typed module under `src/content/`.
Adding a project means appending to an array. If you find yourself typing prose into a
component, stop and move it to `src/content/`.
→ [ADR 0005](docs/decisions/0005-content-as-typed-data.md)

## Working agreements

- **Write the decision down.** Any non-obvious choice gets an ADR in
  `docs/decisions/`. See [docs/decisions/README.md](docs/decisions/README.md) for the
  format. The point of this repo's docs is that a future agent can recover *why*, not
  just *what*.
- **Both themes, every time.** Three states — System (default), Light, Dark — via the
  header toggle. Check a visual change in both palettes before calling it done, and
  never hardcode a color; use a token from `tokens.css`. Note the dark palette is
  defined **twice** (media query + `[data-theme="dark"]`) and the two must stay in sync.
  → [ADR 0008](docs/decisions/0008-theming-three-states.md)
- **Don't deploy by hand.** Push to `main`; the workflow builds. A failed build means no
  deploy, so `main` stays green.
- **Verify before claiming done.** `npm run build` and `npx tsc --noEmit` both clean.
- **Don't commit or push unless asked.** Deploys are outward-facing.

## Commands

```bash
npm install        # setup
npm run dev        # local dev server
npm run build      # production build to dist/
npm run preview    # serve the built output
npx tsc --noEmit   # typecheck
```

## Current state

Scaffold and deploy pipeline are in place. `/resume` is populated from `resume.md`;
`/` is intentionally sparse; `/apps` is still a placeholder. Not yet pushed, and Pages
has not been pointed at Actions.

See `agents/plan.md` for the phase breakdown and the open decisions still outstanding.
