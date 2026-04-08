# Historique du Développement & Journal des Décisions

## Historique du Développement

### Phase 1 : Genèse & Prototype
- **Date** : Janvier - Février 2026.
- **Événement** : Création du concept original TRACA. Mise en place de l'intro vidéo et de la navigation de base.
- **Décision clé** : Abandon des frameworks lourds (React/Next) pour le site principal au profit du Vanilla JS afin d'optimiser le SEO et la performance sur mobile.

### Phase 2 : Immersion Narrative
- **Événement** : Développement du moteur de *Visite Guidée*.
- **Défi** : Synchroniser le son avec le scroll sans saccades.
- **Solution** : Utilisation du plugin GSAP `ScrollTo` avec calcul dynamique de la vitesse basé sur `audio.duration`.

### Phase 3 : Déploiement & Stabilisation
- **Événement** : Configuration du build automatique sur Netlify.
- **Décision clé** : Masquer l'interface de traduction (i18n) pour la V1 afin de sortir un produit stable 100% francophone avant d'internationaliser.

---

# Journal des Décisions (ADR - Architectural Decision Records)

### ADR-001 : Utilisation de MapLibre vs Mapbox
- **Statut** : Accepté.
- **Contexte** : Mapbox a changé sa politique tarifaire.
- **Décision** : Utiliser MapLibre GL JS (open-source) pour garantir la gratuité et la souveraineté des données cartographiques.

### ADR-002 : Stockage Session
- **Statut** : Accepté.
- **Décision** : Utilisation de `sessionStorage` pour éviter de rejouer la vidéo d'intro à chaque refresh de page pendant une même session utilisateur.

---

# Évolution des Fonctionnalités
- **Visite Guidée** : Est passée d'un simple bouton "Scroll" à une expérience complète avec barre de contrôle, chapitrage et switch audio.
- **Carte** : Ajout des filtres par Wilaya et Typologie.
