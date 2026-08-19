# eVolt  Plateforme e-commerce de vélos & motos électriques haut de gamme

Boutique en ligne construite avec **Next.js 14 (App Router)**, **Tailwind CSS** et **Zustand**.

## Fonctionnalités

- **Internationalisation (i18n)** : français (`/fr`) et anglais (`/en`), redirection automatique depuis la racine selon la langue du navigateur, sélecteur de langue dans l'en-tête.
- **Catalogue** (`/[locale]/catalogue`) : grille de produits avec panneau latéral de filtres fonctionnels (type de véhicule, prix maximum, autonomie minimale) et tri, alimentée par l'API.
- **Page produit** (`/[locale]/product/[id]`) : galerie d'images, caractéristiques techniques (moteur, batterie, autonomie, vitesse max, poids, temps de charge), sélection de quantité et ajout au panier.
- **Panier** (`/[locale]/cart`) : persistant via Zustand + `localStorage`, modification des quantités, calcul automatique des totaux (sous-total, livraison, TVA).
- **Checkout** (`/[locale]/checkout`) : formulaire de commande complet avec validation, paiement simulé et confirmation de commande.
- **API simulée** :
  - `GET /api/products`  catalogue avec filtres (`type`, `maxPrice`, `minRange`, `sort`)
  - `GET /api/products/[id]`  détail d'un produit
  - `POST /api/orders`  création d'une commande (validation du stock et des champs, calcul des totaux)
  - `GET /api/orders`  liste des commandes (en mémoire)

## Modèles de données

Définis dans `src/lib/types.ts` :

- `Product` : nom, description, prix, image_url, autonomie_km, vitesse_max, stock (+ type, moteur, batterie, poids, temps de charge, traductions anglaises)
- `Order` / `OrderItem` : suivi des achats avec client, totaux et statut

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) (redirige vers `/fr` ou `/en`).

## Scripts

- `npm run dev`  serveur de développement
- `npm run build`  build de production
- `npm run start`  serveur de production
- `npm run lint`  ESLint
