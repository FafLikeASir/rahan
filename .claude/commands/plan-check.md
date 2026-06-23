# /plan-check

Checks that the current plan follows the required template from workflow-protocol.

## Usage

```
/plan-check
```

## What it does

Checks that each step in the current plan contains:
- `[Feasibility: XX%]` — feasibility score
- `→ Skill: X` — applicable skill (or `→ Skill: none`)
- The three required sections: Context / Steps / Verification

If any step has a score < 90% → triggers the unblocking routine:
1. Identify the exact blocker
2. Propose a rephrasing or alternative approach
3. Re-evaluate → new score
4. Repeat until ≥ 90% or identify it as out of scope

## Reference

`docs/00-workflow-protocol.md §2` (scoring) and `§3` (skill routing)
