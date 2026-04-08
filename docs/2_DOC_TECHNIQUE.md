# Documentation Technique - TRACA

## 1. Stack Utilisée
- **Frontend** : HTML5 sémantique, CSS3 (Custom Properties / Variables), JavaScript (ES6+ Modules).
- **Serveur de développement** : Vite (`npm run dev`). Rapide, gère les imports ES6 en local.
- **Liberies Tierces** :
  - **GSAP (GreenSock)** : Utilisée pour scroller programmatiquement la page de façon asynchrone lors de la *Visite Guidée* (`ScrollToPlugin`).
  - **Mapbox GL JS** : Moteur cartographique 3D utilisé sur `carte.html` pour le survol en trois dimensions.
  - **Sketchfab API** : Intégration par iframe des scènes en 3D (Lieux archéologiques, tombes, médinas).

## 2. Architecture des fichiers
La structure du projet est "plate" et non compressée par un framework, pour une maintenabilité universelle ("Vanilla JS").

```text
traca/
├── public/                 # Assets statiques globaux.
│   ├── audio/              # Fichiers mp3/wav (voix de narration, ambiance).
│   ├── images/             # Couvertures de lieux, visages, logos, icônes.
│   └── data/               # (Si existant) Fichiers JSON.
├── css/
│   └── style.css           # Cœur stylistique du projet (Design System complet).
├── js/
│   ├── main.js             # Entrée globale. Navbar, Scroll, Fallback vidéo.
│   ├── tour.js             # Moteur dynamique de la Visite Guidée (Audio + Scroll GSAP).
│   ├── map-experience.js   # Script isolé de la map interactive 3D (carte.html).
│   └── 3d-scene.js         # Script générique de support pour les embeds iframes (placeholder).
├── lieux/                  # Dossier regroupant toutes les fiches "Lieux"
│   ├── archeologique.html  # Exemple de vue 3D Sketchfab intégrée
│   ├── medina.html         ...
│   ├── funeraire.html      ...
│   ├── forteresse.html     ...
│   └── saharien.html       ...
├── articles/               # Pages de type Editorial (Chroniques)
│   └── mers-eddadjadj.html # Article archéologique précis.
├── docs/                   # Documentation technique & Cahier des charges.
├── index.html              # Landing Page, Manifeste, Grille Lieux.
├── explorer.html           # Catalogue descriptif de toutes les entités.
├── carte.html              # Vue plein écran sur Mapbox.
├── articles.html           # Sommaire du magazine / Chroniques.
├── about.html              # Pitch projet équipe.
├── contact.html            # Formulaire UI.
├── package.json            # Dépendances NPM (Vite).
└── traca-intro.mp4         # Vidéo d'ouverture racine.
```

## 3. Rôle de chaque script

- **`main.js`** : Importé en tant que `<script type="module" src="/js/main.js"></script>` sur toutes les pages. Il :
  - Lance l'animation asynchrone GSAP si la `visite guidée` n'est pas déjà en cours.
  - Ouvre ou retire le fallback `Intro Vidéo`.
  - Attache des listes `IntersectionObserver` sur les classes CSS `.reveal` pour faire apparaître doucement les éléments natifs au défilement.
  - Attache le comportement de la navbar (fond coloré au `yScroll > 40`).
- **`tour.js`** : Moteur de Visite Guidée. Importé *dans* `main.js`.
  - Instancie l'objet global `window.TracaTour`.
  - Attache le bouton UI "Démarrer la visite".
  - Orchestre le flux Audio + GSAP Scroll pour se déplacer entre le *Hero*, le *Manifeste* et la *Grille des lieux*.
- **`map-experience.js`** : Exécute `mapboxgl.Map` avec son Token, gère les `Marker` cliquables et survole l'Algérie sur une caméra anglée.

## 4. Gestion des audios, vidéos, State
L'application TRACA gère l'état éphémère de l'utilisateur avec `sessionStorage` (ne survit pas à la fermeture de l'onglet) :
1. `sessionStorage.getItem('traca_intro_played')` = Évite de relancer la grosse vidéo d'intro MP4 (Splashscreen) aux retour vers `<Home>`.
2. `sessionStorage.getItem('traca_tour_active')` = Flag qui signale au Javascript que le joueur est en Visite Guidée globale (bloque tous les overlays parasites).

*Piste audio* : Gérée via l'API `new Audio('/audio/...mp3')`. Écouteurs `timeupdate` connectés au déroulé GSAP.

## 5. Contraintes de déploiement (Netlify)
- **Netlify Drop** : L'ensemble du répertoire du projet (`/`) ou un éventuel `build/` (si des bundling CSS surviennent) sera déployé.
- **Chemins HTML/JS** : Tous les attributs `href` et `src` doivent êtres strictement absolus depuis la racine Web (`/img/` ou `./img/`) ou purement relatifs (`../lieux/` etc.). Pas de chemins absolus locaux Windows de type `file://` ou `C:/...`.
- Il faut qu'un **unique script** point d'entrée (`main.js`) soit révoqué par une balise `<script type="module">` sans surcharge d'événements `DOMContentLoad`. Le navigateur cache le Module instantié.
- Pas de requêtes *fetch()* brutes sur des JSON si aucun Backend Node n'existe : privilégier l'injection JS pure pour le multi-langage ou charger en statique avec l’option cache.
