# Button

## Rôle
Composant bouton shadcn/ui restyled — variants default, outline, ghost, link, icon ; sizes sm, default, lg, icon.

## Props
Standard shadcn/ui `ButtonProps` : `variant`, `size`, `asChild`, plus tous les attributs HTML `<button>`.

## Tokens Lyse utilisés
- `--primary` / `--primary-foreground` → variant default
- `--accent` / `--accent-foreground` → hover accent
- `--border` → variant outline
- `--background` → fond variant outline

## Variants / états
- `default` : fond primaire, texte inversé
- `outline` : bordure, fond transparent → fond background au hover
- `ghost` : transparent → fond muted au hover
- `link` : texte souligné
- `icon` : carré, taille fixe
- `disabled` : opacity-50, curseur interdit

## Décisions design
Spacings `10px`/`12px`/`0.8rem` dans CVA sont des valeurs fine-tuning pour matcher le DS custom — non remplaçables par classes Tailwind standard sans perdre le pixel-pass. Faux positifs Lyse.
