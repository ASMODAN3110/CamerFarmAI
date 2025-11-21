# CamerFarmAI - Frontend

Application web frontend pour CamerFarmAI, construite avec React, TypeScript et Vite.

## 📁 Structure du Projet

```
CamerFarmAI/
│
├── public/                 # Fichiers statiques publics
│   └── vite.svg           # Logo Vite
│
├── src/                    # Code source principal
│   ├── api/               # Services et appels API
│   │                       # (Configuration des endpoints, requêtes HTTP)
│   │
│   ├── assets/            # Ressources statiques (images, icônes, etc.)
│   │   └── react.svg      # Logo React
│   │
│   ├── components/        # Composants React réutilisables
│   │                       # (Boutons, formulaires, modales, etc.)
│   │
│   ├── hooks/             # Hooks React personnalisés
│   │                       # (Logique réutilisable, état partagé)
│   │
│   ├── pages/             # Pages/Views de l'application
│   │                       # (Composants de page principaux)
│   │
│   ├── stores/            # Gestion d'état (State Management)
│   │                       # (Zustand, Redux, Context API, etc.)
│   │
│   ├── types/             # Définitions TypeScript
│   │                       # (Interfaces, types, enums)
│   │
│   ├── App.tsx            # Composant racine de l'application
│   ├── App.css            # Styles du composant App
│   ├── main.tsx           # Point d'entrée de l'application
│   └── index.css          # Styles globaux
│
├── node_modules/          # Dépendances npm (généré automatiquement)
│
├── eslint.config.js       # Configuration ESLint
├── index.html             # Template HTML principal
├── package.json           # Dépendances et scripts npm
├── package-lock.json      # Verrouillage des versions des dépendances
├── tsconfig.json          # Configuration TypeScript principale
├── tsconfig.app.json      # Configuration TypeScript pour l'application
├── tsconfig.node.json     # Configuration TypeScript pour Node.js
└── vite.config.ts         # Configuration Vite

```

## 📂 Description des Dossiers

### `/src/api`
Contient tous les services et fonctions liés aux appels API. C'est ici que vous définirez vos clients HTTP (axios, fetch, etc.) et vos endpoints.

### `/src/assets`
Ressources statiques telles que les images, icônes, polices, etc. qui sont importées directement dans les composants.

### `/src/components`
Composants React réutilisables à travers l'application. Organisez-les par fonctionnalité ou par type (ex: `Button`, `Form`, `Modal`, etc.).

### `/src/hooks`
Hooks React personnalisés pour encapsuler la logique réutilisable. Exemples: `useAuth`, `useApi`, `useLocalStorage`, etc.

### `/src/pages`
Composants de page principaux de l'application. Chaque fichier représente généralement une route de l'application.

### `/src/stores`
Gestion d'état globale de l'application. Peut utiliser Zustand, Redux, Context API ou toute autre solution de state management.

### `/src/types`
Définitions TypeScript pour les types, interfaces et enums utilisés dans toute l'application. Aide à maintenir la cohérence des types.

## 🛠️ Technologies

- **React 19.2.0** - Bibliothèque UI
- **TypeScript 5.9.3** - Typage statique
- **Vite 7.2.2** - Build tool et dev server
- **ESLint** - Linter pour la qualité du code
- **React Compiler** - Optimisation automatique des composants React

## 🚀 Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser le build de production
npm run preview

# Linter le code
npm run lint
```

## 📝 Notes

- Le projet utilise le React Compiler pour optimiser automatiquement les composants React
- La configuration TypeScript est séparée en trois fichiers pour une meilleure organisation
- ESLint est configuré pour maintenir la qualité et la cohérence du code
