# 0005 — All copy lives in typed content modules, never in JSX

**Status:** Accepted
**Date:** 2026-11-04

## Context

This site is mostly structured, repetitive content: N experience entries, N projects, N skill
groups, N app links — each with the same shape. The natural lazy approach is to write the copy
directly into components as JSX.

That goes wrong in specific ways:

- Adding a project means writing markup, so presentation and content change in the same edit
  and can't be reviewed separately.
- The same card layout gets copy-pasted and then drifts between instances.
- Content is scattered across files, so nobody can see all of it at once or audit it.
- No schema, so a missing field is invisible until it renders blank in production.
- Updating a resume bullet requires knowing React.

Content also changes far more often than layout. Experience and projects get edited every time
there's something new; the card component is written once.

## Decision

Every piece of copy and data lives in a typed module under `src/content/`:

```
src/content/
  site.ts         name, title, email, social links
  experience.ts   Experience[]
  projects.ts     Project[]
  skills.ts       SkillGroup[]
  apps.ts         AppLink[]
```

Each module defines and exports its interface alongside its data. Components take that data as
props and render it. **Components contain no prose.**

## Consequences

- Adding a project is appending one typed object to one array. No JSX, no layout risk.
- Content edits produce small, readable diffs that can be reviewed as writing.
- The interfaces are the site's schema — a missing required field is a compile error
  ([ADR 0003](0003-typescript-over-javascript.md)).
- `src/content/` is the single place to audit everything the site says.
- Phase 2 of the plan is pure data entry against these types, not UI work.
- **The rule to enforce:** if you're typing a sentence into a `.tsx` file, it belongs in
  `src/content/`. Section headings and UI microcopy ("View repo") are the only exceptions.

## Alternatives considered

- **Markdown files + a loader** — better for long-form prose, and the right move if a blog
  happens. Rejected now: adds a parsing dependency and loses typed fields, which are what
  make the repetitive structured content safe.
- **JSON files** — same data-separation benefit, but no comments, no types, no imports. TS
  modules are strictly better here.
- **A CMS** — absurd overkill for a personal site, and introduces a runtime dependency on a
  third party for a static page.
