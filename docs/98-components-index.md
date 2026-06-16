# Components Index

> Index master de tous les composants du projet.
> Mis à jour à chaque composant créé ou modifié (voir docs/00-workflow-protocol.md §4).
> Généré manuellement — ne pas supprimer les lignes existantes sans vérifier que le composant est supprimé.

---

## Index

| Composant | Catégorie | Fichier | Doc .md | Tokens Lyse | Notes |
|---|---|---|---|---|---|
| `StickyNav` | layout | `components/layout/StickyNav.tsx` | ✅ | `--glass-bg`, `--badge-accent-bg`, `--badge-accent-border` | Client — scroll state |
| `Footer` | layout | `components/layout/Footer.tsx` | ✅ | `--border`, `--background`, `--text-secondary`, `--text-tertiary` | Server |
| `Hero` | hero | `components/hero/Hero.tsx` | ✅ | `--hero-bg`, `--hero-warm-orange`, `--hero-warm-slate`, `--hero-grid` | Client — GSAP animations, parallax |
| `WorkSection` | home | `components/home/WorkSection.tsx` | ✅ | `--hero-warm-orange`, `--hero-warm-slate`, `--border` | Server |
| `AboutSection` | home | `components/home/AboutSection.tsx` | ✅ | `--border`, `--muted`, `--secondary`, `--text-secondary` | Server |
| `MethodSection` | home | `components/home/MethodSection.tsx` | ✅ | `--muted`, `--foreground`, `--border` | Server — CSS scroll-driven reveals |
| `SystemSection` | home | `components/home/SystemSection.tsx` | ✅ | `--border`, `--text-secondary`, `--text-tertiary` | Client — hover token preview |
| `CaseStudyLayout` | case-study | `components/case-study/CaseStudyLayout.tsx` | ✅ | `--border`, `--background`, `--hero-grid-size`, `--hero-grid`, `--text-initial` | Server — MDX wrapper |
| `CaseFigure` | case-study | `components/case-study/CaseFigure.tsx` | ✅ | `--border`, `--muted`, `--text-tertiary` | Server — image + caption placeholder |
| `Button` | ui | `components/ui/button.tsx` | ✅ | `--primary`, `--accent`, `--border` | shadcn override — variants default/outline/ghost/link/icon |

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
