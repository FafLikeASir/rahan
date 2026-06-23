# Components Index

> Master index of all project components.
> Updated whenever a component is created or modified (see docs/00-workflow-protocol.md §4).
> Generated manually — do not delete existing rows without verifying the component has been removed.

---

## Index

| Component | Category | File | Doc .md | Lyse tokens | Notes |
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

## Legend

- **Doc .md**: `—` = not yet created, `✅` = up to date, `⚠️` = needs updating
- **Lyse tokens**: custom CSS tokens used (from `@theme inline` in globals.css)
- **Notes**: Server / Client, notable behaviors

---

## Template for additions

Copy-paste this row and fill in:

```
| `ComponentName` | category | `components/cat/ComponentName.tsx` | `components/cat/ComponentName.md` | `--color-X` | Server/Client — note |
```
