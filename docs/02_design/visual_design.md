# Identité Visuelle & Guidelines UI

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

---

# Principes UX

### 1. Respiration
L'interface utilise des marges massives (`--section-gap: 120px`). Un utilisateur ne doit jamais se sentir "à l'étroit". L'espace blanc est un outil de design.

### 2. Révélation (Reveal)
Rien n'apparaît de manière brutale. Tous les éléments utilisent l'`IntersectionObserver` pour apparaître par fondu enchaîné (`reveal-up`) au moment du défilement.

### 3. Glassmorphism
Les barres de navigation et les panneaux utilisent un effet de "verre dépoli" (`backdrop-filter: blur(10px)`) avec une fine bordure dorée, pour garder un lien visuel avec le contenu situé derrière.

---

# Structure de l'Interface

| Composant | Règle de Design |
| :--- | :--- |
| **Navbar** | Fixe, transparente au repos, devient floue au scroll. |
| **Grid** | Asymétrie légère pour casser la répétition robotique. |
| **Boutons** | Coins arrondis (`12px`), bordures fines, effet de survol lumineux. |
| **Cards** | Légère ombre portée (`shadow-sm`) pour les décoller du fond ivoire. |
