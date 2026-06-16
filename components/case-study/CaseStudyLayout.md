# CaseStudyLayout

## Rôle
Gabarit de page pour les études de cas : header (visuel, tags, meta), prose MDX, navigation bas de page.

## Props
| Prop | Type | Défaut | Description |
|---|---|---|---|
| `study` | `CaseStudy` | — | Métadonnées de l'étude (titre, rôle, période, tags, couleurs) |
| `children` | `React.ReactNode` | — | Contenu MDX rendu |

## Tokens Lyse utilisés
- `--border` → séparateurs, bordures tags
- `--background` → couleur lignes grille dans le visuel header
- `--hero-grid-size` → taille des cellules de la grille décorative
- `--hero-grid` → opacité couleur grille
- `--text-initial` → initiale géante dans le visuel header
- `--text-secondary` / `--text-tertiary` → meta (role, scope, context)

## Variants / états
- Navigation bas de page : lien "suivant" conditionnel (`study.nextSlug`)

## Décisions design
Le visuel header utilise `study.bgFrom` / `study.bgTo` (couleurs par étude de cas) au lieu de tokens — permet d'avoir une identité visuelle distincte par étude sans créer un token par étude.
Gabarit spec complet : `docs/94-information-architecture.md §6`.
