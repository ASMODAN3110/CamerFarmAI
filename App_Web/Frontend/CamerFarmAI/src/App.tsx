import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './Pages/Home';
import Graphique from './Pages/Historique';
import Plantation from './Pages/Plantation';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

// Importez les futures pages ici
// import Inscription from './pages/Inscription';
// import Connexion from './pages/Connexion';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Layout assure l'affichage global (header/footer) sur toutes les pages */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/historique"
              element={
                <ProtectedRoute>
                  <Graphique />
                </ProtectedRoute>
              }
            />

            <Route
              path="/plantation"
              element={
                <ProtectedRoute>
                  <Plantation />
                </ProtectedRoute>
              }
            />

            {/* Routes temporaires à compléter */}
            {/* <Route path="/inscription" element={<Inscription />} /> */}
            {/* <Route path="/connexion" element={<Connexion />} /> */}
            <Route path="/support" element={<div>Page de Support (à construire)</div>} />
            <Route path="/profil" element={<div>Page de Profil (à construire)</div>} />

            <Route path="*" element={<div>404 | Page Non Trouvée</div>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
