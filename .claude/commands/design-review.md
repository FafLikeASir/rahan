# /design-review

Invokes the `design-reviewer` agent on the current task or diff.

## Usage

```
/design-review
/design-review [task description]
```

## What it does

1. Reads `DESIGN.md` + `docs/93-creative-direction.md` + `docs/95-hero-visual-spec.md`
2. Analyzes the current diff (`git diff HEAD`) or the provided description
3. Produces a report with a DS alignment score
4. If score < 70% → stops and escalates to Maxime

## When to use

- Before starting any visual implementation
- Before merging a PR that touches UI components
- To validate that a design decision respects the brief

## Underlying agent

`.claude/agents/design-reviewer/AGENT.md`
