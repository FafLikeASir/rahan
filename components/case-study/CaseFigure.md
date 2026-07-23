# CaseFigure

## Rôle
Visuel dans les études de cas MDX — figure avec légende optionnelle. Affiche une
image réelle si `src` est fourni, sinon retombe sur un placeholder texte.

## Props
| Prop | Type | Défaut | Description |
|---|---|---|---|
| `caption` | `string?` | — | Texte de légende affiché sous le visuel |
| `label` | `string?` | `'Visual'` | Label centré dans le placeholder (si pas de `src`) ; fallback d'`alt` sinon |
| `src` | `string?` | — | Chemin de l'image réelle (`/case-studies/<slug>/...`) |
| `alt` | `string?` | `label` | Texte alternatif de l'image |

## Tokens Lyse utilisés
- `--border` → bordure du cadre (placeholder uniquement)
- `--muted` → fond du cadre (placeholder uniquement)
- `--text-tertiary` → label du placeholder et légende

## Variants / états
- **Placeholder** (pas de `src`) — cadre `border-border`/`bg-muted` avec `label` centré.
- **Image** (`src` fourni) — `next/image` en `object-contain`, sans cadre ni padding : les
  captures Figma ont déjà leur propre ombre/style, un cadre supplémentaire est redondant.

## Décisions design
Le `<div>` placeholder n'est remplacé par `<next/image>` que lorsque `src` est
fourni — les deux comportements cohabitent dans le même composant plutôt que
d'avoir un composant séparé par cas d'usage.
