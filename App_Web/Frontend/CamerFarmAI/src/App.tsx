// src/App.tsx

import React from 'react';
// 1. Importations nécessaires pour le routage
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Importation des composants que nous avons développés
import Layout from './components/Layout'; 
import Home from './Pages/Home';
import Graphique from './Pages/Historique';
import Plantation from './Pages/Plantation';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext'; 

// Importez les futures pages ici
// import Inscription from './pages/Inscription'; 
// import Connexion from './pages/Connexion'; 

// Suppression du useState, des logos et du compteur par défaut de Vite.
function App() {

  return (
    // BrowserRouter permet d'activer le routage basé sur les URL du navigateur
    <BrowserRouter>
      <AuthProvider>
        {/* Le composant Layout enveloppe TOUTES les routes. 
          Cela garantit que le Header et le Footer s'affichent sur toutes les pages. 
        */}
        <Layout>
          {/* Routes définit l'ensemble des chemins possibles dans l'application */}
          <Routes>
            
            {/* Route principale : Mappe l'URL de base ("/") au composant Home.
              Ceci "appelle" enfin votre fichier Home.tsx.
            */}
            <Route 
              path="/" 
              element={<Home />} 
            />
            
            {/* Route graphique - temporairement accessible à tous (protection à ajouter plus tard) */}
            <Route 
              path="/historique" 
              element={<Graphique />} 
            />
            
            {/* Route Plantation */}
            <Route 
              path="/plantation" 
              element={<Plantation />} 
            />
            
            {/* Exemple d'autres routes futures basées sur le Layout.tsx :
            */}
            {/* <Route path="/inscription" element={<Inscription />} /> */}
            {/* <Route path="/connexion" element={<Connexion />} /> */}
            <Route path="/support" element={<div>Page de Support (à construire)</div>} />
            <Route path="/profil" element={<div>Page de Profil (à construire)</div>} />

            {/* Optionnel: Gérer les 404 si aucune route ne correspond */}
            <Route path="*" element={<div>404 | Page Non Trouvée</div>} />

          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;