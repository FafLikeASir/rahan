# Footer

## Rôle
Pied de page : avatar + nom (gauche), copyright (centre), icônes GitHub + LinkedIn (droite).

## Props
Aucune prop — contenu statique.

## Tokens Lyse utilisés
- `--border` → bordure supérieure
- `--background` → fond
- `--text-secondary` → nom et icônes
- `--text-tertiary` → copyright

## Variants / états
Hover sur les icônes : `text-secondary` → `text-primary` (transition-colors).

## Décisions design
`id="contact"` conservé pour ancrer le lien nav `#contact` (décision IA §4).
Layout 3 colonnes CSS Grid sur desktop, stack centré sur mobile (< sm).
Avatar 32px desktop / 28px mobile — même pattern que StickyNav.
