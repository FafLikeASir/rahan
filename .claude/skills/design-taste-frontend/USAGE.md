# design-taste-frontend — Guide d'usage

## Quand invoquer

- Construction d'une **page entière** (landing, section home, portfolio)
- Ajout d'un **composant marketing** (hero, work card, section about)
- Toute tâche où le résultat sera visible dans le browser
- En complément de `ui-ux-pro-max` (voir routing `docs/97-skill-orchestration.md`)

## Ce que ce skill fait

- Déclare un "Design Read" avant tout code (une ligne : page kind / audience / vibe)
- Fixe 3 dials : `DESIGN_VARIANCE`, `MOTION_INTENSITY`, `VISUAL_DENSITY`
- Applique les règles anti-slop (no AI-purple, no 3 cards égales, no Inter par défaut)
- Exécute un Pre-Flight Check (50+ règles) avant de livrer

## Ce que ce skill ne fait PAS

- Pas de dashboards ni data tables → Carbon / Fluent
- Pas d'animations GSAP complexes → `gpt-taste`
- Pas de redesign d'existant → `redesign-existing-projects`

## Paramètres implicites pour ce projet

Pour le portfolio Maxime Luet, les dials par défaut sont :

```
DESIGN_VARIANCE: 7    (éditorial, pas Awwwards-chaos)
MOTION_INTENSITY: 4   (discret, GSAP autorisé seulement en phase animation)
VISUAL_DENSITY: 2     (airy éditorial, pas cockpit)
```

Toujours lire `DESIGN.md` + `docs/93` avant d'invoquer ce skill sur ce projet.

## Contraintes projet supplémentaires (hors skill)

- Pas de `framer-motion` / `motion` — GSAP uniquement, phase animation seulement
- Pas de dark mode (light éditorial uniquement)
- Tokens sémantiques obligatoires (pas de hex en dur)
- Plus Jakarta Sans uniquement (JetBrains Mono en accent rare)
