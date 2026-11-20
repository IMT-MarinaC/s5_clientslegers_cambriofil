# Cambriofil — le carnet du cambrioleur

Application React construite sur l'API du Metropolitan Museum of Art. Le joueur est un cambrioleur
qui travaille sur commande : il retient ce que veut un commanditaire, examine les œuvres d'une salle
et vole celle qui correspond. Ses vols remplissent sa planque et son tableau de chasse.


Démo en ligne : https://imt-marinac.github.io/s5_clientslegers_cambriofil/

![Salle de mission en mode voleur de jour](<img width="3732" height="1887" alt="image" src="https://github.com/user-attachments/assets/b67612da-323d-446c-8462-ad050ece8953" />)

> Pour bien évaluer l'application, jouez une ou deux missions : la planque et les statistiques
> personnelles se remplissent avec vos vols. Le graphique du musée est visible dès le départ.

## Démarrage rapide

Prérequis : Node.js 22 (ou 20.19 minimum, exigé par Vite 8).

    git clone https://github.com/IMT-MarinaC/s5_clientslegers_cambriofil.git
    # ou télécharger le zip et décompresser
    cd s5_clientslegers_cambriofil
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
| Visualisations | 4 graphiques et 8 chiffres clés dans le tableau de chasse (statistiques du voleur et du musée) |

Le jeu : briefing de 20 secondes, carnet avec un critère noté et les autres flous, appel au
commanditaire (-25 % de prime par appel), vol, résultat, sauvegarde dans le `localStorage`.
Thèmes « voleur de jour » et « voleur nocturne », responsive, navigable au clavier.

## Mobile first et accessibilité

- CSS mobile first : la base vise un téléphone de 375 px, `@media (min-width)` pour les grands écrans.
- Objectif WCAG 2.2 AA : 
  - contrastes vérifiés dans les deux thèmes
  - navigation 100 % clavier
  - focus visible
  - lien d'évitement
  - focus déplacé à chaque changement de page
  - briefing prolongeable (+20 s)
  - graphiques doublés d'un tableau de données
  - barre d’onglets mobile qui ne masque jamais le focus
  - légendes qui ne reposent pas que sur la couleur
  - ...

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
| Barres horizontales empilées | Où frapper ensuite ? | Exposées + en réserve par département, 10 départements aux noms longs |

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
  - Structure du README
  - Quelques correctifs
  
Ce que j'ai fait moi-même : 
- Concept des commandes et du carnet, adaptations, corrections, choix des contrats, textes, ajustements CSS, écrans visibles (pages), …

Limites rencontrées :
- <dialog> qui s'affichait mal (scrollé, trop haut)
- Bien faire l'effet crayon
- l’option MSW renommée en v3
- 

## Tests

`npm run test:run` : 38 tests, relancés automatiquement à chaque push avant le déploiement.
- Unitaires : indicateurs voleur, siècles, génération de mission, statistiques.
- Intégration (app complète + faux serveur MSW) : mission de bout en bout jusqu'à la planque,
  contrats, filtre de la planque, fiche, erreurs API, page 404, tableau de chasse vide.

## Déploiement

GitHub Pages, via GitHub Actions (`.github/workflows/deploy.yml`) : à chaque push sur `master`,
lint, tests, build, puis publication. Deux réglages pour un site servi sous `/s5_clientslegers_cambriofil/` :
- `base` dans `vite.config.ts` et `basename` du routeur, sinon la page reste blanche ;
- `404.html` copié depuis `index.html`, pour qu'un rechargement de `/planque` ou un lien direct vers une œuvre
  ne tombe pas sur la page 404 de GitHub.

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
