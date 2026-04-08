<div align="center">

# TRACA
## DOCUMENTATION OFFICIELLE DU PROJET

**Version : 1.0 (MVP Stable)**  
**Date : 8 Mars 2026**

---
*Ce document contient l'intégralité des spécifications, processus et visions de la plateforme TRACA.*

</div>

\pagebreak

# Table des Matières

1. [Vue d’ensemble du projet](#1-vue-densemble-du-projet)
2. [Produit](#2-produit)
3. [Design](#3-design)
4. [Technique](#4-technique)
5. [Développement](#5-développement)
6. [Contenu](#6-contenu)
7. [Direction artistique](#7-direction-artistique)
8. [Production](#8-production)
9. [Historique](#9-historique)
10. [Futur](#10-futur)

---

# 1. Vue d’ensemble du projet

## Qu'est-ce que TRACA ?
TRACA est une plateforme numérique immersive conçue comme un "musée numérique du futur". Elle est dédiée à la valorisation, la préservation et la transmission du patrimoine culturel et architectural algérien à travers des technologies de pointe (3D, cartographie interactive, narration audio).

## Pourquoi ce système existe ?
Le patrimoine algérien est vaste, millénaire et parfois difficile d'accès (raisons géographiques, préservation fragile, méconnaissance). TRACA existe pour :
1. **Démocratiser l'accès** : Permettre à n'importe qui, n'importe où, de visiter des sites historiques en 3D.
2. **Sauvegarder la mémoire** : Créer un jumeau numérique des sites pour lutter contre l'oubli et l'érosion du temps.
3. **Éduquer** : Offrir un support pédagogique moderne pour les écoles, les chercheurs et la diaspora.

## Comment il fonctionne ?
La plateforme repose sur trois piliers UX :
- **La Narration (Guided Tour)** : Une expérience "confortable" où l'utilisateur est guidé par une voix-off et un défilement automatique.
- **L'Exploration Libre (3D)** : L'intégration de modèles Sketchfab haute fidélité pour une inspection technique et artistique.
- **Le Contexte Géographique (Carte)** : Une carte 3D qui replace chaque monument dans son environnement réel.

## Évolution souhaitée
Le projet doit évoluer d'un prototype (MVP) vers un portail institutionnel de référence, intégrant des archives d'État, des visites en VR (Réalité Virtuelle) et une dimension communautaire (crowdsourcing de données patrimoniales).

### Résumé du Projet

| Entité | Détails |
| :--- | :--- |
| **Nom du Projet** | TRACA |
| **Secteur** | EdTech / Culture / Patrimoine |
| **Stack Tech** | Vanilla JS, Vite, GSAP, MapLibre |
| **Statut Actuel** | MVP (Version 1.0 - Stable) |
| **Déploiement** | Netlify |
| **Points forts** | Visite guidée synchronisée, immersion sonore, légèreté. |

### Objectifs du Projet

#### Objectifs Techniques
- **Zéro Friction** : Temps de chargement optimisé pour les modèles 3D.
- **Scalabilité** : Architecture permettant d'ajouter 100+ lieux sans alourdir le code principal.
- **Accessibilité** : Compatibilité mobile et liseuses.

#### Objectifs Créatifs
- **Esthétique Premium** : Utiliser les codes du luxe et du design éditorial (Serif fonts, blanc tournant).
- **Émotion** : Créer un lien affectif via la narration audio et le sound design.

### Vision à Long Terme
La vision à 5 ans pour TRACA est de devenir l'infrastructure numérique officielle de la Direction de la Culture en Algérie pour tout ce qui concerne l'inventaire numérique.

**Axes de développement :**
- **Souveraineté des données** : Migration vers un backend propriétaire sécurisé.
- **Réalité Augmentée** : Application mobile permettant de voir les reconstructions 3D directement *in situ* sur les ruines.
- **Réseau de Chercheurs** : Espace collaboratif pour ajouter des thèses et documents scientifiques liés à chaque site.

\pagebreak

# 2. Produit

## Présentation
TRACA est une Single Page Application (SPA) multi-vues qui combine des éléments de navigation web classique avec des modules d'immersion interactive. Elle se distingue par une interface "transparente" (UI invisible) qui favorise le contenu visuel.

## Expérience Utilisateur (UX)
L'utilisateur est accueilli par une vidéo d'introduction émotionnelle (Logo + Son). Suite à cela, il a deux choix majeurs :
1. **La Voie Guidée** : Appuyer sur "Démarrer la visite" pour se laisser porter.
2. **La Voie Exploratrice** : Utiliser la barre de navigation pour naviguer manuellement vers la Carte ou le Catalogue.

## Parcours Utilisateur (User Flows)
Le flux principal est hiérarchisé pour maximiser l'impact visuel dès les premières secondes. L'utilisateur peut passer de la contemplation à l'analyse géographie en un clic via la barre de navigation persistante.

## Fonctionnalités Clés

### 1. Moteur de Visite Guidée
- **Technologie** : GSAP ScrollTo + Audio API.
- **Fonctionnement** : Synchronise le défilement de la page sur la durée de fichiers audio mp3.
- **Avantage** : Onboarding immédiat sans effort pour l'utilisateur.

### 2. Explorateur de Lieux
- **Technologie** : CSS Grid / Sketchfab API.
- **Fonctionnement** : Catalogue des typologies patrimoniales avec fiches dédiées intégrant une scène 3D interactive.

### 3. Carte Immersive
- **Technologie** : MapLibre GL.
- **Fonctionnement** : Vue aérienne 3D de l'Algérie avec filtres par époque et wilaya.

## Roadmap Produit

### V1 (Actuelle)
- [x] Accueil avec Visite Guidée.
- [x] Catalogue 3D (5 sites de démonstration).
- [x] Carte interactive de base.

### V2 (Prochainement)
- [ ] Moteur de recherche global.
- [ ] Système multi-langues (Français, Arabe, Anglais) fonctionnel à 100%.
- [ ] Chroniques dynamiques via un CMS léger.

\pagebreak

# 3. Design

## Identité Visuelle
Le design de TRACA repose sur le concept de **"Luxe Historique"**. Le site doit évoquer la pierre, le sable, et le temps, tout en restant une œuvre technologique moderne.

### Palette de Couleurs
- **Sable / Ivoire** (`--ivory` : `#F9F6EF`) : Couleur de fond principale, évoquant le papier ancien ou la pierre calcaire.
- **Or / Terre Cuite** (`--gold` : `#A65E44`) : Couleur d'accentuation, utilisée pour les boutons et les éléments narratifs.
- **Bleu Nuit / Encre** (`--ink` : `#0B1320`) : Couleur des textes et des fonds profonds (Hero), assurant un contraste premium.
- **Vert Algérien** (`--algerian-green` : `#1E3B33`) : Couleur institutionnelle utilisée pour les labels de sections.

### Typographie
- **Titres** : `Cormorant Garamond` (Serif). Élégance, classicisme, évocation des manuscrits.
- **Corps de texte & UI** : `Inter` (Sans-serif). Modernité, lisibilité, neutralité.

## Principes UX

### 1. Respiration
L'interface utilise des marges massives (`--section-gap: 120px`). Un utilisateur ne doit jamais se sentir "à l'étroit".

### 2. Révélation (Reveal)
Rien n'apparaît de manière brutale. Tous les éléments utilisent l'`IntersectionObserver` pour apparaître par fondu enchaîné (`reveal-up`) au moment du défilement.

### 3. Glassmorphism
Les barres de navigation et les panneaux utilisent un effet de "verre dépoli" (`backdrop-filter: blur(10px)`) avec une fine bordure dorée, pour garder un lien visuel avec le contenu situé derrière.

## Structure de l'Interface

| Composant | Règle de Design |
| :--- | :--- |
| **Navbar** | Fixe, transparente au repos, devient floue au scroll. |
| **Grid** | Asymétrie légère pour casser la répétition robotique. |
| **Boutons** | Coins arrondis (`12px`), bordures fines, effet de survol lumineux. |
| **Cards** | Légère ombre portée (`shadow-sm`) pour les décoller du fond ivoire. |

\pagebreak

# 4. Technique

## Vue Globale
TRACA est construit sur une architecture **JAMstack** (JavaScript, API, Markup) ultra-légère. Aucun backend n'est requis pour le fonctionnement actuel, ce qui assure une performance maximale et une sécurité totale.

## Technologies Utilisées
- **Frontend** : Vanilla JS (Modules ES6).
- **Tooling** : Vite (Build tool & Dev server).
- **Animations** : GSAP (GreenSock Animation Platform).
- **Mapping** : MapLibre GL JS (Open-source fork de Mapbox).
- **3D Render** : Sketchfab Viewer API via embedding.

## Structure du Frontend
- **`style.css`** : Contient toutes les variables CSS et le système de design atomique.
- **`js/main.js`** : Orchestrateur central.
- **`js/tour.js`** : Logique de la visite guidée (isolée du reste pour éviter les chutes de performance).
- **`js/map-experience.js`** : Moteur cartographique indépendant.

## Architecture des Données
Actuellement, les données sont stockées de manières statiques pour garantir la vitesse :
1. **Lieux** : Gérés via un fichier `public/data/algeria-lieux.geojson`.
2. **Textes** : Intégrés directement dans le HTML (pour le SEO). La future version utilisera des fichiers JSON par langue.

## Processus de Déploiement
Le projet est hébergé sur **Netlify**.
- **Serveur de Build** : Netlify exécute `npm run build` (Vite).
- **Dossier de sortie** : `dist/`.
- **Mécanisme** : Continuous Deployment via Git.

## Limitations Techniques actuelles
- **Audio Autoplay** : Les navigateurs bloquent souvent le son au démarrage. Solution : Fallback en vidéo muette puis clic utilisateur.
- **Modèles 3D** : Trop de modèles Sketchfab sur une seule page peuvent saturer le GPU. Solution : Lazy-loading des IFrames via le script `main.js`.

\pagebreak

# 5. Développement

## Principes de Code
TRACA privilégie le **"Vanilla JavaScript"** (JS pur sans framework lourd) pour assurer la pérennité du projet.
1. **Modularité** : Chaque fonctionnalité majeure (Carte, Tour, UI) doit être dans son propre fichier dans `/js`.
2. **Nommage** : Utilisation du `camelCase` pour les variables/fonctions.
3. **Sémantique** : Le HTML doit utiliser des balises sémantiques (`<article>`, `<section>`, `<nav>`).

## Workflow de Développement
1. **Branchement** : Toute nouvelle feature doit être développée sur une branche `feature/nom-de-la-feature`.
2. **Revue de Code** : Un "Peer Review" est nécessaire avant chaque fusion sur `main`.
3. **Tests** : Tester systématiquement sur Chrome et Safari (iOS).

## Conventions de Code (Style Guide)
### CSS
- Utilisation systématique des variables `:root`.
- Unité `rem` privilégiée.
- Mobile First obligatoire : `@media (max-width: 768px)`.

### Processus de Déploiement
Le déploiement est automatisé via **Netlify**. Le build Vite génère un dossier optimisé pour la production dans `/dist`.

\pagebreak

# 6. Contenu

## Ton et Style Éditorial
Le ton de TRACA doit être **Instruit, Poétique et Institutionnel**. 
- **Instruit** : Les données historiques doivent être précises et sourcées.
- **Poétique** : Le texte doit inviter au voyage.
- **Institutionnel** : Le projet doit inspirer confiance.

## Organisation du Contenu
Le contenu est segmenté par "Lieu" (Fiche descriptive rapide) ou par "Chronique" (Documentaire long).

## Guidelines pour les nouveaux contenus
Tout nouveau lieu ajouté à la plateforme doit suivre cette fiche type :
1. **Identité** : Nom officiel + Coordonnées GPS.
2. **Narration** : Script audio prêt.
3. **Media** : Un modèle 3D Sketchfab et 3 photos de haute qualité.

## Langue et Traduction
Le français est la langue de référence actuelle. L'arabe est la priorité d'évolution immédiate pour toucher le public local et régional.

\pagebreak

# 7. Direction artistique

## Concept : "Le Patrimoine dans l'Ombre"
Le style graphique s'inspire de la **Dark Fantasy Historique**. On ne montre pas tout de suite, on laisse l'utilisateur découvrir via des effets de lumière et de scroll.

### Palette de Couleurs (Art)
- **Contrastes Profonds** : Dégradés sombres.
- **Détails Dorés** : Rappel du faste des civilisations passées.

## Guidelines Assets (Médias)
### Images
- **Style** : Désaturé, contraste élevé.
- **Format** : `.webp` obligatoire.

### Vidéos
- Format portrait (`intro-mobile.mp4`) et paysage (`intro.mp4`).

### 🏺 3D & Media Guidelines
- **Modèles Sketchfab** : Toujours vérifier que le mode "Shadows" est activé.
- **Performance** : Limiter les textures à 2K pour le web.

\pagebreak

# 8. Production

## Structure de l'Équipe (Rôles)
1. **Lead Producer** : Vision globale, budget.
2. **Lead Developer** : Architecture et performance.
3. **Art Director** : Identité visuelle.
4. **Historical Advisor** : Vérification des faits.

## Pipeline de Production (Workflow)
Chaque nouveau site passe par : Recherche ➔ Capture (3D) ➔ Rédaction ➔ Intégration ➔ Validation.

## Organisation du Travail
- **Outils** : GitHub pour le code, Trello pour les tâches.
- **Sprint** : Cycle de 2 semaines pour l'ajout d'une nouvelle zone.

\pagebreak

# 9. Historique

## Historique du Développement
### Phase 1 : Genèse & Prototype (Jan-Fév 2026)
Création du concept original TRACA, intro vidéo et navigation Vanilla JS.

### Phase 2 : Immersion Narrative
Développement du moteur de Visite Guidée synchronisée GSAP/Audio.

### Phase 3 : Déploiement & Stabilisation
Configuration Netlify et stabilisation du contenu 100% francophone.

## Journal des Décisions (ADR)
- **ADR-001** : Utilisation de MapLibre (Open-source) vs Mapbox pour la souveraineté.
- **ADR-002** : Utilisation de `sessionStorage` pour gérer la persistance de l'intro.

\pagebreak

# 10. Futur

## Fonctionnalités Futures (Priorités)
1. **Moteur i18n Complet** : Arabe et Anglais.
2. **Dashboard Administrateur** : Interface d'ajout de lieux en No-Code.
3. **Visites VR** : Support WebXR.

## Prédictions d'Évolution
Transition vers un modèle **BaaS** (Supabase) pour gérer les comptes utilisateurs et une base de données spatiale PostGIS.

## Stratégie de Scaling
- **Infrastructure** : CDN mondial.
- **Assets** : Transformation d'images dynamique.
- **IA Narrative** : Voix-off synthétique multilingue par IA.
