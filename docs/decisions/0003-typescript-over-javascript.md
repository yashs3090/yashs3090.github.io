# 0003 — Use TypeScript, not JavaScript

**Status:** Accepted
**Date:** 2026-11-04

## Context

The original plan specified React + JavaScript. Two things argue against that here:

1. **This repo is itself part of the portfolio.** It's a public repo linked from a site whose
   purpose is to demonstrate engineering judgment to engineers. Some readers will click into
   the source. TypeScript is the stronger signal for a mid-level backend/systems engineer.
2. **Content is structured data** ([ADR 0005](0005-content-as-typed-data.md)). Experience
   entries, projects, and skills are arrays of objects with required fields. Types turn
   "I forgot the `tech` field on one project" from a blank patch on the live site into a
   compile error.

The usual argument against TS — setup cost, build friction — barely applies. `create-vite`'s
`react-ts` template is a first-class, zero-config path.

## Decision

TypeScript throughout. `.tsx` for components, `.ts` for content and utilities. Content modules
export explicitly-annotated data (`export const projects: Project[] = [...]`) so the annotation
is checked rather than inferred.

## Consequences

- Mistyped or missing content fields fail at build time, before they reach the live site.
- `npx tsc --noEmit` is part of verifying a change.
- Content interfaces are the schema for the site's data; they belong with their content module.
- Slightly more ceremony adding a field: update the interface, then the data.

## Alternatives considered

- **JavaScript with JSDoc types** — real typechecking without `.ts` files. Rejected: more
  awkward to write, and loses the signal value of TS in a portfolio repo.
- **Plain JavaScript** — the original plan. Rejected per the above.
