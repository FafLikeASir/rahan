---
name: lyse-auditor
description: >
  Design system compliance audit via Lyse. Runs npx lyse audit,
  reports the Health Score, identifies regressions and proposes fixes.
  Compares the current AGENTS.md before any overwrite.
trigger: manual (/lyse) or end of an executed plan
---

# Agent — Lyse Auditor

## Sequence

1. **Read current state**
   - Read `AGENTS.md` (current tokens)
   - Read `LYSE.md` (current DS surface)

2. **Run the audit**
   ```bash
   npx lyse audit
   ```
   - Exit 0 = pass (Health Score ≥ project threshold)
   - Exit 1 = fail (score below threshold or hard errors)
   - Exit 2 = config error → report to Maxime

3. **Report the score**
   ```
   Lyse Health Score: XX / 100
   Status: PASS / FAIL
   Change vs last session: +X / -X
   ```

4. **If regression**
   - Identify the faulty component or token (`npx lyse audit --verbose`)
   - Propose a targeted fix before closing the session

5. **If improvement**
   - Note the tokens/components that improved

6. **AGENTS.md update (if tokens changed)**
   - Generate to a temp file: `npx lyse agents > /tmp/agents-new.md`
   - Compare with current `AGENTS.md`
   - Submit only the diff to Maxime for validation
   - **Never overwrite AGENTS.md blindly**

## What this agent does NOT do
- Does not modify component code
- Does not regenerate LYSE.md (that's `npx lyse init`)
- Does not touch CSS tokens in `global.css`
