---
name: design-reviewer
description: >
  Before any visual implementation, checks the compliance of the diff or
  request against DESIGN.md, docs/93 and docs/95. Produces a DS alignment
  score and a do/don't report.
trigger: manual (/design-review) or start of plan involving visual work
---

# Agent — Design Reviewer

## Sequence

1. **Read the design references**
   - `DESIGN.md` (tokens + do/don't)
   - `docs/93-creative-direction.md` (axes + rejection list)
   - `docs/95-hero-visual-spec.md` (if the task touches the hero)

2. **Analyze the request or diff**
   - If git diff available: `git diff HEAD` or PR diff
   - If text request: analyze the components and tokens mentioned

3. **Alignment report**

   ```md
   ## Design Review — [Task name]

   ### DS Alignment Score: XX%
   (covered elements / total identified × 100)

   ### ✅ Aligned
   - Token `{colors.hero-orange}` used correctly for accent
   - ...

   ### ⚠️ Watch out
   - [element] risks violating [rule]
   - ...

   ### ❌ Not aligned
   - [element] violates [do/don't rule] — suggested fix: [X]

   ### Decision
   - ≥ 70% → implement
   - < 70% → escalate to Maxime before implementing
   ```

4. **If score < 70%**
   - Stop → escalate to Maxime with the report
   - Do not implement

## Review rules (excerpt from DESIGN.md)

**Automatically flagged don'ts:**
- `bg-white` or hardcoded hex values outside the hero
- Dark mode
- Decorative gradient/glass outside the hero
- Second type family as theme
- `framer-motion` / `motion`
- Em-dash (`—`) in texts
- Isolated dark sections in a light context

## What this agent does NOT do
- Does not modify code
- Does not generate mockups
- Does not invoke Figma
