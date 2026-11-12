# docs

Why the code looks the way it does. Read before changing the shape of anything.

| Doc | What it's for |
|---|---|
| [decisions/](decisions/) | ADRs — the reasoning behind non-obvious choices |
| [conventions.md](conventions.md) | How to write code in this repo |
| [architecture.md](architecture.md) | How the app fits together |

Related, outside this folder:
- [`../CLAUDE.md`](../CLAUDE.md) — entry point, constraints, working agreements
- [`../agents/plan.md`](../agents/plan.md) — roadmap and open decisions
- [`../resume.md`](../resume.md) — source of truth for resume content

## Why this folder exists

A repo records *what* the code does. Git history records *when* it changed. Neither
reliably records **why** a choice was made, which is exactly what you need when deciding
whether a choice is still valid.

This matters more than usual here because much of the reasoning is about GitHub Pages
behaving in non-obvious ways. Several things in this codebase look wrong and are correct.
An agent or a future reader without the context will "fix" them and break the site —
quietly, because the build still passes.

So: if you make a non-obvious choice, write it down. If you're about to change something
that looks wrong, check here first.
