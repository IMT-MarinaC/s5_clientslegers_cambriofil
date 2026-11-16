# Cambriofil — le carnet du cambrioleur

Application React construite sur l'API du Metropolitan Museum of Art. Le joueur est un cambrioleur
qui travaille sur commande : il retient ce que veut un commanditaire, examine les œuvres d'une salle
et vole celle qui correspond. Ses vols remplissent sa planque et son tableau de chasse.


Démo en ligne : [LIEN VERCEL]

![Salle de mission en mode voleur de jour](docs/salle.png)

> Pour bien évaluer l'application, jouez une ou deux missions : la planque et les statistiques
> personnelles se remplissent avec vos vols. Le graphique du musée est visible dès le départ.

## Démarrage rapide

Prérequis : Node.js 20 ou plus.

    git clone https://github.com/enockii/cambriofil.git
    # ou télécharger le zip et décompresser
    cd cambriofil
    npm install
    npm run dev        # http://localhost:5173

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run test` | Tests (mode watch) |
| `npm run test:run` | Tests une fois |
| `npm run lint` | Vérification ESLint |

## Fonctionnalités et couverture du sujet

| Exigence | Dans Cambriofil |
| --- | --- |
| Liste | Contrats (avec le nombre de pièces au Met), salle de 6 œuvres, planque avec filtre |
| Vue détaillée | Fenêtre « Examiner » dans la salle et page `/oeuvre/:id`, avec lien vers le site du Met |
| Visualisations | 4 graphiques dans le tableau de chasse |

Le jeu : briefing de 20 secondes, carnet avec un critère noté et les autres flous, appel au
commanditaire (-25 % de prime par appel), vol, résultat, sauvegarde dans le `localStorage`.
Thèmes « voleur de jour » et « voleur nocturne », responsive, navigable au clavier.

## Mobile first et accessibilité

- CSS mobile first : la base vise un téléphone de 375 px, `@media (min-width)` pour les grands écrans.
- Objectif WCAG 2.2 AA : contrastes vérifiés dans les deux thèmes, navigation 100 % clavier,
  focus visible, cibles de 44 px, lien d'évitement, focus déplacé à chaque changement de page,
  briefing prolongeable (+20 s), graphiques doublés d'un tableau de données, prefers-reduced-motion.

## Stack

* React 19
* TypeScript
* Vite
* React Router 7
* TanStack Query 5
* Recharts
* Vitest
* Testing Library
* MSW

## Architecture

    src/
    ├── api/          # appels HTTP et types de l'API du Met
    ├── hooks/        # React Query, historique des vols, thème
    ├── utils/        # logique pure générique : indicateurs voleur, agrégations, formatage
    ├── game/         # règles du jeu (pures) : contrats, critères, mission, prime, stats
    ├── components/   # affichage : ui, artwork, game, hideout, charts, layout
    ├── pages/        # une page par route
    ├── styles/       # thème et effet crayon
    └── tests/         # faux serveur MSW, fixtures, helpers

Principes :
- Seul `api/metApi.ts` fait des requêtes réseau.
- Les règles (`utils/`, `game/`) sont des fonctions pures, testées unitairement.
- `ArtworkDetails` est réutilisé dans la fenêtre Examiner et dans la page fiche.
- Ajouter un type de critère = ajouter une entrée dans `CLUE_RULES`.
- Le thème repose sur des variables CSS : le mode nocturne ne redéfinit que les couleurs.

## Choix des visualisations

| Graphique | Question | Pourquoi ce type |
| --- | --- | --- |
| Aire | Est-ce que je m'enrichis ? | Évolution d'un cumul dans le temps |
| Barres empilées | Quels contrats je rate ? | Réussis + ratés = total des tentatives par contrat |
| Camembert | Qu'est-ce que je vole ? | Parts d'un tout, limité à 6 parts + "Autres" |
| Barres horizontales | Où frapper ensuite ? | Comparer 10 départements aux noms longs |

Hachures plutôt que couleurs seules : cohérent avec le style crayon et lisible par les daltoniens.

## Points de blocage

- **Recherche v1 retirée** en octobre 2026 : migration vers `/v1.1/search`. [Comment tu l'as découvert]
- **La recherche ne renvoie que des IDs** : une requête par œuvre, d'où un lot de 24 œuvres tirées au hasard.
- **IDs en 404 et images manquantes** : `Promise.allSettled` et dessin de remplacement.
- **Garantir une seule bonne réponse** : les leurres ne peuvent pas respecter tous les critères.
- **Effet crayon** : faire un effet css
- **Tests d'accessibilité** : axe-core ne calcule pas les couleurs, donc vérification avec Lighthouse dans le navigateur.

## Utilisation de l'IA
- Outil : Claude Opus 5.5
- Utilisé pour : 
  - découper le projet et aide au design + maquettes
  - générer les tests unitaires, d'intégration et d'accessibilité
  - MSW, `<dialog>`, charts…
  
Ce que j'ai fait moi-même : 
* Concept des commandes et du carnet, adaptations, corrections, choix des contrats, textes, ajustements CSS, écrans visibles (pages)…
- Limites rencontrées : [code à corriger, informations périmées sur l'API…].

## Tests

`npm run test:run` : 29 tests.
- Unitaires : indicateurs voleur, siècles, génération de mission, statistiques.
- Intégration (app complète + faux serveur MSW) : mission de bout en bout jusqu'à la planque,
  contrats, filtre de la planque, fiche, erreurs API, page 404, tableau de chasse vide.

## Pistes d'amélioration

- Nouveaux critères : hauteur, pièce maîtresse, exposée en salle ou en réserve, etc
- Chronomètre dans la salle, rangs de voleur
- Plus de statistiques : nombre de vols par type d'œuvre, par siècle, par département, etc
- Amélioration du gameplay : 
  - plus de types de contrats, plus de salles, plus de commanditaires, plus de missions, etc
  - des énigmes, des obstacles, façon escape game, pour trouver la bonne œuvre à voler

## Crédits

Données et images : The Metropolitan Museum of Art Open Access (CC0). 

Les valeurs affichées sont fictives.

* Idées : Enocki / Marina
* Développement : Enocki / Marina + Claude Opus 5.5