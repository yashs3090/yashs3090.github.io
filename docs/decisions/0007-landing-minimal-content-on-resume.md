# 0007 — Keep the landing page minimal; all content lives on `/resume`

**Status:** Accepted
**Date:** 2026-11-04
**Amends:** [0006](0006-two-audiences-one-site.md) — the audience split stands; the
section placement in 0006 does not.

## Context

[ADR 0006](0006-two-audiences-one-site.md) put recruiter content on the homepage in a
deliberate order (Hero → Experience → Projects → Skills → About → Contact) and that is
what Phase 1 scaffolded.

On review, the landing page was pulled back to near-empty and the content moved to
`/resume`. Reasons:

- The landing page is getting a dedicated design pass later. Filling it with content
  sections now means building something that gets rebuilt — and makes the eventual
  design harder, because the content would have to be unwound from it first.
- `/resume` is where a recruiter is going anyway. A resume *page* holding resume content
  needs no justification; a homepage that duplicates it does.
- One canonical location for every fact. Content split across `/` and `/resume` drifts
  the moment one gets edited.

## Decision

- **`/`** is a sparse landing: name, role line, links to `/resume` and `/apps`, and
  contact links. No content sections, no `<h2>`.
- **`/resume`** carries everything: Experience, Skills, Projects, Education, contact,
  and the PDF download. Order is recruiter-first — Experience leads.
- The audience split from 0006 is unchanged. `/apps` is still Yash's, still not promoted.

## Consequences

- `Home.tsx` imports only `site.ts`. If it starts importing `experience` or `projects`,
  this decision is being reversed — reopen it deliberately.
- `/resume` is long, which is correct for a resume and wrong for a landing page. That
  asymmetry is the point.
- The landing page uses `min-height` so a sparse page reads as deliberate rather than
  broken. Without it, a short page leaves the footer floating mid-viewport and looks
  unfinished.
- A future design pass on `/` starts from a blank canvas, not a teardown.
- There is no About section anywhere right now. It was homepage-only in 0006 and did not
  survive the move. Add it to `/resume` or the redesigned `/` when there is copy for it.

## Alternatives considered

- **Keep 0006's homepage as scaffolded** — rejected: builds content into a page slated
  for redesign.
- **Duplicate content on both** `/` and `/resume` — rejected: two copies of every fact,
  guaranteed to diverge.
- **Drop `/resume` and keep one long homepage** — rejected: `/resume` is the URL people
  expect and the one worth sharing.
