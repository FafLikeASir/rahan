# CaseLink

## Rôle
Lien vers un repo GitHub dans les études de cas MDX — texte souligné avec
icône, sur sa propre ligne, juste après la figure ou le paragraphe auquel il
se rapporte.

## Props
| Prop | Type | Défaut | Description |
|---|---|---|---|
| `href` | `string` | — | URL du repo (ouvert dans un nouvel onglet) |
| `children` | `React.ReactNode` | — | Libellé du lien |

## Tokens Lyse utilisés
- `--text-secondary` → couleur du texte
- `--primary` → couleur du texte au hover

## Variants / états
- **Hover** — le texte passe de `text-secondary` à `primary`.

## Décisions design
Deux allers-retours en review design (`/design-taste-frontend`) avant cette
version :

1. Première version : lien inline souligné dans une phrase. Problème : un
   lien texte enfoui au milieu d'une phrase se perd, aucune distinction
   visuelle, facile à survoler sans le voir.
2. Deuxième version : pill bordée reprenant le style de `ToolTag`
   (`CaseStudyLayout.tsx` — bordure `border-border`, `rounded-sm`). Problème :
   ça faisait ressembler le lien à un tag d'outil (Figma/React/...) plutôt
   qu'à un lien vers un repo vivant — confusion entre "ceci décrit la stack"
   et "ceci mène vers du code".
3. Version retenue : lien texte souligné (icône + libellé), sans bordure,
   reprenant le style du lien "Website" du header (`CaseStudyLayout.tsx:179-189`
   — `underline underline-offset-2`, `text-secondary`/`hover:primary`), mais
   sur sa propre ligne (`<div className="my-4">`) plutôt qu'inline dans une
   phrase — garde l'avantage de la version 2 (visible, pas noyé dans le texte)
   sans le défaut (confusion avec les tags d'outils).

L'icône GitHub est un SVG inline (pas de dépendance ajoutée) : la version
installée de `lucide-react` n'a plus de marque de marque (`Github` est
`undefined` sur le package), et ajouter un package d'icônes entier pour un
seul glyphe n'en valait pas la peine.
