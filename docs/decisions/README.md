# Decision records

One file per decision. Numbered, ordered, append-only.

## Format

```markdown
# NNNN — Short imperative title

**Status:** Accepted | Superseded by NNNN
**Date:** YYYY-MM-DD

## Context
The situation and constraints. What forced a choice.

## Decision
What we chose, stated plainly.

## Consequences
What this makes easy, what it makes hard, and **what breaks if someone
reverses it without knowing why**.

## Alternatives considered
What else was on the table and why it lost.
```

## Rules

- **Never edit an accepted ADR's decision.** If it changes, write a new ADR and mark the
  old one `Superseded by NNNN`. The wrong turns are part of the value.
- Record the *failure mode*. "Don't change `base`" is forgettable; "changing `base`
  produces a blank page with 404s on every asset, and the build still passes" is not.
- Not everything needs one. Reach for an ADR when a choice is non-obvious, costly to
  reverse, or looks wrong without context.

## Index

| # | Decision | Status |
|---|---|---|
| [0001](0001-base-path-must-stay-root.md) | `base` stays `/` — this is a user page | Accepted |
| [0002](0002-spa-404-fallback.md) | Deep links via `404.html` copy of `index.html` | Accepted |
| [0003](0003-typescript-over-javascript.md) | TypeScript, not JavaScript | Accepted |
| [0004](0004-deploy-via-github-actions.md) | Build and deploy in Actions, publish `dist/` only | Accepted |
| [0005](0005-content-as-typed-data.md) | All copy lives in typed modules, not JSX | Accepted |
| [0006](0006-two-audiences-one-site.md) | Two audiences; recruiters own `/`, apps get `/apps` | Accepted (placement amended by 0007) |
| [0007](0007-landing-minimal-content-on-resume.md) | Landing stays minimal; content lives on `/resume` | Accepted |
| [0008](0008-theming-three-states.md) | Three theme states; dark defined under two selectors | Accepted |
