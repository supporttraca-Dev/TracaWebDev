# Futur & Stratégie de Scaling

## Fonctionnalités Futures (Priorités)
1. **Moteur i18n Complet** : Réactivation du module de langue avec fichiers JSON externes.
2. **Dashboard Administrateur** : Interface permettant à un non-développeur d'ajouter un lieu via un formulaire (No-Code).
3. **Visites VR** : Support des casques Oculus/Quest pour une immersion totale dans les tombes et monuments.

---

# Prédictions d'Évolution
À mesure que la base de données de lieux augmentera, TRACA devra transitionner vers un modèle de **Backend as a Service (BaaS)** comme Supabase ou Firebase pour gérer :
- Les comptes utilisateurs.
- Les avis et contributions.
- La recherche full-text ultra-rapide.

---

# Stratégie de Scaling
- **Infrastructure** : Passage de Netlify Standard à un CDN mondial plus robuste si le trafic dépasse les 100k visites/mois.
- **Assets** : Utilisation d'un service de transformation d'images à la volée (Cloudinary) pour servir des formats adaptés à chaque appareil.
- **Données** : Migration du `geojson` statique vers une base de données spatiale (PostGIS) pour des calculs de proximité en temps réel.

---

# Améliorations Possibles
- **IA Narrative** : Génération de voix-off synthétique haute qualité dans plusieurs langues pour réduire les coûts de production audio.
- **Photogrammétrie Cloud** : Permettre aux utilisateurs de télécharger leurs photos de sites pour qu'elles soient traitées en 3D par notre serveur.
