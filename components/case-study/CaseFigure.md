# CaseFigure

## Rôle
Placeholder de visuel dans les études de cas MDX — figure avec légende optionnelle.

## Props
| Prop | Type | Défaut | Description |
|---|---|---|---|
| `caption` | `string?` | — | Texte de légende affiché sous le visuel |
| `label` | `string?` | `'Visual'` | Label centré dans le placeholder |

## Tokens Lyse utilisés
- `--border` → bordure du placeholder
- `--muted` → fond du placeholder
- `--text-tertiary` → label et légende

## Variants / états
Aucun — composant purement statique.

## Décisions design
Composant placeholder ; quand les visuels réels seront disponibles, le `<div>` intérieur sera remplacé par `<next/image>` en conservant la structure `<figure>`.
