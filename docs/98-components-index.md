# Components Index

> Index master de tous les composants du projet.
> Mis à jour à chaque composant créé ou modifié (voir docs/00-workflow-protocol.md §4).
> Généré manuellement — ne pas supprimer les lignes existantes sans vérifier que le composant est supprimé.

---

## Index

| Composant | Catégorie | Fichier | Doc .md | Tokens Lyse | Notes |
|---|---|---|---|---|---|
| `StickyNav` | layout | `components/layout/StickyNav.tsx` | — | `--color-background`, `--color-foreground` | Client — scroll state |
| `Footer` | layout | `components/layout/Footer.tsx` | — | `--color-muted`, `--color-border` | Server |
| `Hero` | hero | `components/hero/Hero.tsx` | — | `--color-hero-bg`, `--color-hero-deep` | Server wrapper + Client pour animations |
| `WorkSection` | home | `components/home/WorkSection.tsx` | — | — | Server |
| `AboutSection` | home | `components/home/AboutSection.tsx` | — | — | Server |
| `MethodSection` | home | `components/home/MethodSection.tsx` | — | — | Server |
| `SystemSection` | home | `components/home/SystemSection.tsx` | — | — | Client — états interactifs |
| `CaseStudyLayout` | case-study | `components/case-study/CaseStudyLayout.tsx` | — | — | Server — MDX wrapper |
| `CaseFigure` | case-study | `components/case-study/CaseFigure.tsx` | — | — | Server — image + caption |

---

## Légende

- **Doc .md** : `—` = pas encore créé, `✅` = à jour, `⚠️` = à mettre à jour
- **Tokens Lyse** : tokens CSS custom utilisés (depuis `@theme inline` dans globals.css)
- **Notes** : Server / Client, comportements notables

---

## Template pour ajout

Copier-coller cette ligne et remplir :

```
| `ComponentName` | catégorie | `components/cat/ComponentName.tsx` | `components/cat/ComponentName.md` | `--color-X` | Server/Client — note |
```
