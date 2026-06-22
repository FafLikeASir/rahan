# gpt-taste — Guide d'usage

## Quand invoquer

- Ajout d'**animations GSAP** (ScrollTrigger, pinning, stacking, scrubbing)
- Implémentation de **micro-interactions** premium (parallax, magnetic hover, reveal)
- Section qui demande un niveau motion **Awwwards** (rare sur ce projet)

## Ce que ce skill fait

- Python-driven randomization pour casser les defaults LLM
- Structure AIDA stricte pour les pages
- GSAP ScrollTriggers avancés (canoniques — pas de window.addEventListener)
- Bento grids mathématiquement parfaits, gapless

## Ce que ce skill ne fait PAS

- Pas de layout statique (→ `design-taste-frontend`)
- Pas de redesign (→ `redesign-existing-projects`)

## Contraintes projet impératives (AVANT d'invoquer)

Ce skill est conçu pour des projets Awwwards sans contraintes de sobriété.
**Sur ce portfolio, l'invoquer avec ces garde-fous :**

- `MOTION_INTENSITY` max 5 (pas de scroll-hijack full-page)
- `DESIGN_VARIANCE` max 7 (éditorial, pas Awwwards-chaos)
- Pas de `framer-motion` / `motion` — GSAP uniquement
- `prefers-reduced-motion` toujours implémenté
- Valider les animations proposées avec Maxime AVANT d'implémenter

## Phase d'utilisation

Ce skill est réservé à la **phase animation** du projet (phase 3 du workflow §9).
Ne pas l'invoquer pendant la phase structure (1) ou content (2).
