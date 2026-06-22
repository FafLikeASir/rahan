# .claude/agents/ — Agents du projet

Agents spécialisés invocables depuis les custom commands ou manuellement.
Chaque agent a un `AGENT.md` qui définit sa séquence et ses limites.

## Agents disponibles

| Agent | Commande | Déclencheur |
|---|---|---|
| `lyse-auditor` | `/lyse` | Fin de plan ou manuellement |
| `component-documenter` | `/document ComponentName` | Après modification d'un composant |
| `design-reviewer` | `/design-review` | Avant implémentation visuelle |

---

## Fichiers racine liés (ne pas déplacer)

Ces fichiers sont à la racine par contrainte d'outil, pas par choix :

| Fichier | Généré par | Contrainte |
|---|---|---|
| `AGENTS.md` | `npx lyse agents` | Lyse écrit à la racine, lu par les AI tools à la racine |
| `LYSE.md` | `npx lyse init` | Lyse écrit à la racine |
| `.lyse.yaml` | Manuel | Lyse lit depuis la racine par défaut |
| `lyse.components.json` | Lyse | Chemin configurable dans `.lyse.yaml` |
| `DESIGN.md` | Manuel | Standard getdesign.md, attendu à la racine |
| `CLAUDE.md` | Manuel | Claude Code lit à la racine |

`.github/workflows/` : contrainte GitHub Actions (chemin non configurable).
