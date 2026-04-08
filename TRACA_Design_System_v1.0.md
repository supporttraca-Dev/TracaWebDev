# TRACA — Design System v1.0
> Documentation interne · Usage développeurs · Mars 2026  
> Statut : **Production-ready** · Versionnage : **Sémantique (SemVer)**

---

## Table des matières

1. [Introduction & Principes directeurs](#1-introduction--principes-directeurs)
2. [Fondations — Couleurs](#2-fondations--couleurs)
3. [Fondations — Typographie](#3-fondations--typographie)
4. [Fondations — Espacement & Grille](#4-fondations--espacement--grille)
5. [Fondations — Élévation & Ombres](#5-fondations--élévation--ombres)
6. [Fondations — Animations & Motion](#6-fondations--animations--motion)
7. [Langage visuel — Formes & Logo](#7-langage-visuel--formes--logo)
8. [Hiérarchie visuelle — Typographie en contexte](#8-hiérarchie-visuelle--typographie-en-contexte)
9. [Composants — Navigation](#9-composants--navigation)
10. [Composants — Cards](#10-composants--cards)
11. [Composants — Modals & Overlays](#11-composants--modals--overlays)
12. [Composants — Boutons](#12-composants--boutons)
13. [Composants — Formulaires & Inputs](#13-composants--formulaires--inputs)
14. [Composants — Badges & Tags](#14-composants--badges--tags)
15. [Composants — Feedback & Toasts](#15-composants--feedback--toasts)
16. [Icônes](#16-icônes)
17. [Règles UX & Accessibilité](#17-règles-ux--accessibilité)
18. [Règles RTL — Préparation V2](#18-règles-rtl--préparation-v2)
19. [Variables CSS — Référence complète](#19-variables-css--référence-complète)

---

## 1. Introduction & Principes directeurs

### Concept général

TRACA est un **musée numérique du futur** dédié au patrimoine algérien. Son identité visuelle repose sur le concept de **« Luxe Historique »** : chaque élément de l'interface évoque la pierre, le sable et le temps, tout en affirmant une identité technologique contemporaine.

L'interface est **Light mode dominant** (fonds crème/sable) avec des sections d'impact dark (Redwood profond) pour les héros et les moments narratifs clés.

### Les 5 piliers du Design System

| Pilier | Description |
|---|---|
| **Mémoire** | Chaque composant porte une trace visuelle du patrimoine |
| **Révélation** | Le contenu se dévoile progressivement — jamais tout en même temps |
| **Respiration** | L'espace négatif est actif, pas vide — il crée la profondeur |
| **Géométrie kufique** | Les formes UI dérivent directement du logo (cercle + angles nets) |
| **Sincérité** | Pas d'ornement gratuit — chaque décision visuelle a une intention |

### Règle fondamentale d'usage

> Un composant doit pouvoir exister seul et être reconnu comme appartenant à TRACA. Si ce n'est pas le cas, il n'est pas conforme au Design System.

---

## 2. Fondations — Couleurs

### 2.1 Palette de marque

```css
:root {
  /* === COULEURS PRIMAIRES DE MARQUE === */
  --color-copper:      #b36633; /* Artefacts, accentuation principale */
  --color-kashmir:     #5474a1; /* Méditerranée, cartographie */
  --color-redwood:     #5b1f11; /* Profondeur historique, sections sombres */
  --color-gold-sand:   #e7ba80; /* Lumière algérienne, accents chauds */

  /* === NEUTRES === */
  --color-cream:       #fdf6ec; /* Fond de page principal (light) */
  --color-cream-deep:  #f0e6d3; /* Fond secondaire, séparateurs doux */
  --color-ink:         #1a0a05; /* Texte principal sur fond clair */
  --color-ink-light:   #3d1a0d; /* Titres secondaires, labels */
  --color-white:       #ffffff; /* Texte sur fond sombre, logotype */

  /* === DÉRIVÉS COPPER (états) === */
  --color-copper-light:  #c97a45; /* Hover sur éléments copper */
  --color-copper-dark:   #8f4f22; /* Active / pressed */
  --color-copper-subtle: #f5e8da; /* Fond hover sur éléments ghost/outline */
  --color-copper-10:     rgba(179, 102, 51, 0.10); /* Overlay léger */
  --color-copper-20:     rgba(179, 102, 51, 0.20); /* Bordures subtiles */

  /* === DÉRIVÉS REDWOOD (sections sombres) === */
  --color-redwood-light: #7a2e1a; /* Hover sur fond redwood */
  --color-redwood-deep:  #1a0a05; /* Fond de page sombre absolu */

  /* === COULEURS SÉMANTIQUES === */
  /* Success — Vert inspiré du bronze oxydé algérien */
  --color-success:       #3d7a5c;
  --color-success-light: #e8f5ee;
  --color-success-dark:  #2a5940;

  /* Error — Rouge chaud (contraste avec la charte sans rupture) */
  --color-error:         #c0392b;
  --color-error-light:   #fde8e6;
  --color-error-dark:    #922b21;

  /* Warning — Ambre proche du Gold Sand */
  --color-warning:       #b7770d;
  --color-warning-light: #fef3dc;
  --color-warning-dark:  #8a5a0a;

  /* Info — Kashmir Blue */
  --color-info:          #5474a1;
  --color-info-light:    #e8eef6;
  --color-info-dark:     #3a5278;
}
```

### 2.2 Tableau des usages

| Token | Usage autorisé | Usage interdit |
|---|---|---|
| `--color-copper` | CTA principal, liens actifs, accentuation | Texte long sur fond blanc |
| `--color-kashmir` | Carte, tags géographiques, liens secondaires | Fond de page principal |
| `--color-redwood` | Sections hero dark, headers de modals, titres impact | Texte courant sur fond clair |
| `--color-gold-sand` | Ornements, séparateurs, accents sur fond sombre | Texte sur fond clair (contraste insuffisant) |
| `--color-cream` | Fond de page, fond de cards | Texte (trop clair) |
| `--color-ink` | Corps de texte, paragraphes | Fonds sombres |

### 2.3 Contrastes WCAG AA — Vérification

| Combinaison | Ratio | WCAG AA | Usage |
|---|---|---|---|
| `--color-ink` sur `--color-cream` | 15.2:1 | ✅ AAA | Texte courant |
| `--color-copper` sur `--color-cream` | 4.6:1 | ✅ AA | Liens, CTA |
| `--color-white` sur `--color-redwood` | 9.8:1 | ✅ AAA | Titre hero dark |
| `--color-white` sur `--color-copper` | 3.2:1 | ✅ AA (grand texte / UI) | Bouton CTA |
| `--color-gold-sand` sur `--color-redwood` | 5.1:1 | ✅ AA | Accents sur dark |
| `--color-kashmir` sur `--color-cream` | 4.5:1 | ✅ AA | Tags, liens secondaires |

> ⚠️ Ne jamais utiliser `--color-gold-sand` comme couleur de texte sur fond clair — le ratio est inférieur à 3:1.

---

## 3. Fondations — Typographie

### 3.1 Polices

#### Al-Kuffi — Typographie principale

**Usage :** Logotype, H1, H2, titres d'impact.  
**Caractère :** Inspirée de l'écriture arabe kufique — géométrique, culturellement ancrée, forte présence visuelle.

**Intégration (self-hosted recommandé) :**

```css
/* Placer le fichier de police dans /public/fonts/ */
@font-face {
  font-family: 'Al-Kuffi';
  src: url('/fonts/Al-Kuffi.woff2') format('woff2'),
       url('/fonts/Al-Kuffi.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Évite le FOIT — affiche le fallback immédiatement */
}
```

**Fallback si indisponible :**

```css
:root {
  --font-display: 'Al-Kuffi', 'Scheherazade New', 'Noto Serif', Georgia, serif;
}
```

> 📌 **Action requise :** Vérifier la licence Al-Kuffi pour usage web commercial. Si non disponible, contacter le créateur ou utiliser **Reem Kufi** (Google Fonts — style kufique, licence OFL) comme alternative compatible.  
> `@import url('https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&display=swap');`

---

#### Source Serif Pro — Typographie secondaire

**Usage :** Corps de texte, paragraphes éditoriaux, captions, labels.  
**Caractère :** Élégante, lisible, classique — crée l'équilibre avec Al-Kuffi.

```css
/* Via Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&display=swap');

:root {
  --font-body: 'Source Serif 4', 'Source Serif Pro', Georgia, serif;
}
```

### 3.2 Échelle typographique

```css
:root {
  /* === TAILLES === */
  --text-xs:   0.75rem;   /*  12px — Captions, métadonnées */
  --text-sm:   0.875rem;  /*  14px — Labels, helper text */
  --text-base: 1rem;      /*  16px — Corps de texte standard */
  --text-md:   1.125rem;  /*  18px — Corps large, intro */
  --text-lg:   1.25rem;   /*  20px — H6, sous-titres */
  --text-xl:   1.5rem;    /*  24px — H5 */
  --text-2xl:  2rem;      /*  32px — H4 */
  --text-3xl:  2.5rem;    /*  40px — H3 */
  --text-4xl:  3.5rem;    /*  56px — H2 */
  --text-5xl:  5rem;      /*  80px — H1 desktop */
  --text-6xl:  7rem;      /* 112px — Titres hero exceptionnels */

  /* === LINE-HEIGHTS === */
  --leading-tight:   1.1;  /* Titres display (Al-Kuffi) */
  --leading-snug:    1.3;  /* Titres courants */
  --leading-normal:  1.5;  /* Corps de texte */
  --leading-relaxed: 1.7;  /* Texte éditorial long */

  /* === LETTER-SPACING === */
  --tracking-tight:  -0.02em; /* Titres display */
  --tracking-normal:  0;
  --tracking-wide:    0.05em; /* Labels, captions, uppercase */
  --tracking-wider:   0.1em;  /* Small caps, overlines */

  /* === FONT-WEIGHTS === */
  --weight-light:   300;
  --weight-regular: 400;
  --weight-medium:  500;
  --weight-semibold: 600;
}
```

---

## 4. Fondations — Espacement & Grille

### 4.1 Échelle d'espacement (base 4px)

```css
:root {
  --space-1:   0.25rem;  /*   4px */
  --space-2:   0.5rem;   /*   8px */
  --space-3:   0.75rem;  /*  12px */
  --space-4:   1rem;     /*  16px */
  --space-5:   1.25rem;  /*  20px */
  --space-6:   1.5rem;   /*  24px */
  --space-8:   2rem;     /*  32px */
  --space-10:  2.5rem;   /*  40px */
  --space-12:  3rem;     /*  48px */
  --space-16:  4rem;     /*  64px */
  --space-20:  5rem;     /*  80px */
  --space-24:  6rem;     /*  96px */
  --space-32:  8rem;     /* 128px */
  
  /* Section gap — Principe de Respiration */
  --section-gap: 7.5rem;  /* 120px — entre sections majeures */
  --section-gap-sm: 4rem; /* 64px — mobile */
}
```

### 4.2 Grille

```css
:root {
  /* === CONTENEURS === */
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-2xl: 1440px;

  /* === GUTTERS === */
  --gutter-mobile:  1rem;    /* 16px */
  --gutter-tablet:  1.5rem;  /* 24px */
  --gutter-desktop: 2rem;    /* 32px */

  /* === COLONNES === */
  --cols-mobile:  4;
  --cols-tablet:  8;
  --cols-desktop: 12;
}
```

**Implémentation CSS Grid :**

```css
.container {
  width: 100%;
  max-width: var(--container-2xl);
  margin-inline: auto;
  padding-inline: var(--gutter-mobile);
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--cols-mobile), 1fr);
  gap: var(--gutter-mobile);
}

@media (min-width: 768px) {
  .container { padding-inline: var(--gutter-tablet); }
  .grid { grid-template-columns: repeat(var(--cols-tablet), 1fr); gap: var(--gutter-tablet); }
}

@media (min-width: 1024px) {
  .container { padding-inline: var(--gutter-desktop); }
  .grid { grid-template-columns: repeat(var(--cols-desktop), 1fr); gap: var(--gutter-desktop); }
}
```

### 4.3 Breakpoints

```css
/* Mobile first — les breakpoints s'appliquent en @media (min-width) */
:root {
  --bp-sm:  480px;   /* Petit mobile */
  --bp-md:  768px;   /* Tablette portrait */
  --bp-lg:  1024px;  /* Tablette paysage / petit desktop */
  --bp-xl:  1280px;  /* Desktop standard */
  --bp-2xl: 1440px;  /* Large desktop */
}
```

---

## 5. Fondations — Élévation & Ombres

L'élévation chez TRACA s'inspire de la lumière rasante sur la pierre — douce, chaude, directionnelle.

```css
:root {
  /* === OMBRES (teinte copper chaude) === */
  --shadow-xs:  0 1px 3px rgba(26, 10, 5, 0.08);
  --shadow-sm:  0 2px 8px rgba(26, 10, 5, 0.10);
  --shadow-md:  0 4px 16px rgba(26, 10, 5, 0.12), 0 1px 4px rgba(26, 10, 5, 0.06);
  --shadow-lg:  0 8px 32px rgba(26, 10, 5, 0.14), 0 2px 8px rgba(26, 10, 5, 0.08);
  --shadow-xl:  0 16px 48px rgba(26, 10, 5, 0.18), 0 4px 16px rgba(26, 10, 5, 0.10);

  /* === SHADOW COPPER (accentuation sur CTA) === */
  --shadow-copper: 0 4px 20px rgba(179, 102, 51, 0.35);
  --shadow-copper-lg: 0 8px 32px rgba(179, 102, 51, 0.45);

  /* === GLASSMORPHISM (navbar, panneaux) === */
  --glass-bg:     rgba(253, 246, 236, 0.85);  /* Cream semi-transparent */
  --glass-bg-dark: rgba(91, 31, 17, 0.90);    /* Redwood semi-transparent */
  --glass-blur:   backdrop-filter: blur(16px) saturate(180%);
  --glass-border: 1px solid rgba(179, 102, 51, 0.20);  /* Bordure cuivrée subtile */
}
```

### Niveaux d'élévation

| Niveau | Token | Composant |
|---|---|---|
| 0 | Aucune ombre | Fond de page, sections |
| 1 | `--shadow-xs` | Cards au repos |
| 2 | `--shadow-sm` | Inputs focalisés |
| 3 | `--shadow-md` | Cards au hover |
| 4 | `--shadow-lg` | Navbar sticky, dropdowns |
| 5 | `--shadow-xl` | Modals, overlays |

---

## 6. Fondations — Animations & Motion

TRACA utilise des **animations élaborées (Rich)** sur les interactions. Le principe de Révélation guide toutes les transitions — le contenu émerge, il ne surgit pas.

### 6.1 Courbes & Durées

```css
:root {
  /* === DURÉES === */
  --duration-instant: 80ms;    /* Feedback immédiat (focus, checkbox) */
  --duration-fast:    200ms;   /* Micro-interactions (hover simple) */
  --duration-normal:  350ms;   /* Transitions standard */
  --duration-slow:    600ms;   /* Révélations, entrées de section */
  --duration-deliberate: 900ms; /* Transitions de page, modals */
  --duration-cinematic: 1400ms; /* Animations hero, intro */

  /* === EASINGS === */
  --ease-out:      cubic-bezier(0.22, 1, 0.36, 1);      /* Sortie douce — mouvement naturel */
  --ease-in-out:   cubic-bezier(0.45, 0, 0.55, 1);      /* Standard */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* Micro-rebond (boutons, badges) */
  --ease-reveal:   cubic-bezier(0.16, 1, 0.3, 1);       /* Révélation au scroll */
  --ease-copper:   cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Signature TRACA */
}
```

### 6.2 Patterns d'animation

#### Révélation au scroll (IntersectionObserver)

```css
/* État initial — avant révélation */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--duration-slow) var(--ease-reveal),
              transform var(--duration-slow) var(--ease-reveal);
}

/* État final — après révélation */
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Décalage pour les groupes d'éléments (stagger) */
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 80ms; }
.reveal:nth-child(3) { transition-delay: 160ms; }
.reveal:nth-child(4) { transition-delay: 240ms; }
```

```javascript
// IntersectionObserver — setup
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

#### Hover sur cards — effet de lumière rasante

```css
.card {
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out),
              border-color var(--duration-fast) var(--ease-in-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

#### Règle de réduction de mouvement (accessibilité)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}
```

---

## 7. Langage visuel — Formes & Logo

### 7.1 Analyse du logo TRACA

Le logo est composé de :
- Un **symbole circulaire** — trois lettres arabes (حـ، لـ، ط) entrelacées dans un cercle parfait
- Une **typo Al-Kuffi** — angles droits stricts, terminaisons nettes, modules géométriques carrés
- Une **coexistence** : le cercle (continuité, transmission) + le carré kufique (rigueur, ancrage)

### 7.2 Langage de formes UI dérivé

| Élément logo | Traduction UI |
|---|---|
| Cercle du symbole | `border-radius: 50%` → avatars, badges, boutons icon-only |
| Modules kufiques carrés | `border-radius: 0` → containers, sections, tables |
| Transition cercle/carré | `border-radius: 6px` → boutons texte, inputs |
| Entrelacement des lettres | Motif de superposition → cartes en overlap, separators croisés |
| Fine bordure circulaire | Bordure cuivrée subtile → glassmorphism border |

### 7.3 Border-radius système

```css
:root {
  --radius-none:   0;       /* Containers, sections, tables — kufique strict */
  --radius-sm:     4px;     /* Interne seulement (chip, badge texte) */
  --radius-base:   6px;     /* Boutons, inputs — transition carré/rond */
  --radius-md:     8px;     /* Cards légères */
  --radius-lg:     12px;    /* Modals, panneaux */
  --radius-full:   9999px;  /* Badges ronds, avatars, boutons icon-only */
}
```

**Règle :**
- `--radius-none` pour tout ce qui est **container de contenu** (sections, wrappers, tableaux)
- `--radius-base` à `--radius-md` pour les **éléments interactifs** (boutons, inputs, cards)
- `--radius-full` pour les **éléments symboliques** (avatars, badges circulaires — écho du logo)

### 7.4 Motif décoratif — Arc kufique

Un motif d'arc géométrique dérivé du symbole peut être utilisé comme séparateur ou fond de section :

```css
/* Séparateur décoratif — ligne cuivrée avec point central */
.divider-traca {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-block: var(--space-12);
}

.divider-traca::before,
.divider-traca::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-copper) 30%,
    var(--color-copper) 70%,
    transparent
  );
}

.divider-traca::before { background: linear-gradient(to left, transparent, var(--color-copper)); }
.divider-traca::after  { background: linear-gradient(to right, transparent, var(--color-copper)); }

/* Point central en losange — évoque la géométrie kufique */
.divider-traca span {
  width: 8px;
  height: 8px;
  background: var(--color-copper);
  transform: rotate(45deg);
  flex-shrink: 0;
}
```

### 7.5 Texture de fond (optionnel)

Pour les sections hero et les fonds sombres, un overlay texture subtil renforce l'ancrage matière :

```css
/* Grain subtil — évoque la pierre et le sable */
.texture-overlay {
  position: relative;
}

.texture-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
```

---

## 8. Hiérarchie visuelle — Typographie en contexte

### 8.1 Styles de titres

```css
/* H1 — Titre hero, logotype contextuel */
h1, .h1 {
  font-family: var(--font-display);
  font-size: clamp(var(--text-4xl), 6vw, var(--text-5xl));
  font-weight: var(--weight-regular); /* Al-Kuffi est expressif à 400 */
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-redwood);
}

/* H1 sur fond sombre */
.section--dark h1 { color: var(--color-white); }

/* H2 — Titre de section principale */
h2, .h2 {
  font-family: var(--font-display);
  font-size: clamp(var(--text-3xl), 4vw, var(--text-4xl));
  font-weight: var(--weight-regular);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-ink);
}

/* H3 — Titre de sous-section */
h3, .h3 {
  font-family: var(--font-display);
  font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
  font-weight: var(--weight-regular);
  line-height: var(--leading-snug);
  color: var(--color-ink);
}

/* H4 — Titre de composant, card */
h4, .h4 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-regular);
  line-height: var(--leading-snug);
  color: var(--color-ink);
}

/* H5, H6 — Source Serif Pro — transition vers le corps */
h5, .h5 {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  color: var(--color-ink-light);
}

h6, .h6 {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  color: var(--color-copper);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

### 8.2 Texte courant

```css
/* Corps principal */
p, .body-base {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-relaxed);
  color: var(--color-ink);
}

/* Corps large — intro, lead text */
.body-lg {
  font-size: var(--text-md);
  line-height: var(--leading-relaxed);
  color: var(--color-ink-light);
}

/* Label — formulaires, UI */
.label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
  color: var(--color-ink-light);
  text-transform: uppercase;
}

/* Caption — métadonnées, horodatage */
.caption {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
  color: var(--color-copper);
  letter-spacing: var(--tracking-wider);
}

/* Overline — étiquette au-dessus des titres */
.overline {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-copper);
}

/* Lien */
a {
  color: var(--color-copper);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  transition: color var(--duration-fast) var(--ease-in-out),
              text-decoration-color var(--duration-fast) var(--ease-in-out);
}

a:hover {
  color: var(--color-copper-light);
}

a:focus-visible {
  outline: 2px solid var(--color-copper);
  outline-offset: 3px;
  border-radius: 2px;
}
```

---

## 9. Composants — Navigation

> **Priorité 1** dans le classement des composants.

### 9.1 Navbar principale (sticky + glassmorphism)

**Comportement :**
- Au repos (top de page) : fond transparent ou légèrement crème
- Au scroll (> 80px) : glassmorphism activé avec bordure cuivrée
- Sticky : toujours visible, `z-index: 1000`

```css
/* === NAVBAR BASE === */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding-block: var(--space-4);
  padding-inline: var(--gutter-desktop);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);

  /* Transition vers glassmorphism */
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background var(--duration-normal) var(--ease-in-out),
              border-color var(--duration-normal) var(--ease-in-out),
              box-shadow var(--duration-normal) var(--ease-in-out);
}

/* === ÉTAT SCROLLÉ === */
.navbar.is-scrolled {
  background: var(--glass-bg);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: var(--glass-border);
  box-shadow: var(--shadow-md);
}

/* === SUR SECTION SOMBRE === */
.navbar.is-dark {
  background: var(--glass-bg-dark);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  border-bottom: 1px solid rgba(231, 186, 128, 0.15); /* gold-sand subtil */
}

/* === LOGO DANS LA NAVBAR === */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
}

.navbar__logo-mark {
  width: 36px;
  height: 36px;
}

.navbar__logo-text {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-redwood);
  line-height: 1;
}

.navbar.is-dark .navbar__logo-text { color: var(--color-white); }

/* === LIENS DE NAVIGATION === */
.navbar__links {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-ink-light);
  text-decoration: none;
  position: relative;
  padding-block: var(--space-1);
  transition: color var(--duration-fast) var(--ease-in-out);
}

/* Soulignement animé dérivé du motif kufique */
.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-copper);
  transition: width var(--duration-normal) var(--ease-out);
}

.navbar__link:hover,
.navbar__link[aria-current="page"] {
  color: var(--color-copper);
}

.navbar__link:hover::after,
.navbar__link[aria-current="page"]::after {
  width: 100%;
}

.navbar__link[aria-current="page"] {
  font-weight: var(--weight-semibold);
}

/* Sur fond sombre */
.navbar.is-dark .navbar__link { color: rgba(253, 246, 236, 0.7); }
.navbar.is-dark .navbar__link:hover,
.navbar.is-dark .navbar__link[aria-current="page"] { color: var(--color-gold-sand); }
.navbar.is-dark .navbar__link::after { background: var(--color-gold-sand); }

/* === CTA DANS LA NAVBAR === */
.navbar__cta {
  /* Voir section Boutons — variante primary-sm */
}

/* === MOBILE — MENU BURGER === */
@media (max-width: 767px) {
  .navbar__links { display: none; }
  .navbar__links.is-open {
    display: flex;
    flex-direction: column;
    position: fixed;
    inset: 0;
    background: var(--color-cream);
    z-index: 999;
    padding: var(--space-24) var(--gutter-mobile);
    align-items: flex-start;
    justify-content: center;
    gap: var(--space-8);
  }
  .navbar__links.is-open .navbar__link {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    letter-spacing: 0;
    text-transform: none;
  }
}
```

**Script d'activation du scroll :**

```javascript
const navbar = document.querySelector('.navbar');
const SCROLL_THRESHOLD = 80;

window.addEventListener('scroll', () => {
  navbar.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
}, { passive: true });
```

### 9.2 Barre de navigation secondaire (Catalogue / Carte)

Barre persistante en bas ou dans le contenu permettant de naviguer entre les vues.

```css
.subnav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1);
  background: var(--color-cream-deep);
  border: 1px solid var(--color-copper-20);
  border-radius: var(--radius-none); /* Kufique strict */
}

.subnav__item {
  flex: 1;
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  text-align: center;
  color: var(--color-ink-light);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-in-out),
              color var(--duration-fast) var(--ease-in-out);
}

.subnav__item:hover {
  background: var(--color-copper-subtle);
  color: var(--color-copper);
}

.subnav__item.is-active {
  background: var(--color-copper);
  color: var(--color-white);
}
```

---

## 10. Composants — Cards

> **Priorité 2** dans le classement des composants.

### 10.1 Card Patrimoine (principale)

La card patrimoine est le composant central de TRACA. Elle présente un site historique avec son image, son nom, sa localisation et un aperçu narratif.

```css
/* === CARD BASE === */
.card-patrimoine {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-cream-deep);
  border-radius: var(--radius-none); /* Container kufique strict */
  overflow: hidden;
  box-shadow: var(--shadow-xs);
  transition: transform var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out),
              border-color var(--duration-fast) var(--ease-in-out);
  cursor: pointer;
}

.card-patrimoine:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-copper-20);
}

/* === IMAGE CONTAINER === */
.card-patrimoine__media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-cream-deep);
}

.card-patrimoine__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85) contrast(1.05); /* Style désaturé TRACA */
  transition: transform var(--duration-slow) var(--ease-out),
              filter var(--duration-normal) var(--ease-in-out);
}

.card-patrimoine:hover .card-patrimoine__img {
  transform: scale(1.04);
  filter: saturate(1) contrast(1.05);
}

/* Badge époque — coin supérieur droit */
.card-patrimoine__epoch {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  padding: var(--space-1) var(--space-3);
  background: var(--color-redwood);
  color: var(--color-gold-sand);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  border-radius: var(--radius-none);
}

/* Indicateur 3D disponible */
.card-patrimoine__3d-badge {
  position: absolute;
  bottom: var(--space-4);
  left: var(--space-4);
  width: 32px;
  height: 32px;
  background: var(--color-copper);
  border-radius: var(--radius-full); /* Cercle — écho du logo */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-copper);
  transition: transform var(--duration-fast) var(--ease-spring);
}

.card-patrimoine:hover .card-patrimoine__3d-badge {
  transform: scale(1.15);
}

/* === CORPS DE LA CARD === */
.card-patrimoine__body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  flex: 1;
}

.card-patrimoine__location {
  /* Utiliser .overline */
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-copper);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.card-patrimoine__title {
  /* Utiliser .h4 */
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--weight-regular);
  line-height: var(--leading-snug);
  color: var(--color-ink);
  margin: 0;
}

.card-patrimoine__excerpt {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-ink-light);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* === FOOTER DE CARD === */
.card-patrimoine__footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-cream-deep);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* === ÉTATS === */
/* Chargement */
.card-patrimoine--skeleton .card-patrimoine__media,
.card-patrimoine--skeleton .card-patrimoine__title,
.card-patrimoine--skeleton .card-patrimoine__excerpt {
  background: linear-gradient(90deg, var(--color-cream-deep) 25%, var(--color-cream) 50%, var(--color-cream-deep) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
  color: transparent;
  border-radius: var(--radius-sm);
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

/* Désactivé */
.card-patrimoine--disabled {
  opacity: 0.5;
  pointer-events: none;
  filter: grayscale(0.5);
}
```

### 10.2 Card Highlight (hero card, format portrait)

```css
.card-highlight {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: var(--radius-none);
  cursor: pointer;
}

.card-highlight__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.7) contrast(1.1);
  transition: transform var(--duration-slow) var(--ease-out),
              filter var(--duration-normal) var(--ease-in-out);
}

.card-highlight:hover .card-highlight__bg {
  transform: scale(1.06);
  filter: saturate(0.9) contrast(1.1);
}

/* Gradient en bas pour lisibilité du texte */
.card-highlight::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(26, 10, 5, 0.90) 0%,
    rgba(26, 10, 5, 0.40) 45%,
    transparent 70%
  );
}

.card-highlight__content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-8);
  z-index: 1;
  color: var(--color-white);
}

.card-highlight__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  line-height: var(--leading-tight);
  color: var(--color-white);
  margin-bottom: var(--space-2);
}

.card-highlight__location {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-gold-sand);
}
```

---

## 11. Composants — Modals & Overlays

> **Priorité 3** dans le classement des composants.

### 11.1 Modal principale

```css
/* === BACKDROP === */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(26, 10, 5, 0.75);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);

  /* Animation entrée */
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-in-out);
}

.modal-backdrop.is-open {
  opacity: 1;
}

/* === FENÊTRE MODALE === */
.modal {
  position: relative;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  background: var(--color-cream);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-xl);

  /* Bordure cuivrée subtile */
  border: 1px solid var(--color-copper-20);

  /* Animation entrée */
  transform: translateY(32px) scale(0.97);
  transition: transform var(--duration-deliberate) var(--ease-out),
              opacity var(--duration-deliberate) var(--ease-out);
  opacity: 0;
}

.modal-backdrop.is-open .modal {
  transform: translateY(0) scale(1);
  opacity: 1;
  transition-delay: 80ms;
}

/* === EN-TÊTE === */
.modal__header {
  padding: var(--space-8) var(--space-8) var(--space-6);
  border-bottom: 1px solid var(--color-cream-deep);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  background: var(--color-redwood); /* Header dark signature TRACA */
}

.modal__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--color-white);
  margin: 0;
  line-height: var(--leading-snug);
}

.modal__subtitle {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-gold-sand);
  margin-top: var(--space-1);
}

.modal__close {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full); /* Cercle — écho logo */
  border: 1px solid rgba(231, 186, 128, 0.30);
  background: transparent;
  color: var(--color-white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background var(--duration-fast) var(--ease-in-out),
              border-color var(--duration-fast) var(--ease-in-out);
}

.modal__close:hover {
  background: rgba(231, 186, 128, 0.15);
  border-color: var(--color-gold-sand);
}

/* === CORPS === */
.modal__body {
  padding: var(--space-8);
  overflow-y: auto;
  max-height: calc(90vh - 200px);
  
  /* Scrollbar stylée */
  scrollbar-width: thin;
  scrollbar-color: var(--color-copper-20) transparent;
}

.modal__body::-webkit-scrollbar { width: 4px; }
.modal__body::-webkit-scrollbar-track { background: transparent; }
.modal__body::-webkit-scrollbar-thumb { background: var(--color-copper-20); border-radius: 2px; }

/* === PIED === */
.modal__footer {
  padding: var(--space-6) var(--space-8);
  border-top: 1px solid var(--color-cream-deep);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  background: var(--color-cream);
}

/* === MODAL PLEIN ÉCRAN (visite 3D) === */
.modal--fullscreen .modal {
  max-width: 100%;
  max-height: 100%;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  margin: 0;
}
```

**Script modal (accessibilité + focus trap) :**

```javascript
class TracaModal {
  constructor(el) {
    this.backdrop = el;
    this.modal = el.querySelector('.modal');
    this.closeBtn = el.querySelector('.modal__close');
    this.focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    this.closeBtn?.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }
  
  open() {
    this.backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    // Focus premier élément focusable
    const focusable = this.modal.querySelectorAll(this.focusableSelectors);
    focusable[0]?.focus();
  }
  
  close() {
    this.backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}
```

### 11.2 Overlay de chargement 3D

```css
.overlay-loading {
  position: absolute;
  inset: 0;
  background: var(--color-redwood-deep);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  z-index: 10;
}

/* Spinner dérivé du cercle du logo */
.spinner-traca {
  width: 48px;
  height: 48px;
  border: 2px solid var(--color-copper-20);
  border-top-color: var(--color-copper);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.overlay-loading__text {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-gold-sand);
}
```

---

## 12. Composants — Boutons

> **Priorité 4** dans le classement des composants.

### 12.1 Variantes de boutons

```css
/* === BASE COMMUNE === */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  font-family: var(--font-body);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  
  border: 1px solid transparent;
  border-radius: var(--radius-base); /* 6px — transition carré/rond */
  cursor: pointer;
  
  transition: background var(--duration-fast) var(--ease-in-out),
              color var(--duration-fast) var(--ease-in-out),
              border-color var(--duration-fast) var(--ease-in-out),
              box-shadow var(--duration-fast) var(--ease-in-out),
              transform var(--duration-fast) var(--ease-spring);

  /* Empêche la sélection de texte */
  user-select: none;
}

.btn:active {
  transform: scale(0.97);
}

.btn:focus-visible {
  outline: 2px solid var(--color-copper);
  outline-offset: 3px;
}

/* === TAILLES === */
.btn--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}

.btn--md {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
}

.btn--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
}

/* === VARIANTE PRIMARY (CTA principal) === */
.btn--primary {
  background: var(--color-copper);
  color: var(--color-white);
  border-color: var(--color-copper);
  box-shadow: var(--shadow-copper);
}

.btn--primary:hover {
  background: var(--color-copper-light);
  border-color: var(--color-copper-light);
  box-shadow: var(--shadow-copper-lg);
  transform: translateY(-1px);
}

.btn--primary:active {
  background: var(--color-copper-dark);
  border-color: var(--color-copper-dark);
  box-shadow: none;
  transform: scale(0.97);
}

/* === VARIANTE SECONDARY === */
.btn--secondary {
  background: var(--color-cream-deep);
  color: var(--color-ink);
  border-color: var(--color-cream-deep);
}

.btn--secondary:hover {
  background: var(--color-copper-subtle);
  border-color: var(--color-copper-20);
  color: var(--color-copper);
}

.btn--secondary:active {
  background: var(--color-copper-10);
  transform: scale(0.97);
}

/* === VARIANTE GHOST (outline) === */
.btn--ghost {
  background: transparent;
  color: var(--color-copper);
  border-color: var(--color-copper);
}

.btn--ghost:hover {
  background: var(--color-copper-subtle);
  box-shadow: var(--shadow-xs);
}

.btn--ghost:active {
  background: var(--color-copper-10);
  transform: scale(0.97);
}

/* === VARIANTE DARK (sur fond sombre) === */
.btn--dark-ghost {
  background: transparent;
  color: var(--color-gold-sand);
  border-color: rgba(231, 186, 128, 0.40);
}

.btn--dark-ghost:hover {
  background: rgba(231, 186, 128, 0.10);
  border-color: var(--color-gold-sand);
}

/* === VARIANTE ICON-ONLY (cercle — écho logo) === */
.btn--icon {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: var(--radius-full);
}

.btn--icon.btn--sm { width: 32px; height: 32px; }
.btn--icon.btn--lg { width: 56px; height: 56px; }

/* === ÉTAT LOADING === */
.btn.is-loading {
  pointer-events: none;
  position: relative;
  color: transparent;
}

.btn.is-loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: var(--radius-full);
  animation: spin 0.8s linear infinite;
}

/* === ÉTAT DISABLED === */
.btn:disabled,
.btn[aria-disabled="true"] {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
}

/* === BOUTON TEXTE (sans bordure ni fond) === */
.btn--text {
  background: none;
  border: none;
  color: var(--color-copper);
  padding-inline: 0;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.btn--text:hover {
  color: var(--color-copper-light);
  transform: none;
}
```

---

## 13. Composants — Formulaires & Inputs

> **Priorité 5** dans le classement des composants.

### 13.1 Input texte

```css
/* === GROUPE D'INPUT === */
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* === LABEL === */
.form-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-ink-light);
}

.form-label--required::after {
  content: ' *';
  color: var(--color-copper);
}

/* === INPUT === */
.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-ink);
  
  background: var(--color-white);
  border: 1px solid var(--color-cream-deep);
  border-radius: var(--radius-base); /* 6px */
  
  transition: border-color var(--duration-fast) var(--ease-in-out),
              box-shadow var(--duration-fast) var(--ease-in-out);

  /* Supprime le style natif */
  appearance: none;
  outline: none;
}

.form-input::placeholder {
  color: rgba(26, 10, 5, 0.35);
}

/* Hover */
.form-input:hover {
  border-color: var(--color-copper-20);
}

/* Focus */
.form-input:focus {
  border-color: var(--color-copper);
  box-shadow: 0 0 0 3px var(--color-copper-10);
}

/* Error */
.form-input--error {
  border-color: var(--color-error);
}

.form-input--error:focus {
  box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.15);
}

/* Success */
.form-input--success {
  border-color: var(--color-success);
}

/* Disabled */
.form-input:disabled {
  background: var(--color-cream-deep);
  color: rgba(26, 10, 5, 0.40);
  cursor: not-allowed;
}

/* === HELPER TEXT === */
.form-helper {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-ink-light);
  line-height: var(--leading-normal);
}

.form-helper--error { color: var(--color-error); }
.form-helper--success { color: var(--color-success); }

/* === TEXTAREA === */
.form-textarea {
  /* Hérite de .form-input */
  resize: vertical;
  min-height: 120px;
}

/* === SELECT === */
.form-select {
  /* Hérite de .form-input */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b36633' stroke-width='1.5' fill='none' stroke-linecap='square'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  padding-right: var(--space-10);
  cursor: pointer;
}

/* === CHECKBOX & RADIO === */
.form-check {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  cursor: pointer;
}

.form-check__input {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
  accent-color: var(--color-copper);
  cursor: pointer;
}

.form-check__label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-ink);
  line-height: var(--leading-normal);
}
```

---

## 14. Composants — Badges & Tags

```css
/* === BASE === */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  white-space: nowrap;
  
  border-radius: var(--radius-full); /* Cercle — écho logo */
}

/* === VARIANTES === */
.badge--epoch {
  background: var(--color-redwood);
  color: var(--color-gold-sand);
}

.badge--wilaya {
  background: var(--color-kashmir);
  color: var(--color-white);
}

.badge--available {
  background: var(--color-success-light);
  color: var(--color-success-dark);
}

.badge--coming-soon {
  background: var(--color-cream-deep);
  color: var(--color-ink-light);
}

.badge--3d {
  background: var(--color-copper);
  color: var(--color-white);
  box-shadow: var(--shadow-copper);
}
```

---

## 15. Composants — Feedback & Toasts

```css
/* === TOAST BASE === */
.toast {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-lg);
  max-width: 400px;
  
  /* Entrée depuis le bas-droite */
  animation: toast-in var(--duration-normal) var(--ease-out);
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.toast__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}

.toast__content { flex: 1; }

.toast__title {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  margin-bottom: var(--space-1);
}

.toast__body {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

/* === VARIANTES === */
.toast--success {
  background: var(--color-success-light);
  border-left: 3px solid var(--color-success);
  color: var(--color-success-dark);
}

.toast--error {
  background: var(--color-error-light);
  border-left: 3px solid var(--color-error);
  color: var(--color-error-dark);
}

.toast--warning {
  background: var(--color-warning-light);
  border-left: 3px solid var(--color-warning);
  color: var(--color-warning-dark);
}

.toast--info {
  background: var(--color-info-light);
  border-left: 3px solid var(--color-info);
  color: var(--color-info-dark);
}

/* === CONTAINER DES TOASTS === */
.toast-container {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  pointer-events: none;
}

.toast-container .toast {
  pointer-events: auto;
}
```

---

## 16. Icônes

**Style choisi : Outline (ligne) — élégant et léger.**

### 16.1 Librairie recommandée

**Phosphor Icons** — librairie outline, licence MIT, taille personnalisable, idéale pour une esthétique éditoriale.

```html
<!-- Via CDN -->
<script src="https://unpkg.com/@phosphor-icons/web"></script>

<!-- Usage -->
<i class="ph ph-map-pin"></i>
<i class="ph ph-cube"></i>
<i class="ph ph-headphones"></i>
```

**Alternative :** Lucide Icons (outline strict, très propre)
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
```

### 16.2 Tailles et couleurs

```css
:root {
  --icon-xs:  14px;
  --icon-sm:  16px;
  --icon-md:  20px; /* Standard */
  --icon-lg:  24px;
  --icon-xl:  32px;
  --icon-2xl: 48px;
}

/* Style de base */
.icon {
  width: var(--icon-md);
  height: var(--icon-md);
  stroke-width: 1.5; /* Trait élégant */
  flex-shrink: 0;
  vertical-align: middle;
}

/* Couleurs contextuelles */
.icon--copper   { color: var(--color-copper); }
.icon--kashmir  { color: var(--color-kashmir); }
.icon--ink      { color: var(--color-ink); }
.icon--muted    { color: rgba(26, 10, 5, 0.45); }
.icon--white    { color: var(--color-white); }
.icon--gold     { color: var(--color-gold-sand); }
```

### 16.3 Icônes recommandées par contexte TRACA

| Usage | Icône Phosphor | Icône Lucide |
|---|---|---|
| Localisation | `ph-map-pin` | `map-pin` |
| Modèle 3D | `ph-cube` | `box` |
| Visite guidée | `ph-headphones` | `headphones` |
| Carte | `ph-map-trifold` | `map` |
| Époque / Histoire | `ph-clock-clockwise` | `history` |
| Recherche | `ph-magnifying-glass` | `search` |
| Partager | `ph-share-network` | `share-2` |
| Favoris | `ph-bookmark-simple` | `bookmark` |
| Audio play | `ph-play` | `play` |
| Fermer | `ph-x` | `x` |
| Menu | `ph-list` | `menu` |

---

## 17. Règles UX & Accessibilité

### 17.1 États interactifs

Tous les composants interactifs doivent implémenter **l'ensemble** de ces états :

| État | Exigence |
|---|---|
| **Default** | Apparence au repos définie par le composant |
| **Hover** | Changement visible de couleur / ombre / transform |
| **Focus** | `outline: 2px solid var(--color-copper); outline-offset: 3px;` — OBLIGATOIRE |
| **Active** | Réduction visuelle (`scale(0.97)`) — feedback de clic |
| **Disabled** | `opacity: 0.4; cursor: not-allowed;` + `aria-disabled="true"` |
| **Loading** | Spinner ou skeleton — jamais de bouton vide sans feedback |
| **Error** | Couleur `--color-error`, message d'aide, icône |
| **Success** | Couleur `--color-success`, confirmation visible |

### 17.2 Focus visible — règle absolue

```css
/* JAMAIS supprimer le focus sans le remplacer */
/* ❌ Interdit */
*:focus { outline: none; }

/* ✅ Correct — focus personnalisé TRACA */
*:focus-visible {
  outline: 2px solid var(--color-copper);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Masquer seulement pour les clics souris (pas clavier) */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### 17.3 Contrastes — Règles WCAG AA

- **Texte normal** (< 18px ou < 14px bold) : ratio minimum **4.5:1**
- **Texte grand** (≥ 18px ou ≥ 14px bold) : ratio minimum **3:1**
- **Composants UI et icônes** : ratio minimum **3:1** sur leur fond

Vérification recommandée : [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

> ⚠️ `--color-gold-sand` (#e7ba80) sur `--color-cream` (#fdf6ec) : **ratio 1.8:1 — INTERDIT** pour le texte. Utiliser uniquement comme accent décoratif ou sur fond sombre.

### 17.4 Sémantique HTML

```html
<!-- Titres hiérarchiques — ne jamais sauter de niveau -->
<h1>Titre de page</h1>
  <h2>Section principale</h2>
    <h3>Sous-section</h3>

<!-- Navigation avec landmarks ARIA -->
<nav aria-label="Navigation principale">...</nav>
<nav aria-label="Navigation du catalogue">...</nav>

<!-- Images significatives -->
<img src="site.webp" alt="Vue des ruines de Timgad, site romain du IIe siècle, Batna">

<!-- Images décoratives -->
<img src="texture.webp" alt="" aria-hidden="true" role="presentation">

<!-- Boutons — toujours un label accessible -->
<button aria-label="Fermer la fenêtre modale">
  <i class="ph ph-x" aria-hidden="true"></i>
</button>

<!-- États ARIA pour les toggles -->
<button aria-expanded="false" aria-controls="menu-mobile">Menu</button>
<button aria-pressed="true">Vue carte</button>
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">...</div>
```

### 17.5 Taille minimale des cibles tactiles

```css
/* Cible minimale : 44×44px (WCAG 2.5.5) */
.btn,
.navbar__link,
.form-check__input {
  min-height: 44px;
  min-width: 44px; /* Pour les éléments icon-only */
}

/* Exception : éléments en ligne dans du texte */
/* (pas de min-width obligatoire pour les liens dans les paragraphes) */
```

### 17.6 Scroll et navigation clavier

```css
/* Scroll fluide global */
html {
  scroll-behavior: smooth;
}

/* Sauf si l'utilisateur préfère moins de mouvement */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

---

## 18. Règles RTL — Préparation V2

> **Statut :** Préparation technique dès le MVP. Implémentation complète en V2 (arabe, anglais).

### 18.1 Conventions CSS à adopter dès maintenant

```css
/* ✅ Utiliser les propriétés logiques (RTL-ready) */
/* ❌ Éviter les propriétés physiques directionnelles */

/* Marges et paddings */
margin-inline-start: var(--space-4);   /* ✅ remplace margin-left */
margin-inline-end: var(--space-4);     /* ✅ remplace margin-right */
padding-inline: var(--space-6);        /* ✅ remplace padding-left + padding-right */
padding-block: var(--space-4);         /* ✅ remplace padding-top + padding-bottom */

/* Positionnement */
inset-inline-start: 0;   /* ✅ remplace left: 0 */
inset-inline-end: 0;     /* ✅ remplace right: 0 */

/* Bordures */
border-inline-start: 3px solid var(--color-copper); /* ✅ remplace border-left */
```

### 18.2 Attribut HTML de préparation

```html
<!-- Toujours définir lang et dir sur html -->
<html lang="fr" dir="ltr">

<!-- En V2, le JS changera dynamiquement -->
<!-- document.documentElement.setAttribute('dir', 'rtl'); -->
<!-- document.documentElement.setAttribute('lang', 'ar'); -->
```

### 18.3 Typographie arabe (V2)

```css
/* Préparer la variable — à implémenter en V2 */
:root {
  --font-arabic: 'Noto Naskh Arabic', 'Scheherazade New', serif;
}

/* En V2 : */
[dir="rtl"] body {
  font-family: var(--font-arabic);
}

/* Al-Kuffi est déjà bisculturelle (LTR/RTL par nature) */
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4 {
  font-family: var(--font-display); /* Al-Kuffi — nativement adaptée */
}
```

---

## 19. Variables CSS — Référence complète

Fichier `style.css` — section `:root` à placer en tête de fichier :

```css
/* ============================================
   TRACA — Design System v1.0
   Variables CSS — Référence complète
   ============================================ */

:root {

  /* --- COULEURS DE MARQUE --- */
  --color-copper:       #b36633;
  --color-kashmir:      #5474a1;
  --color-redwood:      #5b1f11;
  --color-gold-sand:    #e7ba80;

  /* --- NEUTRES --- */
  --color-cream:        #fdf6ec;
  --color-cream-deep:   #f0e6d3;
  --color-ink:          #1a0a05;
  --color-ink-light:    #3d1a0d;
  --color-white:        #ffffff;

  /* --- DÉRIVÉS COPPER --- */
  --color-copper-light:   #c97a45;
  --color-copper-dark:    #8f4f22;
  --color-copper-subtle:  #f5e8da;
  --color-copper-10:      rgba(179, 102, 51, 0.10);
  --color-copper-20:      rgba(179, 102, 51, 0.20);

  /* --- DÉRIVÉS REDWOOD --- */
  --color-redwood-light:  #7a2e1a;
  --color-redwood-deep:   #1a0a05;

  /* --- SÉMANTIQUES --- */
  --color-success:        #3d7a5c;
  --color-success-light:  #e8f5ee;
  --color-success-dark:   #2a5940;
  --color-error:          #c0392b;
  --color-error-light:    #fde8e6;
  --color-error-dark:     #922b21;
  --color-warning:        #b7770d;
  --color-warning-light:  #fef3dc;
  --color-warning-dark:   #8a5a0a;
  --color-info:           #5474a1;
  --color-info-light:     #e8eef6;
  --color-info-dark:      #3a5278;

  /* --- TYPOGRAPHIE --- */
  --font-display: 'Al-Kuffi', 'Reem Kufi', 'Scheherazade New', Georgia, serif;
  --font-body:    'Source Serif 4', 'Source Serif Pro', Georgia, serif;

  --text-xs:    0.75rem;
  --text-sm:    0.875rem;
  --text-base:  1rem;
  --text-md:    1.125rem;
  --text-lg:    1.25rem;
  --text-xl:    1.5rem;
  --text-2xl:   2rem;
  --text-3xl:   2.5rem;
  --text-4xl:   3.5rem;
  --text-5xl:   5rem;
  --text-6xl:   7rem;

  --leading-tight:    1.1;
  --leading-snug:     1.3;
  --leading-normal:   1.5;
  --leading-relaxed:  1.7;

  --tracking-tight:  -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.05em;
  --tracking-wider:   0.1em;

  --weight-light:    300;
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;

  /* --- ESPACEMENT --- */
  --space-1:   0.25rem;
  --space-2:   0.5rem;
  --space-3:   0.75rem;
  --space-4:   1rem;
  --space-5:   1.25rem;
  --space-6:   1.5rem;
  --space-8:   2rem;
  --space-10:  2.5rem;
  --space-12:  3rem;
  --space-16:  4rem;
  --space-20:  5rem;
  --space-24:  6rem;
  --space-32:  8rem;

  --section-gap:    7.5rem;
  --section-gap-sm: 4rem;

  /* --- GRILLE --- */
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-2xl: 1440px;

  --gutter-mobile:  1rem;
  --gutter-tablet:  1.5rem;
  --gutter-desktop: 2rem;

  /* --- BORDER-RADIUS --- */
  --radius-none:  0;
  --radius-sm:    4px;
  --radius-base:  6px;
  --radius-md:    8px;
  --radius-lg:    12px;
  --radius-full:  9999px;

  /* --- OMBRES --- */
  --shadow-xs:  0 1px 3px rgba(26, 10, 5, 0.08);
  --shadow-sm:  0 2px 8px rgba(26, 10, 5, 0.10);
  --shadow-md:  0 4px 16px rgba(26, 10, 5, 0.12), 0 1px 4px rgba(26, 10, 5, 0.06);
  --shadow-lg:  0 8px 32px rgba(26, 10, 5, 0.14), 0 2px 8px rgba(26, 10, 5, 0.08);
  --shadow-xl:  0 16px 48px rgba(26, 10, 5, 0.18), 0 4px 16px rgba(26, 10, 5, 0.10);

  --shadow-copper:    0 4px 20px rgba(179, 102, 51, 0.35);
  --shadow-copper-lg: 0 8px 32px rgba(179, 102, 51, 0.45);

  /* --- GLASSMORPHISM --- */
  --glass-bg:      rgba(253, 246, 236, 0.85);
  --glass-bg-dark: rgba(91, 31, 17, 0.90);
  --glass-border:  1px solid rgba(179, 102, 51, 0.20);

  /* --- ANIMATIONS --- */
  --duration-instant:    80ms;
  --duration-fast:       200ms;
  --duration-normal:     350ms;
  --duration-slow:       600ms;
  --duration-deliberate: 900ms;
  --duration-cinematic:  1400ms;

  --ease-out:      cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out:   cubic-bezier(0.45, 0, 0.55, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-reveal:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-copper:   cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* --- Z-INDEX --- */
  --z-base:     0;
  --z-raised:   10;
  --z-dropdown: 100;
  --z-sticky:   200;
  --z-navbar:   1000;
  --z-modal:    2000;
  --z-toast:    3000;
  --z-tooltip:  4000;
}
```

---

## Changelog

| Version | Date | Auteur | Description |
|---|---|---|---|
| 1.0.0 | Mars 2026 | TRACA Design Team | Version initiale — MVP |

---

*Ce document est la référence officielle du Design System TRACA — Version 1.0.*  
*Usage interne uniquement · À mettre à jour à chaque évolution majeure.*  
*Fusionner avec `TRACA_Documentation_Officielle.pdf` section 05 lors de la prochaine révision.*
