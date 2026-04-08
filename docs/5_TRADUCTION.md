# Gestion Linguistique, Traduction et Sens de Lecture (TRACA)

*Document repère pour l'industrialisation future du projet si des budgets de traduction sont alloués.*

## 1. Modèle de Mapping (JSON Key/Value)
Si la plateforme passe en Multi-langues (ex: JSON File Database ou i18n CMS), les identifiants textuels devront être mappés ainsi, en protégeant les variables HTML ou les balises imbriquées `<em>` ou `<span>` de la destruction.

```json
{
  "fr": {
    "manifest_quote": "Le patrimoine ne disparaît pas<br>lorsqu'il est <em>oublié</em>.<br>Il disparaît lorsqu'il n'est<br>plus <em>transmis</em>.",
    "btn_explore": "Explorer les lieux <span class=\"arrow\">→</span>"
  },
  "en": {
    "manifest_quote": "Heritage does not disappear<br>when it is <em>forgotten</em>.<br>It disappears when it is no longer<br><em>passed on</em>.",
    "btn_explore": "Explore places <span class=\"arrow\">→</span>"
  }
}
```

## 2. Textes Indéboulonnables (Non-Traduisibles)
La plateforme utilise des termes d'identité de marque ou natifs qui ne doivent subir **aucune** modification d'une langue à l'autre :
- Titre global : **TRACA**
- Chiffres purs sans syntaxe : **58**, **3D**
- Sigles sociaux ou d'extension de nom de domaine.

## 3. Paramètres RTL (Right-to-Left) pour la langue Arabe
Afin d'incorporer l'Arabe (ع) dans le design orienté "Premium Muséal", le comportement HTML complet doit basculer. Une simple traduction de mot par mot n'a aucune validité structurelle.

- **Attribut HTML Cœur** : L'injection de la langue impliquera le passage complet du document avec les balises de balisage naturel : `<html lang="ar" dir="rtl">`.
- **Alignements** : Tout texte aligné à gauche (`text-align: left`) bascule en Arabe : il sera aligné systématiquement sur le profil de fuite droite, au comportement inverse pour la symétrie.
- **Flexbox / Grid** : Si l'attribut CSS direction RTL est utilisé, les grilles de lieux (Aperçus de la page d'accueil) flusheront à l'extrême droite.
- **Typographie Arabe** : Il est strictement interdit d'utiliser *Cormorant Garamond* (qui ne possède pas de glyphes arabes élégants) ou *Inter* global pour la langue sémite. Soit on instancie une classe `.lang-ar` qui charge **Cairo** (Moderne) soit **Noto Kufi Arabic** (Premium, rectiligne, proche des anciennes calligraphies Kufiques) depuis un dépôt Google Fonts.
- **Boutons Flèches (Arrows)** : Dans les boutons `btn-primary`, la flèche (`→`) devra être inversée avec un `transform: rotate(180deg)` avec le label et la flèche alignés à droite.

## 4. Stratégie Audiovisuelle
Si TRACA possède une traduction :
- La vidéo Intro ne nécessitera aucun changement majeur, elle affiche uniquement le mot "TRACA".
- Les fichiers Audios de narration nécessiteront une refonte des instances dans `tour.js` ou dans la balise audio locale de `lieux/archeologique.html` avec la location en Arabe classique (`/audio/visite_ar.mp3`). La synchronisation temporelle (durée MP3) devant être recartographiée dynamiquement, aucune métrique de temps de son ne doit être rentrée en dur.
