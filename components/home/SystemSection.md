# SystemSection

## Rôle
Section "System" de la home : vitrine interactive des tokens couleur, de l'échelle typo, et des composants du DS.

## Props
Aucune prop.

## Tokens Lyse utilisés
- `--border` → séparateurs
- `--text-secondary` / `--text-tertiary` → labels
- `--primary` → titres

## Variants / états
- `hoveredToken` (useState) : au survol d'une pastille couleur, affiche la valeur hex au lieu du nom du token.
- Composants Button affichés en variantes : default, outline, ghost, disabled.

## Décisions design
Les valeurs hex (`#ffffff`, `#0f172a`, etc.) dans `colorTokens` sont des **données d'affichage** (le composant documente le DS), pas des usages de couleur — faux positifs Lyse `tokens/no-hardcoded-color`. Ne pas tokeniser.
`'use client'` requis pour `useState` du hover.
