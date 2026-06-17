# Hero

## Rôle
Section plein viewport du haut de page : nom, titre, stats, badge disponibilité, et arrière-plan animé GSAP.

## Props
Aucune prop — contenu entièrement statique (cf. `docs/00-brief-global.md`).

## Tokens Lyse utilisés
- `--hero-bg` (#1f1f1f) → fond base (inline style `backgroundColor`)
- `--hero-warm-orange` (#fb3706) → blob orange (inline gradient)
- `--hero-warm-slate` → blob slate (inline gradient)
- `--hero-grid` → couleur lignes de grille
- `--hero-grid-size` → taille cellule grille
- `--badge-accent-bg` / `--badge-accent-border` / `--accent` → badge "Open"
- `--text-initial` (120px) → initiale décorative

## Variants / états
- État initial : opacité 0 sur tous les éléments texte (GSAP timeline à l'entrée)
- Mouse parallax : blobs suivent le curseur (`mousemove` → GSAP quickTo)
- Blob breathing : animation GSAP `yoyo` sur scale/opacity
- `prefers-reduced-motion` : désactive toutes les animations GSAP

## Décisions design
Les valeurs de spacing pixel dans les animations GSAP (40px, 52px, 300px…) sont des offsets d'animation, pas des tokens d'espacement UI — faux positifs Lyse `tokens/no-hardcoded-spacing`.
Les `rgba(255,255,255,0.08)` dans `diagonalPattern` sont des valeurs de superposition de bruit sans token équivalent dans le DS — à tokeniser si réutilisés ailleurs.
Stats label `rgba(255,255,255,0.72)` : hors échelle des tokens `--hero-text-*` existants — à tokeniser si réutilisé ailleurs.
