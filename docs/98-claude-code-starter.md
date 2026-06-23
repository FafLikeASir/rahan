# Claude Code — Starter Checklist

> This file describes the initialization steps for the portfolio project. Run
> in order, once only, on the first Claude Code launch on the repo.
>
> Prerequisites: Node.js 20+, pnpm (or npm), Claude Code installed.

---

## Phase 0 — Read the docs first

Before any command, Claude Code reads these files in this order:

1. `docs/96-project-structure.md` — architecture, stack, constraints (= the CLAUDE.md)
2. `docs/97-skill-orchestration.md` — which skill/doc for which task
3. `docs/95-hero-visual-spec.md` — hero visual spec
4. `docs/93-creative-direction.md` — the 4 aesthetic axes + rejection list

**Rule:** do not code anything before reading at minimum 96 and 97.

---

## Phase 1 — Initialize the Next.js project

```bash
# Create the Next.js 15 project with App Router + TypeScript + Tailwind v4
pnpm create next-app@latest portfolio --typescript --tailwind --app --src-dir --import-alias "@/*"
cd portfolio
```

**Check after init:**
- `src/app/layout.tsx` exists (App Router, not Pages Router)
- `tailwind.config.ts` is NOT needed (Tailwind v4 uses @theme in CSS)
- `src/app/globals.css` contains the Tailwind v4 directives

---

## Phase 2 — Initialize shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

**Choices during init:**
- Style: Default (we override everything afterward)
- Base color: Slate
- CSS variables: Yes
- Prefix: (none)
- src/components/ui: Yes (confirm path `src/components/ui`)

**Install base components:**
```bash
pnpm dlx shadcn@latest add button badge separator
```

Other components are added as needed, not upfront.

---

## Phase 3 — Install Claude Code plugins

### Ponytail (YAGNI enforcer)
```bash
# From the Claude Code marketplace:
/plugins
# → Select Ponytail, install

# OR manually:
git clone https://github.com/DietrichGebert/ponytail.git .ponytail-ref
# Copy the needed hooks and skills

# Activate in full mode (default)
/ponytail full
```

**When to use:**
- Active by default throughout the build
- `full` mode: standard YAGNI enforcer — no unrequested abstractions,
  no "for later" scaffolding, stdlib first
- `lite` mode: if a complex component (hero, SystemShowcase) needs
  more structural freedom — switch temporarily
- `/ponytail-review`: run on each diff before commit

**When to disable:**
- Never completely during the build
- `lite` temporarily for high visual-density components (hero)

---

### ui-ux-pro-max-skill (design intelligence)

```bash
# Install via CLI
npx uipro init --ai claude

# OR manually
git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git .uipro-ref
# Copy src/ui-ux-pro-max/ into .claude/skills/ui-ux-pro-max/
```

**⚠️ CRITICAL CONFIGURATION:**

This skill must NOT trigger automatically on UI tasks.
The design direction (91-95) has absolute priority. This skill serves ONLY:
- As a **reference database** consulted manually
  (`python3 search.py "neo-grotesque" --domain typography`)
- For **pre-delivery checks** (anti-pattern validation)
- For the **Quick Reference** on accessibility/performance

**It does NOT serve to:**
- Generate a design system (ours is already defined in 91-95)
- Recommend a palette or font pairing (decisions made)
- Choose a visual style (creative direction is locked)

If the skill proposes recommendations that contradict docs 91-95,
**docs 91-95 win. Always.**

---

## Phase 4 — Configure MCP Servers

### Lyse (Design System Audit)
```bash
# Install Lyse
pnpm add -D @lyse-labs/lyse

# Verify Lyse can read the project
npx lyse audit
```

**Enable the MCP Server (optional, for long sessions):**
```bash
# In Claude Code settings or .claude/mcp.json:
{
  "mcpServers": {
    "lyse": {
      "command": "npx",
      "args": ["lyse", "mcp"]
    }
  }
}
```

**Lyse workflow (after first tokens/components):**
```bash
npx lyse audit                  # Health score
lyse agents > AGENTS.md         # DS contract for Claude Code
```

### Figma (Dev Mode) — optional
If the Dev Mode MCP Server is enabled in Figma Desktop:
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"]
    }
  }
}
```

Not blocking for the build — fallback: manual exports.

### shadcn/ui MCP — already available via the shadcn skill
No additional config. The `shadcn` skill in Claude Code can already
search components and their docs.

---

## Phase 5 — Organize project files

### Place the documentation
```bash
mkdir -p docs
# Copy all reference files:
# 00-brief-global.md
# 91-brand-discovery.md
# 92-creative-brief.md
# 93-creative-direction.md
# 94-information-architecture.md
# 95-hero-visual-spec.md
# 96-project-structure.md
# 97-skill-orchestration.md
# 11–16-fiche-*.md
# etude-de-cas-mention.md
# case-study-ekonsilio.md
```

### Create the root CLAUDE.md
Copy the content of `96-project-structure.md` into `CLAUDE.md` at the root.
Claude Code reads it automatically at every session.

### Create the component tree
```bash
mkdir -p src/components/{ui,layout,hero,home,case-study}
mkdir -p src/content
mkdir -p src/lib
mkdir -p src/data
mkdir -p public/images/{og,cases/{mention,ekonsilio,estorie},about}
mkdir -p public/cv
```

---

## Phase 6 — Set the tokens

### Typography (src/lib/fonts.ts)
```typescript
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'

export const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
  display: 'swap',
})
```

### Palette (in src/app/globals.css)
Override the shadcn tokens with the direction values (cf. 96 §5.1).
Add the custom hero tokens (cf. 95 §9).

### After tokens — first Lyse audit
```bash
npx lyse audit
lyse agents > AGENTS.md
```

---

## Phase 7 — First component: the Hero

The hero is the 6-second test. It is the first component to build
after the tokens.

**Required reading:** `docs/95-hero-visual-spec.md` (the full document).

**Breakdown:**
1. `src/components/hero/hero.tsx` — container
2. `src/components/hero/hero-mesh.tsx` — animated mesh gradients (Client)
3. `src/components/hero/hero-grid.tsx` — grid lines
4. `src/components/hero/hero-glass.tsx` — glass elements (Client)
5. `src/components/hero/hero-content.tsx` — text + badge + Figma→prod line

**Ponytail mode:** switch to `lite` for the hero (complex component with
many visual layers). Return to `full` afterward.

---

## Post-setup checklist

- [ ] Next.js 15 + App Router + TypeScript + Tailwind v4
- [ ] shadcn/ui initialized with button, badge, separator
- [ ] Ponytail installed, full mode active
- [ ] ui-ux-pro-max installed, configured as manual reference (no auto-trigger)
- [ ] Docs 91-97 in `/docs`
- [ ] CLAUDE.md at the root (= content of 96)
- [ ] Component tree created
- [ ] Fonts loaded via next/font
- [ ] Palette tokens in globals.css
- [ ] Lyse audit passed, AGENTS.md generated
- [ ] Hero built and validated (6-second test)
