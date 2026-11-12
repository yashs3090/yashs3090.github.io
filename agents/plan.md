# Portfolio Website Plan

## Goal
Personal website for Yash Saraiya at `yashs3090.github.io`, serving two distinct audiences:

1. **Recruiters / hiring managers** — resume, experience, projects. Optimize for a 45-second skim.
2. **Me** — a portal to self-hosted apps and services, plus a place to put personal projects.

These audiences want different things. Audience 1 owns the homepage. Audience 2 gets `/apps`.

## Tech Stack
- **React + TypeScript** (not plain JS — stronger signal on a repo that engineers may click into, near-zero cost at this size)
- **Vite** (build tool)
- **Plain CSS** with custom properties for theming (no framework needed; keeps the repo readable)
- **GitHub Pages** for hosting, **GitHub Actions** for build + deploy
- Node 20.19+ required (currently on 20.19.5 — just above Vite 7's floor; if install misbehaves, check this first)

## GitHub Pages constraints — read before writing code
These are the three things that actually break Vite deploys here.

### 1. `base` must stay `/`
This is a **user** page (`yashs3090.github.io`), served from the domain root. Most Vite + Pages
tutorials tell you to set `base: '/repo-name/'` — that is for *project* pages. Setting it here
produces a blank page with 404s on every asset. Leave `base` at its default `/`.

### 2. No SPA fallback — deep links 404
GitHub Pages serves static files. `yashs3090.github.io/apps` has no file behind it, so a direct
visit or a refresh returns 404. Decision: **copy `index.html` → `404.html` at build time** and let
the router take over. Clean URLs, brief flash on deep load. (Alternatives considered: `HashRouter`
— bulletproof but dated URLs; single-page-only — simplest, but blocks `/apps` and project pages.)

### 3. Only `dist/` gets published
Deploying from a branch root would serve the whole repo publicly — including this file, at
`yashs3090.github.io/agents/plan.md`. Deploy the Actions build artifact (`dist/`) instead.

## Site Structure
| Route | Purpose | Audience |
|---|---|---|
| `/` | Hero, experience, projects, skills, about, contact | Recruiters |
| `/resume` | HTML resume + PDF download | Recruiters |
| `/apps` | Self-hosted app portal | Me |
| `/projects/:slug` | Project detail pages (post-MVP) | Both |

## Homepage sections — recruiter-first order
Assume 45 seconds of attention. Lead with what gets interviews.

### 1. Hero
- Name, title: Software Engineer @ Bloomberg
- One or two lines: fixed income trading systems, C++, low-latency distributed systems, AI tooling
- CTAs: Resume · Projects · GitHub · LinkedIn · Email

### 2. Experience
Timeline, most recent first, impact-oriented bullets. Source content from `resume.md`:
- Bloomberg LP — Software Engineer (Dec 2023 – present) — Sell-Side OMS, C++, FIX, Kafka, SLI/SLOs, internal AI platform (LLM PR review bot, GitHub MCP tooling, RAG code search)
- Bloomberg LP — SWE Intern (2023) — EMS / Trading Analytics, 5x latency reduction
- Cognosos — Engineering Intern (2022) — CI/CD for hardware testing, saved ~2 engineer-days per push
- NCR — SWE Intern (2022) — Go backend + React/TS frontend, websockets, BDD testing
- NCR — SWE Intern (2021) — GCP microservice pipeline, BigQuery materialized views, ~$100k saved
- Georgia Tech — Undergraduate TA, 300+ students (CS1332, CS2050, ECE4180)
- GTRI — Undergraduate Research Assistant — accessible K-12 robotics, HCI lab

Lead each bullet with the outcome, not the technology. The quantified ones (5x, $100k, 2 days,
300 students) are the strongest material on the resume — don't bury them.

### 3. Projects
Each: title, one-line description, tech stack, 2–3 highlights, repo link.

Available projects (all on the **old** `yash3090` account — see note below):

| Project | Lang | Notes |
|---|---|---|
| **GtScheduler** | Java | Course scheduler — the most product-like of the set, closest to "real users" |
| **ECE4122-Multithreading** | C++ | Multithreading, OpenMP, OpenGL, batch jobs — aligns directly with the low-latency C++ work at Bloomberg |
| **ECE4180-GestureBot** | C++ / Python | Mbed glove → Raspberry Pi robot; concurrent threads, local webserver, Selenium scraping |
| **FruitNinja-Game-MBED** | C++ | Accelerometer/button-controlled game on an MBED microcontroller; visually demoable |
| **CS4641-ML-Project** | Jupyter | ML coursework — *forked and group-authored, so the weakest attribution of the set* |

**Recommended featured four:** GtScheduler, ECE4122-Multithreading, GestureBot, FruitNinja-MBED.
Lead with ECE4122-Multithreading or put it second — it's the only one that reinforces the
professional story (low-latency, concurrent C++) rather than sitting apart from it.

Leave CS4641 out of the featured set, or list it in a plain "other work" line. A fork of someone
else's group project is a weak thing for a recruiter to land on first.

**Still the thin spot:** every one of these is 2021–2023 coursework, while the resume shows two
years of production trading systems and AI tooling. A recruiter sees a gap between what you do at
work and what you can show. Strongest fix is one post-2023 project of any kind — it does not
have to be big, just recent and yours.

**Screenshots/GIFs matter more than prose here.** GestureBot and FruitNinja are physical and
visual; a short GIF of each does more than three bullets.

### 4. Skills
A thin, scannable band — grouped, not a wall of 30 comma-separated words. Lead with depth
(C++, Python, Go, TypeScript) and separate from familiarity. Groups: Languages · Systems &
Infra (Kafka, Docker, AWS, GCP, Linux) · AI/ML (TensorFlow, RAG, MCP) · Hardware (if kept).

### 5. About
Short. Focus areas, what kind of problems you want to work on.

### 6. Contact
Email, LinkedIn, GitHub, location (NYC). No contact form — a static site can't handle one
without a third-party service, and `mailto:` is fine. Expect some address scraping.

## Education
Georgia Tech, BS Computer Engineering + CS minor, 3.97 GPA, 2023. Put it in the hero line or a
compact strip near Experience — it's a strong number and shouldn't be buried at the bottom.

## `/apps` — personal app portal

Its own page, deliberately not a homepage section. Recruiters don't need it; it's for me.

**MVP: a hardcoded list of links.** Name, description, link, and a short note. That's all.
Entries live in `src/content/apps.ts` like every other piece of content.

Nothing here requires infrastructure. If an app is a hosted static demo, another GitHub Pages
site, or something on a VPS, it's just a link.

### Deferred: home-hosted services
Only relevant *if* apps end up running on hardware at home. The problem that arises then is
narrow: reaching a home machine from the internet means publishing your home IP in DNS and
opening router ports, which exposes your home network to everyone. Cloudflare Tunnel + Access
is the standard answer (outbound-only connection, no open ports, identity gate at the edge),
and it needs a real domain, so it can't point at `github.io`.

Not a prerequisite for anything in this plan. Revisit only when there's an actual home-hosted
app to link. Until then, custom domain stays optional.

### Status badges: skip
A static page on `github.io` can't health-check anything — cross-origin fetches are blocked, and
it would fire from every visitor's browser. Any real version requires computing status ahead of
time (scheduled Action, or a Worker) and baking it in as data. Lowest value, highest complexity
item in the plan, for an audience of one who already knows when his own stuff is down. Hardcode
status, or omit it.

## Design Direction
- **Light and dark, via `prefers-color-scheme`** — not dark-only. Plenty of people browse in light
  mode, and dark-gradient-card is currently the single most recognizable AI-generated-portfolio look.
- Clean and professional; restraint over effects. Typography and spacing do the work.
- Mobile-first responsive.
- Check contrast ratios (WCAG AA) — gradients over dark backgrounds fail this constantly.
- Respect `prefers-reduced-motion` on any animation.
- Print styles for `/resume` so Cmd-P produces something usable.

## Architecture
- Content lives in typed data modules under `src/content/` (`experience.ts`, `projects.ts`,
  `skills.ts`, `apps.ts`) — adding a project means editing one array, not touching JSX
- Reusable presentational components per section
- Resume PDF at a **stable** `/resume.pdf` in `public/` (links get shared; don't break it)
- Do **not** `<iframe>` the PDF — it's bad on mobile. HTML resume page + download link.

## SEO & link previews
The highest-leverage 20 minutes on this project, and easy to forget: the first impression is often
the preview card when someone pastes the link into LinkedIn or Slack.
- `<title>`, meta description
- Open Graph + Twitter card tags, including `og:image` (a real 1200×630 image)
- Favicon
- `robots.txt`, `sitemap.xml`
- Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<section>`), one `<h1>`
- One Lighthouse pass before calling it done

## Deployment — day one, not "future"
Vite requires a build step; GitHub Pages will not run it. So:
1. Repo Settings → Pages → Source: **GitHub Actions**
2. `.github/workflows/deploy.yml`: checkout → setup-node 20 → `npm ci` → `npm run build` →
   copy `dist/index.html` to `dist/404.html` → `upload-pages-artifact` → `deploy-pages`
3. Push to `main` deploys. Build failure = no deploy, so `main` stays green.
4. Custom domain stays optional and deferred — a `CNAME` file plus DNS makes it a cheap later move,
   and a personal domain is a stronger signal when you want it.

## Security model
- Public bundle contains public content only. Everything client-side is readable — there are no secrets here.
- Any service running on personal hardware stays behind auth and is never exposed by this site
- No internal hostnames, IPs, ports, or credentials in the repo (it's public, and so is its history)
- Phone number: on the PDF is normal; rendering it in page HTML invites scraping. Consider PDF-only.

## Build phases

### Phase 0 — Content (do this first)
The components are the easy half; the bullets are the half that gets interviews.
- [ ] Rewrite experience bullets outcome-first, tightened from `resume.md`
- [ ] Pick 3–6 projects and write highlights for each
- [ ] Export resume PDF
- [ ] Draft hero and about copy

### Phase 1 — Scaffold & deploy an empty site
Get the pipeline green before there's anything to break.
- [ ] `npm create vite@latest` (react-ts), confirm `base` is `/`
- [ ] Deploy workflow with the `404.html` copy step
- [ ] Pages source set to Actions; verify the live URL
- [ ] Router + shell layout + theme tokens

### Phase 2 — MVP homepage
- [ ] Content data modules
- [ ] Hero, Experience, Projects, Skills, About, Contact
- [ ] `/resume` page + PDF download
- [ ] Responsive pass (360px → desktop)

### Phase 3 — Portal & polish
- [ ] `/apps` page with hardcoded status
- [ ] SEO + OG tags + `og:image` + favicon
- [ ] Light/dark verification, contrast + keyboard nav check, Lighthouse
- [ ] Link check (every repo/demo/social link actually resolves)

## Future Enhancements
- Project detail pages at `/projects/:slug`
- Blog
- Custom domain
- Privacy-friendly analytics — Pages gives you no server logs, so this needs a client-side tool
  (GoatCounter or Plausible)

## Open decisions
1. Confirm the featured project set (recommendation above), and whether a post-2023 project gets added.
2. **GitHub account split:** the projects live on `yash3090`, the site and future work on `yashs3090`.
   A recruiter clicking "GitHub" in the hero lands on an account holding little but this website.
   Options: transfer the repos to `yashs3090`, mirror the good ones, or link each project directly
   at its old-account URL and accept the split. Worth deciding before the hero links are written.
3. `/apps` — what actually goes on it first? (Can stay an empty placeholder page.)
4. Phone number in page HTML, or PDF only?
