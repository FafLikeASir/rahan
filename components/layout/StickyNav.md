# StickyNav

## Rôle
Navigation fixe en haut de page : liens de sections, badge disponibilité, menu mobile.

## Props
Aucune prop — liens hardcodés (cf. `docs/94-information-architecture.md §5`).

## Tokens Lyse utilisés
- `--glass-bg` / `--glass-border` → fond frosted glass au scroll (via Tailwind)
- `--badge-accent-bg` / `--badge-accent-border` / `--accent` → badge "Available"
- `rgba(52,211,153,0.55)` → glow émeraude sur le dot du badge (faux positif Lyse, pas de token pour glow)
- `--background` → fond navbar pré-scroll

## Variants / états
- `scrolled = false` : fond transparent, couleur texte claire (mode hero)
- `scrolled = true` : glass morphism, backdrop-blur, ombre légère
- Menu mobile : état `menuOpen` géré localement par `useState`
- Max-width container : 1440px (breakpoint layout, pas de token — intentionnel)

## Décisions design
Le gradient de fond navbar scrollée (`rgba(255,255,255,0.05)→0.20`) est appliqué en `inline style` car Tailwind v4 ne supporte pas les gradients avec opacité arbitraire sur CSS vars. Candidat à tokeniser si ce pattern se répète.
`50px` de top dans le menu mobile est un offset visuel lié à la hauteur fixe du header — pas un token d'espacement.
