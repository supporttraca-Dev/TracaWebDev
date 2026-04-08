# Spécifications - Visite Guidée (Audio & Interactive)

## 1. Description du système
La Visite Guidée TRACA est une fonctionnalité UX premium qui transforme la page d'accueil passive en un documentaire interactif. L'utilisateur déclenche une voix-off qui lit le contenu, tandis que la page scrolle "magiquement" et de façon souple au même rythme que l'audio, plongeant l'utilisateur dans l'histoire sans qu'il ait besoin de toucher la souris.

## 2. Règles strictes à ne jamais violer
1. **Priorité absolue** : Si la visite est lancée, l'écran de splash vidéo (l'Intro vidéo avec le logo TRACA) ne doit **jamais** recouvrir la page, même au rechargement.
2. **Autonomie** : L'audio doit s'arrêter si l'utilisateur quitte la page. 
3. **Interruptibilité** : L'utilisateur peut cesser la visite à tout moment, reprendre la main sur la molette, et l'UI doit instantanément le libérer de l'emprise GSAP.
4. **Single Audio Flow** : On détruit l'instance audio précédente avant d'en créer une nouvelle (évite la superposition de 5 narrateurs).

## 3. Logique de Déclenchement (`tour.js`)
L'activation s'effectue via un bouton (ex: `"Démarrer Visite Guidée"`) dans le Hero `index.html`. Elle déclenche :
- `sessionStorage.setItem('traca_tour_active', 'true')`
- L'injection d'un panneau UI de contrôles en bas d'écran.
- La mise en file d'attente du premier clip audio et du premier point de scroll GSAP.

## 4. Enchaînement des Chapitres (Actes)
L'*objet* JavaScript des chapitres est bâti ainsi :

*   **Acte 1 : Le Hero (Accueil)**
    *   Audio : `intro.mp3`
    *   Scroll Cible : `#hero`
    *   Exécution : Le scroll reste en haut de page. Le narrateur débite l'idée fondamentale du projet.
*   **Acte 2 : Le Manifeste**
    *   Audio : `manifeste.mp3`
    *   Scroll Cible : `#manifeste` (Le bloc citation "Le patrimoine ne disparaît pas...")
    *   Exécution : Durant le téléchargement du clip 2, un défilement `GSAP.scrollTo` lent amène l'écran au milieu de la citation.
*   **Acte 3 : Les Lieux Patrimoniaux**
    *   Audio : `lieux.mp3`
    *   Scroll Cible : Section *Les Lieux* (et parcourt visuellement la grille).
    *   Exécution : Le scroll ralentit considérablement pour balayer la grille de tuiles asymétrie.

## 5. Gestion Audio (Voix / Temps)
- **Synchronisation dynamique** : Chaque mp3 est lié à une durée (en secondes). Le composant demande au plugin `ScrollToPlugin` (GSAP) d'étaler le scroll `Y` très précisément sur la métrique `audio.duration`. S'il faut descendre de 900px, et que l'audio fait 10s, la vitesse est recalculée à la volée.

## 6. L'UI (Principes de Discrétion)
Pendant la visite, l'interface standard perd un peu de son utilité. On injecte un lecteur flottant de luxe :
- **Apparence** : Petite pilule ovale, verre flouté (`backdrop-filter`) ou Noir / Or foncé. Marges en bas de l'écran (`fixed`, `bottom: 40px`, `z-index: 9999`).
- **Fonctions clés** : 
  1. Affichage du texte en cours lu ("Chapitre 1 : Le Manifeste").
  2. Bouton "Sauter au suivant".
  3. Bouton "Quitter" (Crucial).
- L'interface ne **cache jamais** les textes en dur de la page web.

## 7. Fin de visite et Cas d'arrêt
À la fin de la piste `lieux.mp3`, l'action `tour.complete()` est exécutée :
- Destruction de la div UI.
- `sessionStorage.removeItem('traca_tour_active')`.
- Rendu de la page à l'état inerte, libre au défilement standard.

Si le statut est interrompu par "Quitter", `GSAP.killTweensOf(window)` est invoqué instantanément pour stopper le moteur physique de défilement.
