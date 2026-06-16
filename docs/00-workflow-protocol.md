# Workflow Protocol — Claude Code

> Meta-layer de session. Projet-agnostique, réutilisable sur tous les projets.
> Lit CLAUDE.md en premier pour les règles projet-spécifiques.
> Se met à jour au fil des sessions si une règle manque ou est obsolète.

---

## §1 — Démarrage de session

1. Lire **CLAUDE.md** du projet
2. Lire **docs/96-project-structure.md** (ou équivalent projet)
3. Lire **docs/97-skill-orchestration.md** (ou équivalent projet)
4. Lire **AGENTS.md** à la racine si présent (contrat DS généré par Lyse)
5. Activer **plan mode** — toutes les tâches passent par un plan avant implémentation

---

## §2 — Plan et scoring de faisabilité

Chaque étape du plan est annotée d'un score :

```
- [ ] Étape X — description [Feasibility: 87%]
```

**Si score < 90% :**
Relancer la routine sur ce point précis :
1. Identifier le blocage exact (ambiguïté, dépendance manquante, décision non prise)
2. Proposer une reformulation ou une approche alternative
3. Réévaluer → nouveau score
4. Répéter jusqu'à ≥ 90% **ou** identifier que le blocage est hors-scope

Si hors-scope → remonter à Maxime, ne pas improviser.

---

## §3 — Routing des skills

### Code générique
→ Skill **`ponytail`**

### Code front (composant, page, token, layout)
Passer en revue ces 4 skills et choisir le plus adapté au contexte :
- `gpt-tasteskill`
- `ui-ux-pro-max`
- `taste-skill`
- `front-end-design`

Critères de choix : type de tâche (composant isolé vs page entière), niveau de detail UX requis, complexité visuelle.

### Skill inconnu ou non installé
1. Consulter https://github.com/rampstackco/claude-skills
2. Proposer le skill le plus adapté à Maxime avec justification
3. Attendre confirmation + installation avant d'agir
4. En session remote : demander la doc du skill à Maxime si non disponible localement

### Fallback rampstackco
Si aucun skill ne correspond → expliquer pourquoi, proposer l'approche manuelle, demander validation.

---

## §4 — Fin de tâche : documentation

Après chaque tâche qui crée ou modifie un composant, fichier, token, ou décision :

1. **Composant créé ou modifié** → créer/mettre à jour le `.md` co-localisé (template en §8)
2. **Index composants** → mettre à jour `docs/98-components-index.md`
3. **Fichiers .md potentiellement impactés** → proposer une mise à jour de TOUS les fichiers
   concernés, pas seulement `/docs` :
   - `docs/96-project-structure.md` (structure, conventions)
   - `docs/97-skill-orchestration.md` (routing)
   - `docs/98-components-index.md` (index)
   - `CLAUDE.md` (règles projet)
   - `AGENTS.md` (contrat DS — régénérer via `lyse agents > AGENTS.md`)
   - `README.md` si existant

---

## §5 — Fin de plan : Lyse audit

Après chaque plan exécuté (pas après chaque fichier) :

```bash
npx lyse audit
```

- Reporter le **Health Score** dans le fil de session
- Si régression par rapport au score précédent → identifier le composant ou token fautif avant de clore
- Si amélioration → noter les tokens/composants qui ont progressé
- Régénérer le contrat DS si tokens ou composants ont changé :

```bash
npx lyse agents > AGENTS.md
```

---

## §6 — Workflow Figma → code

### Règle 0 — MCP avant tout

Toujours utiliser le MCP Figma (`mcp__Figma__*`) pour analyser un design.
Un screenshot donne un résultat d'analyse nettement inférieur.
**Ne jamais implémenter uniquement sur la base d'un screenshot.**

### Étape 1 — Évaluation de complexité [avant analyse]

Évaluer avant de commencer :

| Niveau | Critères | Action |
|---|---|---|
| **Simple** | < 5 composants, 1 état, pas de breakpoints multiples | Analyse directe |
| **Modéré** | 5–15 composants, quelques variantes, 2 breakpoints | Plan d'analyse structuré |
| **Complexe** | > 15 composants, interactions, tokens custom, breakpoints multiples | **Signaler à Maxime**, proposer décomposition par blocs |

Si complexe : ne pas analyser en une passe → découper en sous-tâches, valider avec Maxime avant d'aller plus loin.

### Étape 2 — Séquence d'analyse MCP

```
1. mcp__Figma__get_metadata       → contexte général du fichier Figma
2. mcp__Figma__get_design_context → structure détaillée (nœuds, tokens, layout, variantes)
3. mcp__Figma__get_screenshot     → supplément uniquement si un détail visuel est ambigu
```

### Étape 3 — Format du rapport d'analyse

```md
## Analyse Figma — [Nom du composant/écran]

### Complexité : Simple / Modéré / Complexe

### Composants identifiés
- [ComponentName] — rôle

### Tokens utilisés
- Couleur : `#hex` → `--color-X` (token DS)
- Typo : weight/size → token hiérarchie
- Spacing : valeur → classe Tailwind

### Alignement avec le design system [XX%]
- ✅ Éléments déjà couverts (codebase / AGENTS.md)
- ⚠️ Éléments manquants (nouveau composant, nouveau token)
- ❌ Divergences avec les décisions en 93/95/96

### Plan d'implémentation
- [ ] Étape 1 [Feasibility: XX%]
- [ ] Étape 2 [Feasibility: XX%]
```

### Étape 4 — Score d'alignement

```
Alignement (%) = éléments couverts par le DS / total éléments identifiés × 100
```

- **≥ 70%** → implémenter
- **< 70%** → alerter Maxime avant d'implémenter (risque de dérive du DS)

### Skills Figma

| Skill | Quand |
|---|---|
| `/figma-use` | **OBLIGATOIRE** avant tout appel à `use_figma` |
| `/figma-code-connect` | Mapper composants Figma ↔ composants codebase |
| `/figma-generate-design` | Pousser du code vers Figma |

---

## §7 — Évolution du protocole

Ce fichier est vivant. En fin de session, si une règle manque, est obsolète, ou crée un conflit :

1. Signaler à Maxime
2. Proposer la modification
3. Mettre à jour ce fichier après validation

Versioning implicite via git — l'historique des commits trace l'évolution du protocole.

---

## §8 — Template documentation composant

À co-localiser dans le dossier catégorie du composant (`ComponentName.md`) :

---

## §9 — Ordre d'implémentation des tâches

Toute tâche suit cet ordre. Ne pas sauter d'étape.

1. **Structure** — HTML/JSX, layout, composants, props, Server vs Client, accessibilité
2. **Content** — textes, tokens typographiques, tokens couleur, données
3. **Animation / Motion / Micro-interactions** — GSAP, transitions CSS, états hover/focus
   - Si non précisé dans la demande → proposer les animations envisagées, attendre validation
   - Toujours implémenter `prefers-reduced-motion`



```md
# ComponentName

## Rôle
Une phrase — ce que ce composant fait, pas comment.

## Props
| Prop | Type | Défaut | Description |
|---|---|---|---|

## Tokens Lyse utilisés
- `--color-X` → classe Tailwind `bg-X`

## Variants / états
Liste des variantes ou états interactifs.

## Décisions design
Pourquoi ce choix — contrainte cachée, compromis, workaround.
Ne pas documenter ce que le code dit déjà.
```
