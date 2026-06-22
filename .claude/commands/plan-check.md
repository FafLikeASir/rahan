# /plan-check

Vérifie que le plan en cours respecte le template obligatoire du workflow-protocol.

## Usage

```
/plan-check
```

## Ce que ça fait

Vérifie que chaque étape du plan actuel contient :
- `[Feasibility: XX%]` — score de faisabilité
- `→ Skill: X` — skill applicable (ou `→ Skill: none`)
- Les trois sections obligatoires : Contexte / Étapes / Vérification

Si une étape a un score < 90% → déclenche la routine de déblocage :
1. Identifier le blocage exact
2. Proposer une reformulation ou approche alternative
3. Réévaluer → nouveau score
4. Répéter jusqu'à ≥ 90% ou identifier que c'est hors-scope

## Référence

`docs/00-workflow-protocol.md §2` (scoring) et `§3` (routing skills)
