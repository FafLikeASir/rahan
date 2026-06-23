# /document

Invokes the `component-documenter` agent on a component.

## Usage

```
/document Hero
/document WorkCard
/document StickyNav
```

## What it does

1. Identifies the component (argument or last modified `.tsx` file)
2. Reads the `.tsx` and the existing co-located `.md`
3. Checks alignment with `DESIGN.md`
4. Creates or updates the co-located `.md` (template §8 workflow-protocol)
5. Updates `docs/98-components-index.md`

## When to use

- After creating a new component
- After a significant modification to an existing component
- When the co-located `.md` is missing or out of date

## Underlying agent

`.claude/agents/component-documenter/AGENT.md`
