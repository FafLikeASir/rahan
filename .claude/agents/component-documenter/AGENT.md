---
name: component-documenter
description: >
  Après création ou modification d'un composant, crée ou met à jour
  le fichier .md co-localisé et l'index composants. Vérifie l'alignement
  avec DESIGN.md.
trigger: manuel (/document ComponentName) ou fin de tâche impliquant un composant
---

# Agent — Component Documenter

## Séquence

1. **Identifier le composant**
   - Argument : nom du composant (`/document Hero`)
   - Fallback : lire le dernier fichier `.tsx` modifié (git diff --name-only HEAD~1)

2. **Lire le composant**
   - Lire le fichier `.tsx` du composant
   - Lire le `.md` co-localisé s'il existe (pour ne pas écraser)

3. **Vérifier l'alignement DESIGN.md**
   - Lire `DESIGN.md`
   - Vérifier : tokens utilisés (`var(--...)`, classes Tailwind) alignés avec les tokens YAML
   - Vérifier : règles do/don't respectées
   - Si divergence → signaler, ne pas silencieusement "corriger"

4. **Créer ou mettre à jour le `.md` co-localisé**
   Template (depuis `docs/00-workflow-protocol.md §8`) :

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

5. **Mettre à jour `docs/98-components-index.md`**
   - Ajouter ou mettre à jour la ligne du composant

## Ce que cet agent ne fait PAS
- Ne modifie pas le code `.tsx`
- Ne renomme pas les composants
- Ne propose pas de refactoring
