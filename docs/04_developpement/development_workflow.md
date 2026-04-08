# Règles de Développement & Workflow

## Principes de Code
TRACA privilégie le **"Vanilla JavaScript"** (JS pur sans framework lourd) pour assurer la pérennité du projet.

1. **Modularité** : Chaque fonctionnalité majeure (Carte, Tour, UI) doit être dans son propre fichier dans `/js`.
2. **Nommage** : Utilisation du `camelCase` pour les variables/fonctions et `PascalCase` pour les classes.
3. **Commentaires** : Chaque fonction exportée doit avoir un bloc de commentaire expliquant son rôle, ses paramètres et son retour.
4. **Sémantique** : Le HTML doit utiliser des balises sémantiques (`<article>`, `<section>`, `<nav>`) pour le SEO et l'accessibilité.

## Workflow de Développement
1. **Branchement** : Toute nouvelle feature doit être développée sur une branche `feature/nom-de-la-feature`.
2. **Revue de Code** : Un "Peer Review" est nécessaire avant chaque fusion sur `main`.
3. **Tests** : Tester systématiquement sur Chrome et Safari (iOS) avant de pusher.

---

# Conventions de Code (Style Guide)

### HTML
- Indentation de 2 espaces.
- Attributs `id` uniques pour les ancres de navigation.
- Utilisation de `data-attributes` pour le passage de données au JS (ex: `data-src` pour les iFrames).

### CSS
- Utilisation systématique des variables `:root` pour les couleurs et espacements.
- Unité `rem` privilégiée pour les tailles de police.
- Mobile First obligatoire : `@media (max-width: 768px)` par défaut pour les ajustements.

### JavaScript
- Use `const` et `let`, jamais `var`.
- Utilisation de l'API `IntersectionObserver` pour les animations d'entrée.
- Gestion d'erreurs `try/catch` impérative sur tous les `fetch()`.

---

# Processus de Déploiement

Le déploiement est automatisé via **Netlify** :
1. Pousser le code sur le repo Git.
2. Netlify détecte le changement.
3. Commande de build : `npm run build`.
4. Publication du dossier `/dist`.

**Lien de production permanent** : [https://tracaa.netlify.app/](https://tracaa.netlify.app/)
