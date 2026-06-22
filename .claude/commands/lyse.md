# /lyse

Invoque l'agent `lyse-auditor` : audit de conformité design system.

## Usage

```
/lyse
```

## Ce que ça fait

1. Lance `npx lyse audit`
2. Reporte le Health Score et la tendance
3. Si régression → identifie le fautif et propose un fix
4. Si tokens ont changé → compare avec AGENTS.md, soumet le diff pour validation

## Quand l'utiliser

- Après chaque plan exécuté (obligatoire, voir workflow-protocol §5)
- Avant de merger une PR
- En cas de doute sur la conformité DS après modifications CSS/Tailwind

## Agent sous-jacent

`.claude/agents/lyse-auditor/AGENT.md`
