# MethodSection

## Rôle
Section "Method" de la home : 5 principes de travail présentés en liste ordonnée avec numéraux éditoriaux.

## Props
Aucune prop — contenu statique (`principles` const).

## Tokens Lyse utilisés
- `--muted` → fond de section
- `--foreground` → couleur des numéraux décoratifs (opacity 0.06)
- `--border` → divider scroll-reveal (css animation-timeline)
- `--primary` → titres
- `--text-secondary` → corps de texte

## Variants / états
- `.method-reveal` : classe ciblée par scroll-driven animation CSS (`animation-timeline: scroll()`) définie dans `global.css` — pas de JS.

## Décisions design
`clamp(3.5rem, 7vw, 5.5rem)` via `inline style` pour les numéraux : valeur fluide custom que Tailwind v4 ne peut pas exprimer nativement sans config arbitraire. Faux positif Lyse spacing.
