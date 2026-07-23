# PipelineDiagram

## Rôle
Diagramme éditorial du flux design → dev (ex. Figma → Zeplin → Storybook → React)
pour illustrer un pipeline d'outils dans une étude de cas MDX. Alternative à
`CaseFigure` quand le visuel est un schéma généré, pas une capture d'écran.

## Props
| Prop | Type | Défaut | Description |
|---|---|---|---|
| `steps` | `{ tool: string; role: string }[]` | — | Étapes du pipeline, dans l'ordre (ex. Figma → Zeplin → Storybook → React) |
| `caption` | `string?` | — | Texte de légende affiché sous le diagramme |

## Tokens Lyse utilisés
- `--border` → bordure du cadre
- `--muted` → fond du cadre
- `--text-primary` → nom de chaque outil
- `--text-tertiary` → rôle de chaque étape, flèches, légende

## Variants / états
- **Mobile** — étapes empilées verticalement, flèches pointant vers le bas.
- **Desktop (`sm:`)** — étapes en ligne, flèches pointant vers la droite.

## Décisions design
`steps` est une prop (pas une liste codée en dur) car le composant sert
plusieurs case studies avec des pipelines différents (eKonsilio : Figma →
Zeplin → Storybook → React ; Mention : Figma → Zeplin → Jira → Development).
Pas de couleur décorative, traits fins, typographie du système — cf. règle
DESIGN.md contre les "decorative process maps".
