# Claude Code — Starter Checklist

> Ce fichier décrit les étapes d'initialisation du projet portfolio. Exécuter
> dans l'ordre, une seule fois, au premier lancement de Claude Code sur le repo.
>
> Prérequis : Node.js 20+, pnpm (ou npm), Claude Code installé.

---

## Phase 0 — Lire la doc avant tout

Avant toute commande, Claude Code lit ces fichiers dans cet ordre :

1. `docs/96-project-structure.md` — architecture, stack, contraintes (= le CLAUDE.md)
2. `docs/97-skill-orchestration.md` — quel skill/doc pour quelle tâche
3. `docs/95-hero-visual-spec.md` — spec visuelle du hero
4. `docs/93-creative-direction.md` — les 4 axes esthétiques + liste de rejet

**Règle :** ne rien coder avant d'avoir lu au minimum le 96 et le 97.

---

## Phase 1 — Initialiser le projet Next.js

```bash
# Créer le projet Next.js 15 avec App Router + TypeScript + Tailwind v4
pnpm create next-app@latest portfolio --typescript --tailwind --app --src-dir --import-alias "@/*"
cd portfolio
```

**Vérifier après init :**
- `src/app/layout.tsx` existe (App Router, pas Pages Router)
- `tailwind.config.ts` n'est PAS nécessaire (Tailwind v4 utilise @theme dans CSS)
- `src/app/globals.css` contient les directives Tailwind v4

---

## Phase 2 — Initialiser shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

**Choix lors de l'init :**
- Style : Default (on override tout ensuite)
- Base color : Slate
- CSS variables : Yes
- Prefix : (aucun)
- src/components/ui : Oui (confirmer le chemin `src/components/ui`)

**Installer les composants de base :**
```bash
pnpm dlx shadcn@latest add button badge separator
```

Les autres composants s'ajoutent au besoin, pas en avance.

---

## Phase 3 — Installer les plugins Claude Code

### Ponytail (YAGNI enforcer)
```bash
# Depuis le marketplace Claude Code :
/plugins
# → Sélectionner Ponytail, installer

# OU manuellement :
git clone https://github.com/DietrichGebert/ponytail.git .ponytail-ref
# Copier les hooks et skills nécessaires

# Activer en mode full (défaut)
/ponytail full
```

**Quand l'utiliser :**
- Actif par défaut pendant tout le build
- Mode `full` : YAGNI enforcer standard — pas d'abstraction non demandée,
  pas de scaffolding "pour plus tard", stdlib first
- Mode `lite` : si un composant complexe (hero, SystemShowcase) nécessite
  plus de liberté structurelle — switcher temporairement
- `/ponytail-review` : lancer sur chaque diff avant commit

**Quand le désactiver :**
- Jamais complètement pendant le build
- `lite` temporairement pour les composants à forte densité visuelle (hero)

---

### ui-ux-pro-max-skill (design intelligence)

```bash
# Installer via CLI
npx uipro init --ai claude

# OU manuellement
git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git .uipro-ref
# Copier src/ui-ux-pro-max/ dans .claude/skills/ui-ux-pro-max/
```

**⚠️ CONFIGURATION CRITIQUE :**

Ce skill ne doit PAS se déclencher automatiquement sur les tâches UI.
La direction design (91-95) a priorité absolue. Ce skill sert UNIQUEMENT :
- Comme **base de données de référence** consultée manuellement
  (`python3 search.py "neo-grotesque" --domain typography`)
- Pour les **pre-delivery checks** (validation anti-patterns)
- Pour le **Quick Reference** accessibilité/performance

**Il ne sert PAS à :**
- Générer un design system (le nôtre est déjà défini en 91-95)
- Recommander une palette ou un font pairing (décisions prises)
- Choisir un style visuel (la direction créative est verrouillée)

Si le skill propose des recommandations qui contredisent les docs 91-95,
**les docs 91-95 gagnent. Toujours.**

---

## Phase 4 — Configurer les MCP Servers

### Lyse (Design System Audit)
```bash
# Installer Lyse
pnpm add -D @lyse-labs/lyse

# Vérifier que Lyse peut lire le projet
npx lyse audit
```

**Activer le MCP Server (optionnel, pour les sessions longues) :**
```bash
# Dans Claude Code settings ou .claude/mcp.json :
{
  "mcpServers": {
    "lyse": {
      "command": "npx",
      "args": ["lyse", "mcp"]
    }
  }
}
```

**Workflow Lyse (après les premiers tokens/composants) :**
```bash
npx lyse audit                  # Score de santé
lyse agents > AGENTS.md         # Contrat DS pour Claude Code
```

### Figma (Dev Mode) — optionnel
Si le Dev Mode MCP Server est activé dans Figma Desktop :
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"]
    }
  }
}
```

Pas bloquant pour le build — fallback : exports manuels.

### shadcn/ui MCP — déjà disponible via le skill shadcn
Pas de config supplémentaire. Le skill `shadcn` dans Claude Code peut déjà
chercher les composants et leurs docs.

---

## Phase 5 — Organiser les fichiers du projet

### Placer la documentation
```bash
mkdir -p docs
# Copier tous les fichiers de référence :
# 00-brief-global.md
# 91-brand-discovery.md
# 92-creative-brief.md
# 93-creative-direction.md
# 94-information-architecture.md
# 95-hero-visual-spec.md
# 96-project-structure.md
# 97-skill-orchestration.md
# 11–16-fiche-*.md
# etude-de-cas-mention.md
# case-study-ekonsilio.md
```

### Créer le CLAUDE.md racine
Copier le contenu de `96-project-structure.md` dans `CLAUDE.md` à la racine.
Claude Code le lit automatiquement à chaque session.

### Créer l'arborescence des composants
```bash
mkdir -p src/components/{ui,layout,hero,home,case-study}
mkdir -p src/content
mkdir -p src/lib
mkdir -p src/data
mkdir -p public/images/{og,cases/{mention,ekonsilio,estorie},about}
mkdir -p public/cv
```

---

## Phase 6 — Poser les tokens

### Typographie (src/lib/fonts.ts)
```typescript
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'

export const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
  display: 'swap',
})
```

### Palette (dans src/app/globals.css)
Override les tokens shadcn avec les valeurs de la direction (cf. 96 §5.1).
Ajouter les tokens hero custom (cf. 95 §9).

### Après les tokens — premier audit Lyse
```bash
npx lyse audit
lyse agents > AGENTS.md
```

---

## Phase 7 — Premier composant : le Hero

Le hero est le test des 6 secondes. C'est le premier composant à builder
après les tokens.

**Lire obligatoirement :** `docs/95-hero-visual-spec.md` (TOUT le document).

**Décomposition :**
1. `src/components/hero/hero.tsx` — conteneur
2. `src/components/hero/hero-mesh.tsx` — mesh gradients animés (Client)
3. `src/components/hero/hero-grid.tsx` — grid lines
4. `src/components/hero/hero-glass.tsx` — glass elements (Client)
5. `src/components/hero/hero-content.tsx` — texte + badge + ligne Figma→prod

**Ponytail mode :** passer en `lite` pour le hero (composant complexe avec
beaucoup de couches visuelles). Revenir en `full` ensuite.

---

## Checklist post-setup

- [ ] Next.js 15 + App Router + TypeScript + Tailwind v4
- [ ] shadcn/ui initialisé avec button, badge, separator
- [ ] Ponytail installé, mode full actif
- [ ] ui-ux-pro-max installé, configuré en référence manuelle (pas auto-trigger)
- [ ] Docs 91-97 dans `/docs`
- [ ] CLAUDE.md à la racine (= contenu du 96)
- [ ] Arborescence des composants créée
- [ ] Fonts chargées via next/font
- [ ] Tokens palette dans globals.css
- [ ] Lyse audit passé, AGENTS.md généré
- [ ] Hero buildé et validé (test des 6 secondes)
