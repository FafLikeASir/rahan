# redesign-existing-projects — Guide d'usage

## Quand invoquer

- Modernisation d'un **composant existant** sans le réécrire de zéro
- Correction de patterns génériques identifiés dans le codebase
- Audit + fix d'un ensemble de composants

## Ce que ce skill fait

1. **Scan** — lit le code, identifie framework + méthode de styling
2. **Diagnose** — liste les patterns génériques, faiblesses, états manquants
3. **Fix** — applique des upgrades ciblés SANS réécrire de zéro

## Ce que ce skill ne fait PAS

- Ne migre pas de framework
- Ne casse pas la fonctionnalité existante
- Ne crée pas de nouveaux composants (→ `design-taste-frontend`)
- Ne touche pas aux animations GSAP (→ `gpt-taste`)

## Quand NE PAS invoquer

- Pour un composant créé de zéro → `design-taste-frontend`
- Pour une animation → `gpt-taste`
- Pour du code non-UI (utils, data, config) → `ponytail`

## Ordre de priorité des fixes (rappel skill)

1. Font swap — plus grand impact, moindre risque
2. Color palette cleanup
3. Hover/active states
4. Layout et spacing
5. Remplacement de composants génériques
6. Loading/empty/error states
7. Polish typographique
