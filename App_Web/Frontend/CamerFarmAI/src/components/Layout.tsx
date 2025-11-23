// src/components/Layout.tsx
import React, { useState, useEffect } from 'react';
import { Facebook, Linkedin, Instagram, Youtube, Menu, X } from 'lucide-react';

const COLOR_PRIMARY = '#4CAF50';
const COLOR_SECONDARY = '#388E3C';

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: { width: '100vw', minHeight: '100vh', overflowX: 'hidden', margin: 0, padding: 0, boxSizing: 'border-box' },

  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '12px 20px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    boxSizing: 'border-box',
  },

  logoContainer: { textDecoration: 'none' },
  logoImage: { height: '70px', width: 'auto', transition: 'height 0.3s' },
  logoImageMobile: { height: '55px' },

// Conteneur qui regroupe TOUT à droite avec espacement parfait
desktopRightMenu: {
  display: 'flex',
  alignItems: 'center',
  gap: '48px',                  // espacement régulier entre tous les éléments
  marginRight: '20px',          // un peu de marge à droite pour respirer
},

navLink: {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '600',
  fontSize: '1.1rem',
  transition: 'color 0.3s ease',
  padding: '8px 0',
},

authButton: {
  padding: '10px 22px',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '1rem',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
},

connectButton: {
  backgroundColor: COLOR_SECONDARY,
  color: 'white',
},

signupButton: {
  backgroundColor: COLOR_PRIMARY,
  color: 'white',
},

  // Hamburger visible uniquement en mobile
  hamburger: { background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', color: '#333' },

  mobileMenu: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: '90px 20px 40px',
    zIndex: 999,
    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
    transition: 'transform 0.35s ease-in-out',
    transform: 'translateY(-100%)',
    boxSizing: 'border-box',
  },
  mobileMenuOpen: { transform: 'translateY(0)' },

  mobileNavLinks: { display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '40px' },
  mobileNavLink: { fontSize: '1.5rem', fontWeight: 'bold', color: '#333', textDecoration: 'none' },
  mobileAuthButtons: { display: 'flex', flexDirection: 'column', gap: '16px' },

  main: { paddingTop: '90px', minHeight: '100vh', width: '100%', boxSizing: 'border-box' },

  footer: { backgroundColor: '#333', color: 'white', padding: '50px 20px 30px', width: '100%', boxSizing: 'border-box' },
  footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', maxWidth: '1200px', margin: '0 auto' },
  footerGridTablet: { gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' },
  footerGridMobile: { gridTemplateColumns: '1fr', textAlign: 'center' },
  footerSection: { minWidth: '140px' },
  footerTitle: { fontSize: '1.2rem', marginBottom: '18px', color: COLOR_PRIMARY, fontWeight: 'bold' },
  footerLink: { display: 'block', color: '#ddd', textDecoration: 'none', marginBottom: '10px' },
  socialLinks: { marginTop: '15px', display: 'flex', gap: '20px', justifyContent: 'flex-start' },
  socialLinksCenter: { justifyContent: 'center' },
  socialIconLink: { color: 'white' },
  copyright: { textAlign: 'center', paddingTop: '30px', marginTop: '40px', borderTop: '1px solid #555', fontSize: '0.9rem', color: '#aaa' },
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Correction critique : on met à jour l'état au montage + à chaque resize
  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
    };

    updateSize(); // au premier rendu
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div style={styles.appContainer}>
      {/* HEADER */}
      <header style={styles.header}>
        <a href="/" style={styles.logoContainer}>
          <img
            src="/images/camerfarmai_logo.svg"
            alt="CamerFarm AI Logo"
            style={isMobile ? { ...styles.logoImage, ...styles.logoImageMobile } : styles.logoImage}
          />
        </a>

        {/* VERSION DESKTOP */}
        {/* VERSION DESKTOP : tout aligné à droite avec espacement régulier */}
{!isMobile && (
  <div style={styles.desktopRightMenu}>
    <a href="/" style={styles.navLink}>Accueil</a>
    <a href="/support" style={styles.navLink}>Support</a>
    <a href="/connexion" style={{ ...styles.authButton, ...styles.connectButton }}>Se Connecter</a>
    <a href="/inscription" style={{ ...styles.authButton, ...styles.signupButton }}>S'inscrire</a>
  </div>
)}

        {/* VERSION MOBILE : seulement le hamburger */}
        {isMobile && (
          <button style={styles.hamburger} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        )}
      </header>

      {/* MENU MOBILE */}
      {isMobile && (
        <div style={{ ...styles.mobileMenu, ...(mobileMenuOpen ? styles.mobileMenuOpen : {}) }}>
          <nav style={styles.mobileNavLinks}>
            <a href="/" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Accueil</a>
            <a href="/support" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Support</a>
          </nav>
          <div style={styles.mobileAuthButtons}>
            <a
              href="/connexion"
              style={{ ...styles.authButton, ...styles.connectButton, padding: '16px', textAlign: 'center' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Se Connecter
            </a>
            <a
              href="/inscription"
              style={{ ...styles.authButton, ...styles.signupButton, padding: '16px', textAlign: 'center' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              S'inscrire
            </a>
          </div>
        </div>
      )}

      <main style={styles.main}>{children}</main>

      {/* FOOTER (inchangé, juste responsive) */}
      <footer style={styles.footer}>
        <div style={{
          ...styles.footerGrid,
          ...(isMobile && window.innerWidth <= 900 ? styles.footerGridTablet : {}),
          ...(window.innerWidth <= 600 ? styles.footerGridMobile : {}),
        }}>
          <div style={styles.footerSection}>
            <div style={styles.footerTitle}>CamerFarm AI</div>
            <p>La plateforme intelligente pour une agriculture camerounaise moderne et durable.</p>
          </div>
          <div style={styles.footerSection}>
            <div style={styles.footerTitle}>Ressources</div>
            <a href="/documentation" style={styles.footerLink}>Documentation</a>
            <a href="/utilisation" style={styles.footerLink}>Guide d'utilisation</a>
            <a href="/support" style={styles.footerLink}>Support</a>
          </div>
          <div style={styles.footerSection}>
            <div style={styles.footerTitle}>Légal</div>
            <a href="/confidentialite" style={styles.footerLink}>Confidentialité</a>
            <a href="/conditions" style={styles.footerLink}>Conditions</a>
            <a href="/cookies" style={styles.footerLink}>Cookies</a>
          </div>
          <div style={styles.footerSection}>
            <div style={styles.footerTitle}>Suivez Nous</div>
            <div style={{ ...styles.socialLinks, ...(window.innerWidth <= 600 ? styles.socialLinksCenter : {}) }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialIconLink}><Facebook size={26} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialIconLink}><Linkedin size={26} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIconLink}><Instagram size={26} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={styles.socialIconLink}><Youtube size={26} /></a>
            </div>
          </div>
        </div>
        <div style={styles.copyright}>© 2025 CamerFarm AI. Tous Droits Réservés.</div>
      </footer>
    </div>
  );
};

export default Layout;