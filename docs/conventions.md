# Conventions

How to write code here. Short on purpose.

## Content vs. components

**No prose in `.tsx` files.** Copy lives in `src/content/`
([ADR 0005](decisions/0005-content-as-typed-data.md)). Section headings and UI microcopy
("View repo", "Download PDF") are the only exceptions.

Components receive data as props and render it. A component that imports from
`src/content/` *and* renders layout is fine at the route level; leaf components should take
props so they stay reusable.

## Types

- Content modules define and export their own interfaces next to their data.
- Annotate content exports explicitly — `export const projects: Project[] = [...]` — so the
  type is checked, not inferred.
- No `any`. If something is genuinely unknown, `unknown` and narrow it.

## Styling

- **Tokens only.** Every color, space, radius, and font comes from a CSS custom property in
  `src/styles/tokens.css`. Never hardcode a hex value in a component's CSS.
- **Both themes, every change.** Light and dark are driven by `prefers-color-scheme`. A visual
  change isn't done until it's been looked at in both.
- Plain CSS, co-located with the component it styles. No CSS-in-JS, no framework.
- Mobile-first: base styles target small screens, `min-width` media queries add from there.
- Check contrast (WCAG AA: 4.5:1 body, 3:1 large text). Low-contrast grey-on-dark is the most
  common failure in this kind of design.
- Wrap anything animated in `@media (prefers-reduced-motion: no-preference)`.

## Accessibility baseline

Not optional — some readers of this site are engineers who check.

- Semantic landmarks: `header`, `nav`, `main`, `footer`.
- Exactly one `h1` per route; don't skip heading levels for visual effect.
- Every interactive element reachable and operable by keyboard, with a visible focus style.
  Never `outline: none` without a replacement.
- Images get real `alt` text, or `alt=""` if decorative.
- Links say where they go. No "click here".

## Naming

- Components `PascalCase.tsx`; everything else `kebab-case.ts`.
- One component per file, named the same as the file.
- Content modules are plural nouns (`projects.ts`), interfaces singular (`Project`).

## Before claiming a change is done

```bash
npm run build       # must exit clean
npx tsc --noEmit    # must be clean
```

Plus: looked at in both themes, keyboard-navigable, and no new console errors.

## Commits

Imperative subject, explain *why* in the body when it isn't obvious. If a change embodies a
non-obvious decision, write an ADR and reference it.
