# Documentation : Ajouter des lieux à la Carte Interactive

Pour ajouter un nouveau site historique ou culturel à la carte interactive de TRACA, suivez ces étapes.

## 1. Localiser le fichier de données
Toutes les données de la carte sont stockées dans :
`public/data/algeria-lieux.geojson`

## 2. Format des données
Chaque lieu est une "Feature" dans la collection GeoJSON. Copiez et adaptez le modèle suivant :

```json
{
  "type": "Feature",
  "properties": {
    "id": "nom-du-lieu-slug",
    "name": "Nom Complet du Lieu",
    "wilaya": "Nom de la Wilaya (ex: Tipaza)",
    "type": "categorie",
    "era": "époque",
    "description": "Brève description muséale (max 150 caractères).",
    "url": "/lien-vers-page-dediee.html"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  }
}
```

## 3. Options de filtrage
Pour que les filtres fonctionnent correctement, utilisez les valeurs suivantes :

| Propriété | Valeurs recommandées |
| :--- | :--- |
| **type** | `funeraire`, `militaire`, `religieux`, `naturel`, `urbains`, `antique` |
| **era** | `prehistorique`, `antique`, `medievale`, `moderne` |
| **wilaya** | Le nom exact de l'une des 58 wilayas (ex: `Alger`, `Batna`) |

## 4. Vérification
Une fois le fichier sauvegardé, la carte se mettra à jour automatiquement au prochain rechargement.
- Vérifiez que le point apparaît au bon endroit.
- Testez le filtrage dans la barre latérale pour confirmer que le lieu est bien indexé.
