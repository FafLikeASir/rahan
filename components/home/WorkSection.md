# WorkSection

## Rôle
Section "Work" de la home : liste des études de cas (bento table 7 colonnes) + section "Elsewhere".

## Props
Aucune prop — données depuis `@/data/case-studies`.

## Tokens Lyse utilisés
- `--hero-warm-orange` / `--hero-warm-slate` → gradient overlay ligne featured (estorie)
- `--border` (via `foreground/[8%]`) → séparateurs entre lignes
- `--foreground` / `--text-secondary` / `--muted-foreground` → hiérarchie de lecture
- `--text-initial` (via classe `text-initial`) → taille police de la grande initiale en cas study header

## Variants / états
- Ligne `featured` (slug `estorie`) : fond orange teinté + overlay gradient + couleurs inversées (texte blanc)
- Ligne default : fond transparent, couleurs standard

## Décisions design
Grille 7 colonnes sur desktop (col 1 et 7 = gouttières) reproduit le layout éditorial du hero — décision `docs/93-creative-direction.md`.
Les valeurs `clamp(40px, 4.5vw, 64px)` et `clamp(22px, 2.5vw, 32px)` sont des fontes fluides — faux positifs Lyse spacing.
`0.035em` est un `letter-spacing` typographique, pas un spacing UI.
