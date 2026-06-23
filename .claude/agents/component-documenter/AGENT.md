---
name: component-documenter
description: >
  After a component is created or modified, creates or updates
  the co-located .md file and the components index. Checks alignment
  with DESIGN.md.
trigger: manual (/document ComponentName) or end of task involving a component
---

# Agent — Component Documenter

## Sequence

1. **Identify the component**
   - Argument: component name (`/document Hero`)
   - Fallback: read the last modified `.tsx` file (git diff --name-only HEAD~1)

2. **Read the component**
   - Read the component's `.tsx` file
   - Read the co-located `.md` if it exists (to avoid overwriting)

3. **Check DESIGN.md alignment**
   - Read `DESIGN.md`
   - Check: tokens used (`var(--...)`, Tailwind classes) aligned with YAML tokens
   - Check: do/don't rules respected
   - If divergence → flag it, do not silently "fix" it

4. **Create or update the co-located `.md`**
   Template (from `docs/00-workflow-protocol.md §8`):

   ```md
   # ComponentName

   ## Role
   One sentence — what this component does, not how.

   ## Props
   | Prop | Type | Default | Description |
   |---|---|---|---|

   ## Lyse tokens used
   - `--color-X` → Tailwind class `bg-X`

   ## Variants / states
   List of variants or interactive states.

   ## Design decisions
   Why this choice — hidden constraint, trade-off, workaround.
   Do not document what the code already says.
   ```

5. **Update `docs/98-components-index.md`**
   - Add or update the component's row

## What this agent does NOT do
- Does not modify `.tsx` code
- Does not rename components
- Does not propose refactoring
