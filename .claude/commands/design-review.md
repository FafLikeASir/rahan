# /design-review

Invoque l'agent `design-reviewer` sur la tâche ou le diff en cours.

## Usage

```
/design-review
/design-review [description de la tâche]
```

## Ce que ça fait

1. Lit `DESIGN.md` + `docs/93-creative-direction.md` + `docs/95-hero-visual-spec.md`
2. Analyse le diff courant (`git diff HEAD`) ou la description fournie
3. Produit un rapport avec score d'alignement DS
4. Si score < 70% → stoppe et remonte à Maxime

## Quand l'utiliser

- Avant de commencer toute implémentation visuelle
- Avant de merger une PR qui touche des composants UI
- Pour valider qu'une décision de design respecte le brief

## Agent sous-jacent

`.claude/agents/design-reviewer/AGENT.md`
