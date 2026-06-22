# Portfolio — Maxime Luet

Personal portfolio. Product Designer specializing in Design Systems & UI, positioned as "from Figma to production."

→ [rahan.vercel.app](https://rahan.vercel.app)

## Stack

- Next.js 15 (App Router) · TypeScript strict
- Tailwind v4 · shadcn/ui · Plus Jakarta Sans
- MDX (case studies) · Vercel

## Sections

| Section | Status |
|---|---|
| Hero | ✅ |
| Work (3 case studies) | ✅ eStorie · ✅ Mention · 🚧 eKonsilio |
| Method | ✅ |
| System (interactive design system) | 🚧 |
| About | ✅ |
| Contact | 🚧 |

## Development

```bash
pnpm dev      # localhost:3000
pnpm build    # production build
```

## Claude Code setup

This project ships with a full Claude Code configuration.

**Custom commands** (`/command` in Claude Code):

| Command | Purpose |
|---|---|
| `/design-review` | Design compliance check against `DESIGN.md` and `docs/93–95` |
| `/lyse` | Run Lyse design system audit (Health Score) |
| `/document` | Document a component (creates co-located `.md` + updates index) |
| `/plan-check` | Validate a plan against the workflow protocol |

**Agents** (`.claude/agents/`):

| Agent | Role |
|---|---|
| `design-reviewer` | Scores diff alignment with design system before implementation |
| `lyse-auditor` | Runs `npx lyse audit`, reports regressions |
| `component-documenter` | Creates/updates component docs after changes |

**Skills** (`.claude/skills/`): `design-taste-frontend` · `gpt-taste` · `redesign-existing-projects`

**Workflow:** always start in plan mode — see `docs/00-workflow-protocol.md`.

## Deployment

Vercel — auto-deploy on push to `main`.
