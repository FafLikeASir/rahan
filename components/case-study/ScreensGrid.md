# ScreensGrid

## Rôle
Grille de miniatures pour montrer la *largeur* d'un design system ou d'un
produit (plusieurs écrans distincts) en un seul visuel, sans les traiter
chacun comme une figure à part entière — une seule légende partagée.

## Props
| Prop | Type | Défaut | Description |
|---|---|---|---|
| `images` | `{ src: string; alt: string }[]` | — | Captures à afficher, dans l'ordre |
| `caption` | `string?` | — | Légende unique affichée sous la grille |

## Tokens Lyse utilisés
- `--text-tertiary` → légende

## Variants / états
- **Mobile** — une colonne, cellules empilées.
- **Desktop (`sm:`)** — 3 colonnes.

## Décisions design
Chaque image est en `object-contain` dans une cellule de hauteur fixe — pas
de crop, cohérent avec `CaseFigure`. Pas de lightbox ni d'interaction : ces
miniatures illustrent une ampleur, elles ne remplacent pas une exploration
détaillée de chaque écran.
