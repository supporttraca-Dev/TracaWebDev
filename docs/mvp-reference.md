# TRACA — Document de Référence MVP
> Version 1.0 — Février 2026 — Document interne

---

## 1. Vision

TRACA est une plateforme culturelle numérique dédiée à la valorisation, la préservation et la transmission du patrimoine architectural et culturel algérien à travers des expériences 3D immersives, une approche éditoriale rigoureuse et une narration accessible à tous.

**Positionnement :** Musée numérique vivant combinant exploration immersive, lecture et apprentissage, médiation culturelle.

---

## 2. Public Cible

1. Institutions culturelles & étatiques (Ministère de la Culture/Tourisme)
2. Touristes (nationaux & internationaux)
3. Écoles d'architecture, d'art, d'histoire
4. Étudiants et public curieux

---

## 3. Périmètre MVP

- **5 lieux** (génériques pour le prototype, remplaçables)
- Intégration Sketchfab via iframe
- Navigation libre 3D (desktop-first)
- Narration audio globale par lieu
- Contenu éditorial structuré
- Bilingue FR / EN

---

## 4. Les 5 Lieux (Génériques — MVP)

| # | Nom | Catégorie | Période |
|---|-----|-----------|---------|
| 1 | Site Archéologique Antique | Archéologie | Antiquité — Ier-IVe s. |
| 2 | Monument Funéraire Ancien | Patrimoine Monumental | Époque Ancienne — Ier s. av. J.-C. |
| 3 | Ancienne Médina | Architecture Vernaculaire | Médiéval — XIe-XVIIIe s. |
| 4 | Forteresse Historique | Architecture Militaire | Ottoman — XVIe-XIXe s. |
| 5 | Paysage Culturel Saharien | Art Rupestre & Paysage | Préhistoire — 10 000-4 000 av. J.-C. |

> ⚠️ Ces lieux sont **fictifs/génériques** — ils seront remplacés par les vrais sites algériens lors du lancement officiel.

---

## 5. Fonctionnalités par Lieu

- [x] Expérience 3D (Sketchfab iframe, click-to-load)
- [x] Texte historique structuré
- [x] Galerie d'images (placeholder)
- [x] Timeline simplifiée
- [x] Narration audio (mock/placeholder)
- [x] Bouton CTA "Lancer l'expérience"

---

## 6. Structure du Site

```
/                     → Home (Vision & Manifeste)
/explorer.html        → Liste des 5 lieux
/lieux/archeologique  → Site Archéologique Antique
/lieux/funeraire      → Monument Funéraire Ancien
/lieux/medina         → Ancienne Médina
/lieux/forteresse     → Forteresse Historique
/lieux/saharien       → Paysage Culturel Saharien
/about.html           → À propos & Vision
/contact.html         → Contact
```

---

## 7. Direction Artistique

### Palette CSS
```css
--ivory:          #F9F6EF;
--ivory-dark:     #F0EBE0;
--gold:           #C9963A;
--gold-light:     #E2B96A;
--gold-pale:      #F4E4C1;
--algerian-green: #458B73;
--ink:            #1A1612;
--ink-soft:       #3D3530;
--ink-muted:      #7A6E65;
--white:          #FFFFFF;
```

### Règles
- Or = accent principal institutionnel
- Vert algérien = accent secondaire discret (jamais dominant sur l'or)
- Blanc dominant, beaucoup d'espace
- Typographie : Cormorant Garamond (titres) + Inter (textes)
- Inspiration : musée contemporain, fondation culturelle, édition de luxe

---

## 8. Expérience 3D (MVP)

- Intégration via **Sketchfab iframe** (click-to-load)
- Scène de démo : `b2f3e84112d04bf1844e7ac2c4423566` (Hintze Hall NHM)
- À remplacer par scènes réelles lors du lancement
- Future évolution : Three.js natif (V2)

---

## 9. Langues

- **MVP** : Français (principal) + Anglais (toggle UI)
- **V2** : Arabe classique

---

## 10. Objectifs MVP

1. Valider l'identité visuelle TRACA
2. Convaincre institutions & financeurs
3. Démontrer la faisabilité technique
4. Créer une base scalable pour V2/V3
