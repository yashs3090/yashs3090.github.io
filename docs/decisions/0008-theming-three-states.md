# 0008 — Three theme states, with dark defined under two selectors

**Status:** Accepted
**Date:** 2026-11-04

## Context

Phase 1 shipped light/dark driven purely by `prefers-color-scheme`. That follows the OS
but gives the visitor no control — someone on a dark OS who wants to read this site in
light has no recourse.

Adding a control introduces a subtlety that is easy to get wrong. A naive two-state
toggle (light ⇄ dark) has to pick an initial value, and whatever it picks is wrong for
half of visitors: default to light and dark-OS users get flashed; default to dark and
light-OS users do. The missing state is "follow my OS", which is what most people
actually want and what the site did before the toggle existed.

## Decision

**Three states:** `system` (default), `light`, `dark`.

- `system` **removes** `data-theme` from `<html>`, handing control back to the media query
- `light` / `dark` set `data-theme` explicitly and persist to `localStorage`

The CSS therefore defines dark **twice**, which is the non-obvious part:

```css
:root                      { /* complete light palette — every token */ }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) { /* dark */ }
}

:root[data-theme='dark']   { /* dark again, identical values */ }
```

Each piece is load-bearing:

| Piece | Without it |
|---|---|
| Complete light on bare `:root` | a token can end up dark-only and undefined in light |
| `:not([data-theme='light'])` guard | choosing Light on a dark OS does nothing — the media query keeps winning |
| `[data-theme='dark']` block | choosing Dark on a light OS does nothing — no media query matches |

An inline script in `index.html` applies the stored value **before first paint**.
Without it, the page renders in the OS theme and snaps to the override on hydration —
a visible flash.

`color-scheme` is set alongside the palette in each block so native UI (scrollbars, form
controls, autofill) follows the theme too.

## Consequences

- **The two dark blocks must stay in sync.** Changing a dark value in one and not the
  other produces a theme that differs depending on *how* the user arrived at dark —
  which looks like a haunting, not a bug. Edit both.
- The storage key `'theme'` is duplicated between `src/lib/theme.ts` and the inline
  script in `index.html`. The script cannot import, so this duplication is unavoidable;
  both sites carry a comment pointing at the other.
- `localStorage` access is wrapped in `try/catch` — it throws outright in Safari private
  mode and when a browser is set to block site data. A failure degrades to `system`
  rather than breaking the page.
- The toggle is `role="radiogroup"` with `aria-checked` buttons, and `aria-checked` is
  also the CSS styling hook — so the visual state and the announced state cannot drift.
- `resolveTheme` guards on `typeof window` so a future prerender step
  ([ADR 0002](0002-spa-404-fallback.md) lists SSG as an alternative) will not crash at
  build time.
- Theme state deliberately does **not** live in React context. One component consumes it;
  a provider would be ceremony. Revisit if a second consumer appears.

## Alternatives considered

- **Media query only** (the Phase 1 behavior) — no visitor control. Rejected.
- **Two-state toggle, no `system`** — simpler UI, but has to guess an initial theme and
  permanently overrides the OS once touched. Rejected.
- **A `.dark` class instead of `data-theme`** — equivalent, but then "no class" means both
  "system" and "light", so the `:not()` guard gets harder to express. The attribute
  carries three states cleanly.
- **Duplicating dark values via a CSS preprocessor mixin** — removes the sync hazard, but
  adds a build dependency to save eleven lines. Rejected at this size.
