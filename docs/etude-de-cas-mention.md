# Mention — Refondre le design system d'un SaaS B2B

**Product Designer · Octobre 2022 – Juillet 2024**
Plateforme de media monitoring & social listening · Seul designer, en collaboration avec l'équipe produit et les développeurs

---

## Le contexte

Mention est une plateforme SaaS de media monitoring et de social listening : elle permet de surveiller le web et les réseaux sociaux, d'analyser les conversations en ligne et de gérer sa présence sociale, le tout dans un seul outil. J'y étais le seul designer, en lien direct avec les PM et les développeurs.

Le produit reposait sur Material UI, habillé d'une simple couche de CSS pour en remplacer les couleurs. Côté design, il n'existait aucun UI Kit : seulement des maquettes Figma éparses. Ni côté design, ni côté code, il n'y avait de source de vérité commune.

---

## Le problème

Sans système partagé, chaque équipe travaillait dans son coin — et le design restait en bout de chaîne, jamais là où les choix produit se faisaient.

Côté design, les maquettes vivaient dans un fichier Figma fourre-tout, non documenté, où chacun venait modifier par-dessus le travail des autres. Aucun UI Kit, aucune règle : juste des écrans empilés.

Côté développement, faute de bibliothèque commune, les composants n'existaient pas vraiment. On copiait un bout de code qui tournait déjà en prod, on le collait dans l'écran en cours, on ajustait le style pour coller à la maquette. Pas de composant cadré, structuré ou documenté — juste de la duplication. Les couleurs étaient codées en dur, dispersées entre le HTML, le CSS et ces pseudo-composants, et Material UI disparaissait sous une accumulation de patchs CSS.

Entre les deux, aucun handoff : la passation se résumait à un lien Figma déposé dans un ticket Jira, sans contexte ni intention. Le coût se payait à la fin, en review : les retours front et les tests s'accumulaient au point qu'une user story pouvait demander autant de temps de correction que le temps initialement estimé pour la produire.

Le résultat ne tenait pas seulement à des incohérences visuelles d'un écran à l'autre. C'était une équipe qui passait son énergie à colmater et à refaire, au lieu de concevoir.

---

## Le mandat

Je n'ai pas été recruté pour ranger un fichier Figma. Le Head of Product m'a fait venir avec un objectif clair : faire entrer le design dans les décisions produit. Jusque-là, le design exécutait des choix arrêtés en amont par les PM et les développeurs. L'enjeu était d'en faire une voix à part entière — et, plus largement, de diffuser une culture design dans l'équipe produit d'abord, puis chez les développeurs, puis dans toute l'entreprise.

Le design system n'était donc pas une fin en soi. C'était le moyen : un terrain concret pour rapprocher design et développement, et installer une façon de travailler commune.

## L'audit

Plutôt que d'attaquer les composants tout de suite, j'ai commencé par un état des lieux complet : le fichier Figma, l'UI en production, l'UX globale de l'application, le workflow d'équipe et le handoff. L'objectif était de comprendre où se perdaient le temps et la cohérence avant de décider quoi changer.

Cet audit a débouché sur un plan d'action mené sur deux fronts en parallèle. Avec la squad Foundation, l'équipe en charge des fondations techniques du produit, le volet système : un UI Kit commun au design et au code. Avec les PM, le volet collaboration : une façon partagée de cadrer, documenter et transmettre le travail.

---

## L'approche

Le plan d'action avançait sur deux fronts en parallèle. D'abord rapprocher les équipes autour d'une façon de travailler commune ; ensuite leur donner la fondation technique qui la rende durable.

### Front 1 — Une collaboration cadrée (avec les PM)

**Normaliser les fichiers Figma.** Tant que le design vivait dans un fichier fourre-tout où chacun écrasait le travail des autres, aucune source de vérité n'était possible. J'ai donné aux fichiers Figma une structure normée — une organisation prévisible, où chaque chose a sa place et où l'on retrouve l'état réel d'un écran sans avoir à demander.

**Définir un « fini ».** Les retours interminables en review venaient d'un désaccord jamais explicité sur ce qu'était une maquette terminée. Une Definition of Done partagée a tranché la question en amont : un design n'était transmis que couvert pour tous ses cas — état par défaut, vide, erreur, chargement. Le débat avait lieu avant le développement, plus après.

**Fiabiliser le handoff.** Un lien Figma jeté dans un ticket ne transmet ni l'intention, ni les décisions, ni les cas à couvrir. J'ai donc reconstruit la passation de bout en bout.

Zeplin est devenu la passerelle « ready to dev » : un sas où n'entraient que les maquettes validées, accompagnées de leurs spécifications, servant de source de vérité unique à toutes les équipes.

Côté Jira, j'ai mis en place un workflow et des templates de tickets qui reliaient explicitement le design et le développement. Un ticket principal portait l'objectif produit — une feature, un problème à résoudre. Sous lui, les user stories design portaient chacune le contexte de conception : lien vers la discovery, l'UX research, les retours utilisateurs, la liste des cas d'usage à produire, une Definition of Done couvrant les états (défaut, vide, erreur, chargement), et un prototype quand il était nécessaire. Les user stories dev, elles, étaient rattachées à une ou plusieurs user stories design : le développeur y retrouvait le contexte, les décisions et les commentaires, les liens Zeplin correspondants, sa branche Git dédiée, et le renvoi vers Storybook quand le composant y était documenté.

Le handoff cessait d'être un mur entre deux équipes. C'était un fil continu : du problème produit jusqu'au composant intégré, chaque maillon portait le contexte du précédent.

### Front 2 — Une fondation commune au design et au code (avec la squad Foundation)

**Repartir de l'existant, pas d'une page blanche.** Le produit reposait sur Material UI. Plutôt que d'imposer une refonte brutale — risquée, et vécue comme un désaveu par les devs — j'ai gardé Material UI comme socle et l'ai redessiné : un UI Kit Figma qui conservait les composants déjà en place, mais retravaillés, en m'appuyant sur les principes de *Refactoring UI* et *Practical UI*.

**Mettre une couche d'abstraction entre le style et les composants.** Les couleurs codées en dur, éparpillées dans le HTML et le CSS, rendaient le moindre changement risqué et manuel. En introduisant TailwindCSS et ses design tokens, le style cessait d'être écrit en clair partout : il passait par une couche intermédiaire, modifiable en un point, répercutée partout.

**Développer les composants avec les devs, pas pour eux.** Un design system livré clé en main aurait été contourné comme le reste. Les composants ont donc été construits avec les développeurs front, pour entrer dans leur process et devenir leur outil — pas une contrainte de plus imposée d'en haut.

**Documenter pour rendre la fondation accessible.** Un système que personne ne sait lire n'est pas un système partagé, juste un dossier de plus. Storybook a donné aux composants une bibliothèque vivante et documentée, consultable par tous. Surtout, via l'addon Designs de Storybook, chaque composant y était relié à sa maquette Figma de référence : la maquette s'affichait directement dans un onglet « Design », à côté du composant réel. Designers et développeurs regardaient enfin le même objet, décrit au même endroit, sans avoir à passer d'un outil à l'autre. La bibliothèque servait aussi de point d'entrée pour les nouveaux développeurs front-end et fullstack : plutôt que de fouiller du code épars pour comprendre l'existant, ils disposaient d'un catalogue clair — ce qui a nettement accéléré leur prise en main.

---

## Les résultats

**Une source de vérité, partagée.** Designers, PM et développeurs travaillaient enfin à partir des mêmes références : un UI Kit Figma, une bibliothèque de composants documentée, des maquettes validées. L'UI Kit couvrait l'ampleur de Material UI, soit près de 100 écrans en trois déclinaisons — desktop, tablette, mobile.

**Moins de friction, moins de reprise.** Les reviews interminables se sont résorbées : avec une Definition of Done partagée et des composants cadrés, le débat avait lieu en amont, plus en fin de course. Les composants, testés une fois au niveau de la bibliothèque, n'avaient plus à être re-vérifiés à chaque feature — la charge de tests côté production s'en est trouvée allégée d'autant.

**Un design intégré, pas exécuté.** C'était le mandat de départ : il a été tenu. Le workflow reliait le contexte produit aux user stories design puis dev ; le design n'arrivait plus en bout de chaîne, il était présent là où les décisions se prenaient. La cohérence visuelle s'est aussi étendue au-delà du produit, alignant l'interface et les supports marketing.

**Du temps rendu à la conception.** En cessant de colmater, l'équipe a regagné du temps pour ce qui compte vraiment : la discovery, l'UX research, la R&D. Il devenait même possible de monter des POC rapidement pour valider une idée de feature ou un concept avant de s'engager.

---

## Ce que j'en retire

**Un design system est un outil social avant d'être un outil technique.** Le plus dur n'a pas été de dessiner des composants ou de structurer des tokens, mais de faire adopter une façon de travailler commune. Construire les composants *avec* les développeurs plutôt que de les leur livrer, c'est ce qui a fait la différence entre un système vivant et une bibliothèque ignorée. Je l'aborderais de la même manière aujourd'hui.

**Les outils datent, les principes restent.** À l'époque, Zeplin était le bon choix pour servir de passerelle « ready to dev ». Depuis, les évolutions de Figma — modes de partage, dev mode, specs intégrées — ont rendu cet intermédiaire obsolète : aujourd'hui, je ferais tenir ce rôle directement dans Figma, sans outil tiers. Ce qui comptait n'était pas Zeplin, mais la fonction qu'il remplissait : une frontière nette entre « en cours » et « prêt à développer ». Cette fonction, elle, reste nécessaire.

**Ce que je retiens pour la suite.** Ce projet a confirmé ce qui m'intéresse vraiment : non pas le design system pour lui-même, mais ce qu'il permet — relier le design, le produit et le code dans un même mouvement. C'est devenu le fil de ma pratique.
