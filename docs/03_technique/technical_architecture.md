# Architecture Technique

## Vue Globale
TRACA est construit sur une architecture **JAMstack** (JavaScript, API, Markup) ultra-légère. Aucun backend n'est requis pour le fonctionnement actuel, ce qui assure une performance maximale et une sécurité totale.

## Technologies Utilisées
- **Frontend** : Vanilla JS (Modules ES6).
- **Tooling** : Vite (Build tool & Dev server).
- **Animations** : GSAP (GreenSock Animation Platform).
- **Mapping** : MapLibre GL JS (Open-source fork de Mapbox).
- **3D Render** : Sketchfab Viewer API via embedding.

---

# Structure du Frontend

- **`style.css`** : Contient toutes les variables CSS et le système de design atomique.
- **`js/main.js`** : Orchestrateur central.
- **`js/tour.js`** : Logique de la visite guidée (isolée du reste pour éviter les chutes de performance).
- **`js/map-experience.js`** : Moteur cartographique indépendant.

---

# Architecture des Données

Actuellement, les données sont stockées de manières statiques pour garantir la vitesse :
1. **Lieux** : Gérés via un fichier `public/data/algeria-lieux.geojson`.
2. **Textes** : Intégrés directement dans le HTML (pour le SEO). La future version utilisera des fichiers JSON par langue.

---

# Processus de Déploiement

Le projet est hébergé sur **Netlify**.
- **Serveur de Build** : Netlify exécute `npm run build` (Vite).
- **Dossier de sortie** : `dist/`.
- **Mécanisme** : Continuous Deployment via Git (chaque commit sur `main` met à l'échelle la production).

---

# Limitations Techniques actuelles
- **Audio Autoplay** : Les navigateurs bloquent souvent le son au démarrage. Solution : Fallback en vidéo muette puis clic utilisateur.
- **Modèles 3D** : Trop de modèles Sketchfab sur une seule page peuvent saturer le GPU. Solution : Lazy-loading des IFrames via le script `main.js`.
