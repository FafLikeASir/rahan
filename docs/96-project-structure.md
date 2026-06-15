# Portfolio Maxime Luet — Project Structure & Dev Guidelines

> Lecture obligatoire par Claude Code avant toute action. Ce fichier cadre
> l'architecture du projet, les conventions, et les contraintes techniques.
> Il complète les docs de direction créative (91-95) sur le volet implémentation.
>
> Toute décision non couverte ici : demander à Maxime, ne pas improviser.

---

## 1. Stack

| Couche | Choix | Note |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Pas de Pages Router |
| Langage | **TypeScript** (strict mode) | Pas de JS, pas de `any` |
| Styling | **Tailwind CSS v4** | Utiliser `@theme inline` dans globals.css, pas tailwind.config.js |
| Composants | **shadcn/ui** (base) | Squelette accessibility + comportement, recouvert du design system perso |
| Icônes | **Lucide React** | Outline, 1.5px stroke. Utilisation parcimonieuse |
| Typo | **Plus Jakarta Sans** (Google Fonts, variable) | Mono accent : JetBrains Mono ou Geist Mono |
| Content | **MDX** pour les études de cas | Sépare contenu et composant |
| Hébergement | **Vercel** | Déjà en place |
| DS Audit | **Lyse** (`@lyse-labs/lyse`) | Audit DS + génération AGENTS.md + serveur MCP |
| Package manager | **pnpm** (si dispo) ou npm | Vérifier le lockfile existant |

---

## 2. Structure de fichiers

```
CLAUDE.md                       # Guidelines projet pour Claude Code (= ce fichier, adapté)
AGENTS.md                       # Contrat DS généré par Lyse (ne pas modifier à la main)
src/
├── app/
│   ├── layout.tsx              # Root layout : fonts, metadata globale, <StickyNav>, <Footer>
│   ├── page.tsx                # Home : Hero + Work + Method + System + About (scroll unique)
│   ├── globals.css             # Tailwind v4 @theme inline + CSS variables custom
│   │
│   └── work/
│       └── [slug]/
│           └── page.tsx        # Route dynamique études de cas (MDX loader)
│
├── components/
│   ├── ui/                     # Composants shadcn/ui (installés par CLI, modifiés ensuite)
│   │
│   ├── layout/                 # Composants structurels partagés
│   │   ├── sticky-nav.tsx
│   │   ├── section.tsx         # Wrapper de section avec id d'ancre
│   │   ├── container.tsx       # Largeur contrainte
│   │   └── footer.tsx
│   │
│   ├── hero/                   # Composants du hero cinématographique
│   │   ├── hero.tsx            # Bloc complet
│   │   ├── hero-mesh.tsx       # Mesh gradients animés
│   │   ├── hero-grid.tsx       # Grid lines
│   │   ├── hero-glass.tsx      # Glass elements
│   │   └── hero-content.tsx    # Texte + badge + ligne Figma→prod
│   │
│   ├── home/                   # Sections de la home
│   │   ├── work-section.tsx    # 3 cartes + Elsewhere
│   │   ├── work-card.tsx       # Carte vitrine individuelle
│   │   ├── elsewhere.tsx       # Bandeau expériences hors-vitrine
│   │   ├── method-section.tsx  # 5 principes
│   │   ├── system-section.tsx  # Section composants "modéré+"
│   │   └── about-section.tsx   # About + Currently + What I'm looking for
│   │
│   └── case-study/             # Gabarit d'étude de cas
│       ├── case-study-layout.tsx    # Enveloppe partagée
│       ├── case-study-header.tsx    # Visuel d'ouverture + méta
│       ├── case-study-footer.tsx    # ← Work + Next case →
│       └── case-study-figure.tsx    # Image/schéma intercalé avec caption
│
├── content/                    # Contenu MDX des études de cas
│   ├── mention.mdx
│   ├── ekonsilio.mdx
│   └── estorie.mdx             # À écrire plus tard
│
├── lib/
│   ├── utils.ts                # cn() et helpers
│   ├── fonts.ts                # Chargement Plus Jakarta Sans + mono
│   └── case-studies.ts         # Metadata + loader des études de cas (slug, titre, ordre)
│
├── data/
│   └── case-studies.ts         # Données structurées : titre, rôle, période, slug, etc.
│
└── public/
    ├── images/
    │   ├── og/                 # Open Graph images (home + par étude de cas)
    │   ├── cases/              # Captures produit des études de cas
    │   │   ├── mention/
    │   │   ├── ekonsilio/
    │   │   └── estorie/
    │   └── about/              # Photo perso
    └── cv/
        └── maxime-luet-cv.pdf
```

---

## 3. Routing (App Router)

**Deux niveaux seulement.** Pas de nesting plus profond.

| Route | Type | Fichier | Contenu |
|---|---|---|---|
| `/` | Statique | `app/page.tsx` | Home scroll unique (6 sections + ancres) |
| `/work/mention` | Statique | `app/work/[slug]/page.tsx` | Étude de cas Mention |
| `/work/ekonsilio` | Statique | `app/work/[slug]/page.tsx` | Étude de cas eKonsilio |
| `/work/estorie` | Statique | `app/work/[slug]/page.tsx` | Étude de cas eStorie |
| `/work/making-this` | Statique | `app/work/[slug]/page.tsx` | v1.1 post-launch |

**Pas de page `/work` index.** La vitrine `#work` sur la home joue ce rôle.

**`generateStaticParams`** dans `app/work/[slug]/page.tsx` pour pré-rendre
toutes les études de cas au build.

**Anchors home :** `#hero`, `#work`, `#method`, `#system`, `#about`, `#contact`.

---

## 4. Server vs Client Components

**Par défaut : Server Component.** `"use client"` uniquement quand nécessaire.

| Composant | Server / Client | Raison |
|---|---|---|
| `app/layout.tsx` | Server | Metadata, fonts |
| `app/page.tsx` | Server | Assemblage statique |
| `<StickyNav>` | **Client** | `useState` pour scroll state (transparent → opaque) |
| `<Hero>` | Server wrapper + **Client** pour mesh/glass | Animations CSS, éventuellement `useEffect` pour le sweep |
| `<HeroMesh>` | **Client** | Animations, potentiellement mouse interaction plus tard |
| `<WorkCard>` | Server | Statique |
| `<MethodSection>` | Server | Statique |
| `<SystemShowcase>` | **Client** | Composants interactifs avec états (hover, focus, toggle) |
| `<About>` | Server | Statique |
| `<Footer>` | Server | Statique |
| `<CaseStudyLayout>` | Server | MDX rendu côté serveur |
| Composants MDX | Server | Contenu statique |

**Règle :** ne jamais mettre `"use client"` sur un composant qui n'utilise pas
`useState`, `useEffect`, `useRef`, ou des event handlers du navigateur.

---

## 5. Styling — Conventions

### 5.1 Architecture des tokens

shadcn/ui amène ses propres CSS variables (`--background`, `--foreground`,
`--primary`, etc.) dans `globals.css`. **On les garde et on les override** avec
les valeurs du design system de Maxime. On ne crée pas un système parallèle.

```css
/* globals.css — @theme inline (Tailwind v4) */
@theme inline {
  /* Override des tokens shadcn avec la palette Maxime */
  --color-background: #ffffff;
  --color-foreground: #0f172a;       /* slate-900 */
  --color-primary: #1d4ed8;          /* blue-700 — accent */
  --color-primary-foreground: #ffffff;
  --color-muted: #f8fafc;            /* slate-50 */
  --color-muted-foreground: #475569; /* slate-600 */
  --color-border: #e2e8f0;           /* slate-200 */
  /* ... etc, mapper tout le token set shadcn */

  /* Tokens custom Maxime (hors shadcn) */
  --color-hero-bg: #0c1929;
  --color-hero-deep: #0f2847;
  --color-hero-mid: #0e4a6e;
  --color-hero-teal: #0a5c5e;
  --color-hero-green: #07694a;
  --color-gradient-from: #2563eb;    /* blue-600 */
  --color-gradient-to: #059669;      /* emerald-600 */
  --color-text-tertiary: #94a3b8;    /* slate-400 */
  --color-border-strong: #cbd5e1;    /* slate-300 */
}
```

### 5.2 Règles Tailwind

- **Utiliser les tokens sémantiques shadcn** : `bg-background`, `text-foreground`,
  `text-muted-foreground`, `border-border`. Jamais `bg-white` ou `text-slate-900`
  en dur dans les composants.
- **Les tokens custom** (hero, gradient) s'utilisent via les classes Tailwind
  correspondantes : `bg-hero-bg`, `from-gradient-from to-gradient-to`, etc.
- **`gap-*` au lieu de `space-y-*`**. Toujours.
- **`size-*` quand width = height.** `size-10` pas `w-10 h-10`.
- **`cn()` pour les classes conditionnelles.** Import depuis `@/lib/utils`.
- **Pas de `dark:` overrides.** Light only au launch.

### 5.3 Composants shadcn/ui

- Installés via CLI (`npx shadcn@latest add <component>`).
- **Modifiés dans `src/components/ui/`** pour appliquer le style Maxime.
- Le rendu final ne doit PAS ressembler à du shadcn par défaut (red flag 2).
- **Composants à installer au démarrage** (prévision) : `button`, `badge`,
  `separator`, `card` (peut-être pour les WorkCards). Le reste au besoin.
- **Ne pas installer de composants inutiles.** Le portfolio est simple.

---

## 6. Typographie

```css
/* Dans globals.css ou via next/font */
--font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;  /* accent rare seulement */
```

**Chargement via `next/font/google`** dans `src/lib/fonts.ts` :
- Plus Jakarta Sans : weights 400, 500, 600, 700, 800
- Mono : weight 400 seulement (usage rare — section System, labels de spec)

**`font-display: swap`** obligatoire (performance).

**Hiérarchie type :**

| Rôle | Taille | Weight | Token couleur |
|---|---|---|---|
| H1 (hero) | 48-56px | 800 | `#ffffff` (hero) / `foreground` (page) |
| H2 (section title) | 32-36px | 700 | `foreground` |
| H3 (sous-titre) | 22-24px | 600 | `foreground` |
| Body | 16px | 400 | `foreground` |
| Body small | 14-15px | 400 | `muted-foreground` |
| Caption / méta | 12-13px | 500 | `text-tertiary` |
| Mono accent | 13-14px | 400 | `muted-foreground` |

---

## 7. Contenu MDX

Les études de cas sont en **MDX** dans `src/content/`. Le composant
`<CaseStudyLayout>` fournit l'enveloppe (header, footer, navigation).
Le contenu MDX fournit l'intérieur (sections libres par cas).

**Composants MDX disponibles :**
- `<CaseStudyFigure>` — image avec caption
- Headings H2/H3 — rendus avec la typo du design system
- Paragraphes — rendus en body 16px
- Blockquotes — pour les citations ou les verbatims visuels
- Code blocks (mono) — pour les exemples de tokens/code si pertinent

**Metadata par étude de cas** dans `src/data/case-studies.ts` :

```ts
export const caseStudies = [
  {
    slug: 'estorie',
    title: 'Building a startup\'s entire product, from design system to production',
    role: 'Founding Product Designer',
    period: '2025–Present',
    type: 'Startup B2B2C',
    scope: 'Sole designer',
    order: 1,
  },
  {
    slug: 'mention',
    title: 'Refondre le design system d\'un SaaS B2B',  // à traduire EN
    role: 'Product Designer, UI & Design System',
    period: '2022–2024',
    type: 'SaaS B2B',
    scope: 'Sole designer, collaborating with product team and developers',
    order: 2,
  },
  {
    slug: 'ekonsilio',
    title: 'Building a startup\'s first product, from Figma to React',
    role: 'Founding UI/UX Designer & Front-end Developer',
    period: '2019–2022',
    type: 'B2B SaaS',
    scope: 'UI, design system, front-end React · Working with one fullstack developer, then a growing team',
    order: 3,
  },
] as const;
```

---

## 8. Navigation

**Nav sticky 4 liens** — présente sur toutes les pages.

```
Maxime Luet         Work · Method · About · Contact
```

**Comportement :**
- Sur la home : les liens sont des ancres (`#work`, `#method`, `#about`, `#contact`)
- Sur une étude de cas : les liens pointent vers `/#work`, `/#method`, etc.
- Le nom "Maxime Luet" à gauche est un lien vers `/`
- **Dans le hero :** fond transparent, texte blanc
- **Hors hero (après scroll):** fond blanc, texte `foreground` / `muted-foreground`
- Transition au scroll : `backdrop-filter: blur()` + opacité de fond progressive

**`scroll-behavior: smooth`** activé dans `globals.css`.

---

## 9. SEO & Metadata

**`<title>` par page :**
- Home : `Maxime Luet — Product Designer who codes`
- Étude de cas : `[Titre du cas] — Maxime Luet`

**`<meta description>` :** 1 phrase dérivée du contenu, par page.

**Open Graph :**
- Image par page (home : image dédiée, études de cas : visuel d'ouverture)
- Utiliser `generateMetadata` dans chaque `page.tsx`

**Technique :**
- `sitemap.ts` généré automatiquement (Next.js App Router)
- `robots.txt` permissif
- Canonical URLs

---

## 10. Performance

- **Images : `next/image`** partout. Pas de `<img>` natif.
- **Fonts : `next/font/google`** avec `display: swap`.
- **CSS animations hero :** `transform` et `opacity` seulement (GPU-composité).
  `will-change: transform` sur les éléments animés du hero.
- **`prefers-reduced-motion`** : toutes les animations désactivées. Vérifier.
- **Pas de JS lourd au load.** Le hero est CSS pur (pas de canvas/WebGL au launch).
- **Lazy load des images** dans les études de cas (comportement par défaut de `next/image`).

---

## 11. Accessibilité

- **Contrastes WCAG AA minimum** sur tout le site (vérifier les tokens accent
  sur fond blanc — le piège classique du light mode).
- **Focus visible** sur tous les éléments interactifs (shadcn le gère déjà).
- **Skip-to-content link** masqué (apparaît au focus clavier).
- **Landmarks ARIA** : `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`.
- **Alt text** sur toutes les images (y compris les captures produit).
- **`lang="en"`** sur le `<html>`.

---

## 12. Conventions de nommage

| Type | Convention | Exemple |
|---|---|---|
| Fichier composant | kebab-case | `sticky-nav.tsx` |
| Export composant | PascalCase | `export function StickyNav()` |
| Fichier utilitaire | kebab-case | `case-studies.ts` |
| CSS variable custom | kebab-case avec préfixe | `--color-hero-bg` |
| Route slug | lowercase kebab | `/work/ekonsilio` |
| Image asset | kebab-case dans sous-dossier | `images/cases/mention/hero.webp` |

**Exports :** préférer les **named exports** (`export function X`) sauf pour
les `page.tsx` et `layout.tsx` (export default requis par Next.js).

---

## 13. Git & workflow

- **Commits en anglais**, conventionnels : `feat:`, `fix:`, `style:`, `docs:`.
- **Branche `main`** pour la production (Vercel auto-deploy).
- **Branche `dev`** pour le travail en cours. Merge dans `main` quand un bloc
  est prêt.

### Lyse — Design System audit

**Quand l'activer :** dès que les tokens `@theme inline` et les 3-4 premiers
composants sont en place (pas avant — Lyse a besoin de matière à auditer).

**Workflow :**
1. `npx lyse audit` — vérifier le Health Score après chaque batch de composants
2. `lyse agents > AGENTS.md` — régénérer le contrat DS après chaque ajout/modif
   de token ou composant. Ce fichier est lu par Claude Code en début de session.
3. `lyse mcp` — optionnel, pour les sessions Claude Code longues où l'agent
   doit interroger les tokens en temps réel.

**AGENTS.md** vit à la racine du projet, à côté de CLAUDE.md. Il est généré,
pas écrit à la main. Ne pas le modifier manuellement — relancer `lyse agents`.

---

## 14. Documents de référence

Ces fichiers contiennent les décisions de design et de contenu. Claude Code
doit les lire avant de toucher au contenu ou au style :

| Fichier | Contient |
|---|---|
| `00-brief-global.md` | Brief chapeau, architecture, contenu validé (hero, vitrine, method, about) |
| `91-brand-discovery.md` | Territoires d'identité, analyse concurrence visuelle |
| `92-creative-brief.md` | Direction visuelle, voix, scope, contraintes |
| `93-creative-direction.md` | 4 axes esthétiques (Conversational, Editorial Restrained, Peer, Considered) |
| `94-information-architecture.md` | Sitemap, nav, gabarit étude de cas, labels, routing |
| `95-hero-visual-spec.md` | Spécification visuelle complète du hero cinématographique |
| `11–16-fiche-*.md` | Fiches expériences (contenu factuel) |
| `etude-de-cas-mention.md` | Étude de cas Mention rédigée |
| `case-study-ekonsilio.md` | Étude de cas eKonsilio rédigée |
| `AGENTS.md` (racine projet) | Contrat DS généré par Lyse — tokens, composants, conventions. Régénéré, pas écrit à la main |

---

## 15. Ce qu'on ne fait PAS

Liste fermée — si Claude Code est tenté de faire l'un de ces points,
c'est un signal d'arrêt.

- **Pas de Pages Router.** App Router uniquement.
- **Pas de `getServerSideProps` / `getStaticProps`.** C'est du Pages Router.
- **Pas de `_app.tsx` / `_document.tsx`.** Idem.
- **Pas de API routes** (pas de backend, site statique).
- **Pas de base de données.** Contenu en MDX + data files.
- **Pas de CMS.** Le contenu est versionné dans le repo.
- **Pas de i18n.** Anglais uniquement (textes séparés pour permettre le FR plus tard).
- **Pas de dark mode.** Light only au launch.
- **Pas de toggle light/dark.**
- **Pas de page `/work` index.** La vitrine `#work` est sur la home.
- **Pas de blog.** Hors scope.
- **Pas de formulaire de contact.** Lien email + LinkedIn + CV PDF.
- **Pas de canvas/WebGL** au launch (hero CSS pur).
- **Pas de bibliothèque d'animation tierce** (framer-motion, GSAP…). CSS only.
  Si un composant nécessite une animation complexe, discuter d'abord.
- **Pas de composants shadcn inutiles.** Installer au cas par cas.
- **Pas de `bg-white` ou `text-black` en dur.** Tokens sémantiques.
