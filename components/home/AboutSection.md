# AboutSection

## Rôle
Section bio de la home : texte de présentation, deux mini-blocs (Currently / Looking for), photo placeholder.

## Props
Aucune prop — contenu statique (cf. `docs/00-brief-global.md §About`).

## Tokens Lyse utilisés
- `--border` → séparateur et bordure photo
- `--muted` / `--secondary` → dégradé fond photo placeholder
- `--text-secondary` / `--text-tertiary` → hiérarchie de lecture
- `--primary` → titre et labels

## Variants / états
Aucun.

## Décisions design
La photo est un placeholder `<div>` avec initiales "ML" — `next/image` sera utilisé quand la photo sera disponible (commentaire inline).
`5rem` dans le `style` du span des initiales est un override fontSize pour les initiales décoratives, pas un spacing token.
