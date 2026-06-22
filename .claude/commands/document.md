# /document

Invoque l'agent `component-documenter` sur un composant.

## Usage

```
/document Hero
/document WorkCard
/document StickyNav
```

## Ce que ça fait

1. Identifie le composant (argument ou dernier fichier `.tsx` modifié)
2. Lit le `.tsx` et le `.md` co-localisé existant
3. Vérifie l'alignement avec `DESIGN.md`
4. Crée ou met à jour le `.md` co-localisé (template §8 workflow-protocol)
5. Met à jour `docs/98-components-index.md`

## Quand l'utiliser

- Après création d'un nouveau composant
- Après modification significative d'un composant existant
- Quand le `.md` co-localisé est absent ou obsolète

## Agent sous-jacent

`.claude/agents/component-documenter/AGENT.md`
