# 0006 — Two audiences: recruiters own `/`, personal apps get `/apps`

**Status:** Accepted — section placement amended by [0007](0007-landing-minimal-content-on-resume.md)
**Date:** 2026-11-04

## Context

The site has two stated purposes that pull in different directions:

1. Something **recruiters** look at — resume, experience, projects.
2. A place for **Yash** to put and reach personal projects and tools.

The original plan merged these, listing "Self-hosted Apps / Services" as section 7 of a
single-page homepage, alongside About, Experience, Skills, Projects, Resume, and Contact.

Two problems with that:

- **Eight stacked sections is too much.** A recruiter gives a portfolio under a minute. The
  things that get interviews — current role, impact, projects — must be near the top, not
  below three sections of preamble.
- **The app portal is not for recruiters.** It's a personal dashboard. Putting it in the
  homepage scroll spends recruiter attention on content with no bearing on hiring, and
  constrains how useful it can be as a tool.

## Decision

Split by audience, by route:

- **`/`** — recruiter-facing. Order: Hero → Experience → Projects → Skills → About → Contact.
  Education goes in the hero line or a compact strip near Experience, not at the bottom.
- **`/resume`** — HTML resume plus PDF download at a stable `/resume.pdf`.
- **`/apps`** — personal app and tool links. Reachable, not promoted. Not in the primary nav
  flow for a first-time visitor.

## Consequences

- The homepage can be optimized for a 45-second skim without compromise.
- `/apps` can be as utilitarian as is useful — it has an audience of one.
- Requires client-side routing, which requires the 404 fallback
  ([ADR 0002](0002-spa-404-fallback.md)).
- **When a change helps one audience and hurts the other, name the tradeoff rather than
  splitting the difference.** Most such calls should resolve in favor of recruiters on `/`
  and in favor of utility on `/apps`.
- Quantified resume achievements (5x latency, ~$100k saved, 2 engineer-days/push, 300+
  students) are the strongest available material and belong high in Experience.

## Alternatives considered

- **Single long homepage with all sections** — the original plan. Rejected per above.
- **Two separate sites** (portfolio + private dashboard) — cleanest separation, but doubles
  maintenance and means the apps portal needs its own hosting. Rejected as premature.
- **Apps behind a login on the same site** — not possible on a static host without a third
  party, and unnecessary: a page of links isn't sensitive as long as the links themselves
  aren't.
