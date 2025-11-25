# CamerFarmAI - Frontend

Application web frontend pour CamerFarmAI, construite avec React, TypeScript et Vite. Plateforme intelligente pour une agriculture camerounaise moderne et durable.

## 📁 Structure du Projet

```
CamerFarmAI/
│
├── public/                 # Fichiers statiques publics
│   └── images/            # Images et logos
│       ├── camerfarmai_logo.svg
│       ├── Hero1.svg
│       ├── Hero2.svg
│       ├── Hero3.svg
│       ├── Hero4.svg
│       └── Hero5.svg
│
├── src/                    # Code source principal
│   ├── assets/            # Ressources statiques (images, icônes, etc.)
│   │   ├── logo.ico
│   │   ├── logo.jpg
│   │   ├── logo.svg
│   │   └── react.svg
│   │
│   ├── components/        # Composants React réutilisables
│   │   ├── FloatingAIButton.tsx    # Bouton flottant d'assistant IA
│   │   ├── Layout.tsx              # Layout principal avec header et footer
│   │   └── ProtectedRoute.tsx      # Route protégée pour l'authentification
│   │
│   ├── contexts/          # Contextes React
│   │   └── AuthContext.tsx         # Contexte d'authentification
│   │
│   ├── Pages/             # Pages/Views de l'application
│   │   ├── Home.tsx                # Page d'accueil
│   │   ├── Historique.tsx           # Page de graphiques et historique
│   │   └── Plantation.tsx           # Page de gestion des plantations
│   │
│   ├── App.tsx            # Composant racine de l'application
│   ├── App.css            # Styles du composant App
│   ├── main.tsx           # Point d'entrée de l'application
│   ├── index.css          # Styles globaux
│   └── types.d.ts         # Définitions TypeScript globales
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

### `/src/components`
Composants React réutilisables à travers l'application :
- **Layout.tsx** : Composant de layout principal avec header (navigation responsive), footer, et gestion des menus mobile/desktop
- **FloatingAIButton.tsx** : Bouton flottant pour l'assistant IA
- **ProtectedRoute.tsx** : Composant pour protéger les routes nécessitant une authentification

### `/src/contexts`
Contextes React pour la gestion d'état globale :
- **AuthContext.tsx** : Gestion de l'authentification utilisateur (tokens, état de connexion)

### `/src/Pages`
Composants de page principaux de l'application :
- **Home.tsx** : Page d'accueil avec hero section, fonctionnalités principales et call-to-action
- **Historique.tsx** : Page de visualisation des données de capteurs avec graphiques interactifs
- **Plantation.tsx** : Page de gestion des plantations avec création et liste des plantations

### `/public/images`
Images statiques utilisées dans l'application (logos, images hero, etc.)

## 🛠️ Technologies

- **React 19.2.0** - Bibliothèque UI
- **TypeScript 5.9.3** - Typage statique
- **Vite 7.2.2** - Build tool et dev server
- **React Router DOM 7.9.6** - Routage et navigation
- **Lucide React 0.554.0** - Bibliothèque d'icônes
- **ESLint** - Linter pour la qualité du code
- **React Compiler** - Optimisation automatique des composants React

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install
```

### Scripts Disponibles

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

## 📱 Fonctionnalités

### Pages Disponibles

- **Accueil** (`/`) : Page d'accueil avec présentation de la plateforme
- **Graphique** (`/historique`) : Visualisation des données de capteurs avec graphiques interactifs
- **Plantation** (`/plantation`) : Gestion des plantations (création, liste)
- **Support** (`/support`) : Page de support (à construire)
- **Profil** (`/profil`) : Page de profil utilisateur (à construire)

### Fonctionnalités Principales

- ✅ Navigation responsive (desktop et mobile)
- ✅ Authentification avec gestion de tokens
- ✅ Routes protégées
- ✅ Menu de notifications
- ✅ Menu profil avec déconnexion
- ✅ Gestion des plantations (CRUD)
- ✅ Visualisation de données avec graphiques
- ✅ Interface multilingue (prévue)

## 🎨 Styles et Design

- Police principale : Arial, sans-serif
- Couleurs principales :
  - Primaire : `#4CAF50` (vert)
  - Secondaire : `#388E3C` (vert foncé)
- Design responsive avec breakpoints pour mobile/tablet/desktop

## 📝 Notes

- Le projet utilise le React Compiler pour optimiser automatiquement les composants React
- La configuration TypeScript est séparée en trois fichiers pour une meilleure organisation
- ESLint est configuré pour maintenir la qualité et la cohérence du code
- L'authentification utilise localStorage pour les tokens d'accès et les cookies pour les refresh tokens

## 🔒 Sécurité

- Les routes protégées nécessitent une authentification
- Gestion sécurisée des tokens (localStorage et cookies)
- Protection contre les accès non autorisés

## 📄 Licence

Ce projet est privé et réservé à un usage interne.
