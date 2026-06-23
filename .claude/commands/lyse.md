# /lyse

Invokes the `lyse-auditor` agent: design system compliance audit.

## Usage

```
/lyse
```

## What it does

1. Runs `npx lyse audit`
2. Reports the Health Score and trend
3. If regression → identifies the culprit and proposes a fix
4. If tokens changed → compares with AGENTS.md, submits the diff for validation

## When to use

- After every executed plan (required, see workflow-protocol §5)
- Before merging a PR
- When in doubt about DS compliance after CSS/Tailwind changes

## Underlying agent

`.claude/agents/lyse-auditor/AGENT.md`
