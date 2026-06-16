# Skill Orchestration — Routing Guide

> Ce fichier est un index de routage pour Claude Code. Il indique, pour chaque
> type de tâche, quels skills mobiliser et quels documents lire EN PREMIER.
>
> Règle : toujours lire le document de référence AVANT d'agir. Ne pas deviner
> une décision si elle est déjà prise dans un doc.

---

## Avant toute action

1. Lire **docs/00-workflow-protocol.md** — protocole de session (plan mode, scoring, Figma, Lyse).
2. Lire **96-project-structure.md** — architecture et contraintes techniques.
3. Si le projet a un **AGENTS.md** (généré par Lyse), le lire aussi.

---

## Routing skills — code générique et front

> Détail complet dans `docs/00-workflow-protocol.md §3`. Résumé :

| Tâche | Skill |
|---|---|
| Code générique (utils, data, config) | `ponytail` |
| Front — composant, page, token, layout | Choisir parmi `gpt-tasteskill` · `ui-ux-pro-max` · `taste-skill` · `front-end-design` selon le contexte |
| Skill inconnu / non installé | Consulter https://github.com/rampstackco/claude-skills → proposer à Maxime → attendre confirmation |
| Session remote (web) — skill local absent | Demander la doc du skill à Maxime avant d'agir |

---

## Routage par tâche

### Poser les tokens / configurer Tailwind / définir la palette ou la typo
- **Lire :** 92-creative-brief.md (§6 Direction visuelle, §8 Contraintes)
- **Lire :** 95-hero-visual-spec.md (§1 Fond, §5 Contenu texte, §9 Tokens hero)
- **Lire :** 96-project-structure.md (§5 Styling)
- **Skill :** `design-system` (couches 1-2 : foundations + elements)
- **Skill :** `design-standards` (vérification contraste, spacing)

### Construire un composant (bouton, card, nav, badge…)
- **Lire :** 96-project-structure.md (§5 Styling, §12 Nommage)
- **Skill :** `frontend-component-build` (6 dimensions : anatomy → a11y → tests)
- **Skill :** `design-standards` (contraste, états, mobile)
- **Skill :** `shadcn` (vérifier si un composant shadcn existe avant de coder from scratch)
- **Règle :** composants shadcn overridés, pas utilisés tels quels (red flag 2)

### Construire le hero
- **Lire :** 95-hero-visual-spec.md (TOUT — c'est la spec complète)
- **Lire :** 93-creative-direction.md (§ Liste de rejet)
- **Skill :** `frontend-component-build`
- **Skill :** `design-standards` (contraste texte blanc sur fond sombre)

### Construire une section de la home (Work, Method, About, System, Contact)
- **Lire :** 00-brief-global.md (contenu validé de chaque section)
- **Lire :** 94-information-architecture.md (§8 Labels)
- **Lire :** 93-creative-direction.md (ton, liste de rejet)
- **Skill :** `design-standards`
- **Skill :** `frontend-component-build` (si nouveau composant)

### Construire le gabarit d'étude de cas
- **Lire :** 94-information-architecture.md (§6 Gabarit complet, §7 Métadonnées)
- **Lire :** 96-project-structure.md (§7 Contenu MDX)
- **Skill :** `frontend-component-build`

### Écrire ou modifier le contenu d'une étude de cas
- **Lire :** la fiche expérience correspondante (11-fiche-estorie, 12-fiche-mention, 13-fiche-ekonsilio)
- **Lire :** 93-creative-direction.md (voix, ton, liste de rejet)
- **Lire :** 94-information-architecture.md (§6 Gabarit — respecter l'enveloppe)
- **Lire :** etude-de-cas-mention.md OU case-study-ekonsilio.md (comme référence de ton)
- **Skill :** `content-and-copy`

### Configurer la navigation (StickyNav)
- **Lire :** 94-information-architecture.md (§5 Navigation complète)
- **Lire :** 95-hero-visual-spec.md (§8 Nav dans le hero)
- **Lire :** 96-project-structure.md (§8 Navigation)
- **Skill :** `frontend-component-build`

### SEO / metadata / Open Graph
- **Lire :** 94-information-architecture.md (§7 Métadonnées techniques)
- **Lire :** 96-project-structure.md (§9 SEO)
- **Pas de skill dédié** — les specs du 94 et 96 suffisent

### Audit accessibilité
- **Lire :** 96-project-structure.md (§11 Accessibilité)
- **Skill :** `design-standards` (contraste, focus, landmarks)
- **Skill :** `accessibility-audit` (si installé — audit WCAG complet pré-launch)

### Audit design system (Lyse)
- **Lire :** 96-project-structure.md (§13 Lyse workflow)
- **Action :** `npx lyse audit` → vérifier le score
- **Action :** `lyse agents > AGENTS.md` → régénérer le contrat DS

### Vérifier la direction créative / le ton / ce qu'on rejette
- **Lire :** 93-creative-direction.md (les 4 axes + la liste de rejet)
- **Lire :** 92-creative-brief.md (§5 Voix & ton)
- **Pas de skill** — c'est de la lecture de référence, pas une action

### Responsive / mobile
- **Lire :** 95-hero-visual-spec.md (§9 Responsive — hero spécifique)
- **Skill :** `design-standards` (règles mobile, touch targets, viewport)

---

## Hiérarchie des documents

En cas de conflit entre documents, la priorité descend dans cet ordre :

1. **96-project-structure.md** — architecture et contraintes techniques (le dernier mot sur le "comment")
2. **93-creative-direction.md** — les 4 axes et la liste de rejet (le dernier mot sur le "quoi" esthétique)
3. **94-information-architecture.md** — structure, labels, gabarit (le dernier mot sur le "où")
4. **95-hero-visual-spec.md** — spécification du hero (le dernier mot sur le hero)
5. **92-creative-brief.md** — direction visuelle et scope (décisions de cadrage)
6. **00-brief-global.md** — contenu validé (textes, cartes, sections)
7. **91-brand-discovery.md** — territoires et analyse (contexte, rarement consulté pendant le build)

**Règle absolue :** si une décision est écrite dans un de ces docs, elle est prise.
Ne pas la re-débattre. Ne pas proposer une alternative. L'appliquer.
Si elle semble contradictoire avec une autre, demander à Maxime.

---

## Skills installés — index rapide

| Skill | Quand l'utiliser | Quand NE PAS l'utiliser |
|---|---|---|
| `design-system` | Tokens, éléments, composants au niveau système | Pages individuelles, contenu |
| `design-standards` | Qualité production : contraste, spacing, mobile, pre-ship | Direction créative, positionnement |
| `frontend-component-build` | Construire un composant : anatomy, variants, states, props, a11y | Contenu textuel, tokens seuls |
| `shadcn` | Vérifier/installer/override un composant shadcn/ui | Composants custom sans base shadcn |
| `content-and-copy` | Rédiger ou éditer du contenu (études de cas, sections) | Layout, composants, tokens |
| `brand-identity` | Couleur, typo, logo — décisions déjà prises, ne plus mobiliser sauf changement | Build courant |
| `information-architecture` | Structure, sitemap, nav — décisions déjà prises | Build courant |
| `creative-direction` | Ton, axes esthétiques — décisions déjà prises | Build courant |

