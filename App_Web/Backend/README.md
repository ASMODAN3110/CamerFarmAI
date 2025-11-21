# Backend - Structure du Projet

## Vue d'ensemble

Ce projet est une application backend Node.js/Express qui suit une architecture modulaire et organisée.

## Structure des dossiers

```
Backend/
├── node_modules/          # Dépendances npm installées
├── package.json           # Configuration npm et dépendances
├── package-lock.json      # Verrouillage des versions des dépendances
├── README.md              # Documentation du projet
└── src/                   # Code source de l'application
    ├── config/            # Fichiers de configuration (base de données, variables d'environnement, etc.)
    ├── controllers/       # Contrôleurs - Logique métier et gestion des requêtes HTTP
    ├── middleware/        # Middlewares Express (authentification, validation, logging, etc.)
    ├── migrations/        # Scripts de migration de base de données
    ├── models/            # Modèles de données (schémas, entités)
    ├── routes/            # Définition des routes API
    └── services/          # Services métier et logique applicative réutilisable
```

## Description des dossiers

### `/src/config`
Contient les fichiers de configuration de l'application :
- Configuration de la base de données
- Variables d'environnement
- Paramètres de l'application
- Configuration des services externes

### `/src/controllers`
Contient les contrôleurs qui gèrent la logique métier et les interactions avec les requêtes HTTP :
- Traitement des requêtes entrantes
- Validation des données
- Appel aux services appropriés
- Retour des réponses HTTP

### `/src/middleware`
Contient les middlewares Express personnalisés :
- Authentification et autorisation
- Validation des données
- Gestion des erreurs
- Logging et monitoring
- Parsing des requêtes

### `/src/migrations`
Contient les scripts de migration de base de données :
- Création et modification des schémas
- Gestion des versions de la base de données
- Scripts de seed (données initiales)

### `/src/models`
Contient les modèles de données :
- Définition des schémas
- Relations entre entités
- Validations au niveau modèle
- Méthodes de requête personnalisées

### `/src/routes`
Contient la définition des routes de l'API :
- Définition des endpoints
- Association routes/contrôleurs
- Middlewares spécifiques aux routes
- Versioning de l'API

### `/src/services`
Contient la logique métier réutilisable :
- Services métier indépendants
- Intégration avec des APIs externes
- Traitement de données complexes
- Logique applicative partagée

## Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express** - Framework web pour Node.js
- **Body-parser** - Middleware pour parser les corps de requêtes
- **CORS** - Gestion des Cross-Origin Resource Sharing
- **dotenv** - Gestion des variables d'environnement
- **Helmet** - Sécurisation des en-têtes HTTP
- **Nodemon** - Outil de développement pour redémarrer automatiquement le serveur

## Installation

```bash
npm install
```

## Scripts disponibles

```bash
npm test          # Exécuter les tests (à configurer)
```

## Architecture

Cette structure suit le pattern **MVC (Model-View-Controller)** adapté pour une API REST :
- **Models** : Représentation des données
- **Controllers** : Gestion des requêtes et réponses
- **Routes** : Définition des endpoints
- **Services** : Logique métier réutilisable
- **Middleware** : Traitement transversal des requêtes

## Notes

- Le point d'entrée de l'application est défini dans `package.json` comme `index.js` (à créer à la racine ou dans `/src`)
- Les variables d'environnement doivent être configurées dans un fichier `.env` à la racine du projet
- La structure est prête pour l'ajout de fonctionnalités supplémentaires

