# Architecture

How the app is put together. For *why* any of it is this way, see
[decisions/](decisions/).

## Shape

A client-side-routed React SPA built by Vite to static files, served by GitHub Pages.
No server, no API, no data fetching at runtime — every byte the visitor sees ships in
the bundle.

```
index.html          inline pre-paint theme script → mounts #root
  └── main.tsx      imports tokens.css + global.css, renders <App>
        └── App.tsx BrowserRouter + shell (SkipLink, Header, main, Footer)
              ├── /         Home      sparse landing
              ├── /resume   Resume    all substantive content
              ├── /apps     Apps      placeholder (unlinked in the UI)
              └── *         NotFound
```

## Layers

| Layer | Directory | Rule |
|---|---|---|
| Routes | `src/routes/` | One file per route. Reads content modules, composes sections. |
| Components | `src/components/` | Presentational. Take props, hold no copy. |
| Content | `src/content/` | All copy and data, typed. The only place prose lives. |
| State/logic | `src/lib/` | Framework-agnostic logic (`theme.ts`) + its hook (`use-theme.ts`). |
| Styles | `src/styles/` | `tokens.css` (variables only) then `global.css` (everything else). |

The dependency direction is one-way: routes → components → content/lib. Nothing in
`content/` or `lib/` imports a component.

## Content modules

Each file in `src/content/` exports its interfaces beside its data, so a content change
and its schema live together:

| Module | Exports | Consumed by |
|---|---|---|
| `site.ts` | `SiteConfig` — name, title, location, email, socials | Home, Resume, Header, Footer |
| `experience.ts` | `Role[]` — 8 roles, newest first | Resume |
| `skills.ts` | `SkillGroup[]` + `primarySkills` | Resume |
| `projects.ts` | `Project[]` — `featured` flag splits the grid from the "Also:" line | Resume |
| `education.ts` | `Education[]` | Resume |
| `apps.ts` | app links | Apps |

Adding content is appending a typed object to an array. No JSX involved.
→ [ADR 0005](decisions/0005-content-as-typed-data.md)

## Routing and the 404 fallback

`BrowserRouter` gives clean paths, which is only safe because the deploy workflow copies
`dist/index.html` to `dist/404.html`. Pages serves `404.html` for any path with no file
behind it, so the app boots and the router reads the URL. **Remove that cp step and every
deep link breaks** — invisibly, since dev and in-app navigation are unaffected.
→ [ADR 0002](decisions/0002-spa-404-fallback.md)

## Styling

Two stylesheets, loaded in order:

1. **`tokens.css`** — custom properties only. Light palette complete on `:root`; dark
   repeated under both `@media (prefers-color-scheme: dark)` (guarded with
   `:not([data-theme='light'])`) and `:root[data-theme='dark']`. The duplication is
   required, and the two blocks must stay in sync.
2. **`global.css`** — reset, element defaults, then component classes. Plain BEM-ish
   naming (`.role__title`), no CSS modules, no CSS-in-JS. Mobile-first: base styles are
   small-screen, `min-width` queries add from there. A `@media print` block at the end
   makes Cmd-P on `/resume` usable.

Components never hardcode a color. Every value comes from a token.
→ [ADR 0008](decisions/0008-theming-three-states.md)

## Theme flow

```
index.html inline script   reads localStorage, sets data-theme before first paint
  └── useTheme()           owns the Theme state ('system' | 'light' | 'dark')
        ├── applyTheme()    sets/removes data-theme, persists to localStorage
        ├── resolveTheme()  resolves 'system' against the media query
        └── matchMedia listener — keeps UI correct if the OS flips mid-session
```

`ThemeToggle` is the only consumer, so there is no context provider. The inline script
duplicates the storage key by necessity — it cannot import.

## Build and deploy

```
push to main
  → npm ci
  → npm run build          (tsc --noEmit && vite build)
  → cp dist/index.html dist/404.html
  → upload-pages-artifact  (dist/ only)
  → deploy-pages
```

`build` typechecks first, so a type error fails CI and never deploys. Only `dist/` is
uploaded, so repo-internal files (`docs/`, `agents/`, `CLAUDE.md`, `resume.md`) are never
served publicly.
→ [ADR 0004](decisions/0004-deploy-via-github-actions.md)

## Not present yet

- `public/resume.pdf` — the `/resume` download link points at it; add the file
- `/apps` content — still a placeholder, and deliberately unlinked from the header
  nav and landing page until it has something on it. The route itself still resolves.
- SEO/OG metadata, favicon, `robots.txt`, `sitemap.xml` — `index.html` has a comment
  marking the spot
- An About section — it did not survive the move off the homepage
  ([ADR 0007](decisions/0007-landing-minimal-content-on-resume.md))
- `/projects/:slug` detail pages — `Project.slug` exists for this
