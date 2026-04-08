# Cahier des Charges - Plateforme TRACA

## 1. Vision du projet TRACA
TRACA est une plateforme numérique innovante, un "musée virtuel" dédié à l'exploration, la préservation et la transmission du patrimoine culturel et architectural algérien. L'objectif est double : 
1. **Accessibilité** : Offrir au monde entier un accès immersif à des sites algériens inaccessibles, protégés, ou méconnus.
2. **Mémoire Numérique** : Construire un pont technologique entre le passé archéologique/culturel et les générations futures (citoyens, diaspora, chercheurs, institutions).

Le projet se veut sobre, élégant et premium, avec une esthétique proche du luxe éditorial et des standards de conception muséale.

## 2. Objectifs culturels et UX
- **Immersion et Sensorialité** : Le site ne doit pas être un simple catalogue, mais une expérience. L'utilisation subtile du son (narration, musiques d'ambiance), de la vidéo et de décors 3D doit plonger le visiteur dans une atmosphère "Dark Fantasy" teintée de réalisme historique.
- **Transparence de l'Interface (UI)** : Les contrôles doivent être invisibles ou discrets pour laisser la place aux œuvres (glassmorphism réduit, typographies amples, marges généreuses).
- **Navigation Narrative** : L'utilisateur doit être porté dans un récit. Une "Visite Guidée" interactive (audio + défilement autonome) est au cœur de l'expérience d'accueil.

## 3. Description détaillée des pages

### A. Accueil (`index.html`)
- **Splash Vidéo** : Vidéo d'introduction plein écran, s'affichant avec le son **uniquement à la première venue** ou lors d'un clic explicite sur le logo. Mécanisme de fallback si l'autoplay audio est bloqué par le navigateur.
- **Hero** : Titre massif "TRACA", slogan "Patrimoine Algérien & Mémoire Numérique".
- **Le Manifeste** : Texte fondamental sur l'importance de la transmission.
- **Aperçu des Lieux** : Grille asymétrique des principales typologies de patrimoine (Archéologie, Monument, Architecture, Militaire, Art Rupestre).
- **Map Teaser** : Bloc appelant vers l'expérience cartographique 3D.
- **Institutionnel** : Bloc d'action formel pour les partenariats et le contact.

### B. Explorer / Catalogue (`explorer.html`)
- Grille narrative des lieux. Chaque typologie patrimoniale est présentée sous forme de grandes cartes d'images immersives.
- Permet l'accès aux pages détaillées.

### C. La Carte 3D (`carte.html`)
- Expérience géographique propulsée par Mapbox GL.
- Survol de l'Algérie en 3D avec reliefs topographiques.
- Interface de filtrage avancée (Chronologie, Typologies, Wilayas).
- Fiches de détails intégrées latéralement pour chaque point d'intérêt.

### D. Chroniques / Articles (`articles.html`)
- Design type "Editorial Magazine".
- Mise en valeur des récits historiques (ex: Mers Eddadjadj, Tombeau de la Chrétienne).
- Expérience de lecture fluide et aérée (interlignage optimisé, police empattée "Cormorant Garamond").

### E. Les Lieux 3D (`lieux/*.html`)
- Ex: `archeologique.html`, `medina.html`, `saharien.html`.
- Focus absolu sur des iFrames 3D (Sketchfab).
- Modèles interactifs intégrés sans barrières visuelles, accompagnés de textes documentaires (Histoire, Architecture, Découverte).
- Un lecteur audio autonome permet d'écouter la description du lieu.

### F. Contact (`contact.html`)
- Formulaire classique (Nom, Email, Objectif).
- Boutons radio pour cibler la demande (Presse, Institutionnel, Technique).

## 4. Parcours Utilisateur Complet
1. **Entrée (1ère visite)** : Splash vidéo immersif (sonore) ➔ Page d'accueil.
2. **Prise de conscience** : L'accueil explique le "Pourquoi" (Manifeste).
3. **Deux branches d'exploration** :
   - *Voie Catalogue* (Bouton "Explorer") ➔ Choix du type de patrimoine ➔ Vue 3D du lieu.
   - *Voie Géographique* (Bouton "Carte") ➔ Voyage aérien ➔ Sélection par région/époque.
4. **Fidélisation (Lecture)** : La section "Chroniques" permet une visite documentaire approfondie.
5. **Onboarding Contextuel** : Un bouton global "Lancer la visite guidée" permet de se faire dicter l'accueil sans interagir.

## 5. Règles Fonctionnelles et Contraintes UX
- **Performance** : Lazy-loading imposé sur toutes les images et iFrames 3D.
- **Polices** : Utilisation exclusive de *Cormorant Garamond* (Titres, accents liés à l'histoire) et *Inter* (Contenus UI pour la lisibilité).
- **Z-Index** : L'UI narrative (Visite Guidée, Vidéo Splash) doit toujours primer mathématiquement sur le Header et les Contenus (z-index supérieurs à 9000).
- **Mobile First** : Toutes les grilles (CSS Grid/Flex) doivent s'effondrer proprement sur mobile sans scrolling horizontal prohibé. Les padding/marges sont adaptatifs (`clamp()`).
