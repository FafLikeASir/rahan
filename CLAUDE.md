# CLAUDE.md — Portfolio Maxime Luet

> This file is automatically read by Claude Code at the start of every session.
> It points to the full documentation in `/docs`.

## Rule #0 — Plan mode & session protocol

**Always start in plan mode.** No implementation without a validated plan.
Read `docs/00-workflow-protocol.md` for the full protocol:
feasibility scoring, skill routing, Figma → code workflow, Lyse audit.

**Required plan format** (template `docs/00-workflow-protocol.md §2`):
- Each step: `[Feasibility: XX%]` + `→ Skill: X`
- Score < 90% → unblocking routine before implementing
- Validate with `/plan-check`

**Custom commands:** `/design-review` · `/lyse` · `/document` · `/plan-check`  
**Agents:** `.claude/agents/` — lyse-auditor, component-documenter, design-reviewer

## Rule #1

Read `docs/96-project-structure.md` before any action. It is the source of
truth for architecture, stack, conventions, and constraints.

## Rule #2

Consult `docs/97-skill-orchestration.md` to know which skill and which
document to read for the current task.

## Rule #3

If a decision is written in any of docs 91-95, it is final.
Do not re-debate it. Apply it. If it appears to conflict with another,
ask Maxime.

## Design system — quick access

`DESIGN.md` (root) — YAML tokens + condensed do's and don'ts. Quick read before
any visual task. Points to the full docs for details.

## Document hierarchy

1. `docs/96-project-structure.md` — architecture and technical constraints
2. `docs/93-creative-direction.md` — aesthetic axes + rejection list
3. `docs/94-information-architecture.md` — structure, labels, case study template
4. `docs/95-hero-visual-spec.md` — hero specification
5. `docs/92-creative-brief.md` — visual direction and scope
6. `docs/00-brief-global.md` — validated content
7. `docs/91-brand-discovery.md` — territories and analysis

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind v4 · shadcn/ui · Plus Jakarta Sans · Vercel

## What we do NOT do

No Pages Router. No dark mode. No blog. No forms.
No API routes. No CMS. No canvas/WebGL at launch.
No framer-motion (GSAP allowed, animation phase only). No hardcoded `bg-white` — semantic tokens only.
Full list in `docs/96-project-structure.md` §15.
