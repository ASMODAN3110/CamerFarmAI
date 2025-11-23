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
  desktopRightMenu: { display: 'flex', alignItems: 'center', gap: '48px', marginRight: '20px' },

  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '600',
    fontSize: '1.1rem',
    padding: '8px 0',
    transition: 'color 0.3s ease',
  },
  // Style pour le lien ACTIF
  navLinkActive: {
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
  },

  authButton: {
    padding: '10px 22px',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'all 0.35s ease',
  },
  connectButton: { backgroundColor: COLOR_SECONDARY, color: 'white' },
  signupButton: { backgroundColor: COLOR_PRIMARY, color: 'white' },

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
  mobileNavLink: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  mobileNavLinkActive: {
    color: COLOR_PRIMARY,
    fontWeight: 'bold',
  },

  mobileAuthButtons: { display: 'flex', flexDirection: 'column', gap: '16px' },
  main: { paddingTop: '90px', minHeight: '100vh', width: '100%', boxSizing: 'border-box' },

  footer: { backgroundColor: '#333', color: 'white', padding: '50px 20px 30px', width: '100%', boxSizing: 'border-box' },
  footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', maxWidth: '1200px', margin: '0 auto' },
  footerGridTablet: { gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' },
  footerGridMobile: { gridTemplateColumns: '1fr', textAlign: 'center' },
  footerSection: { minWidth: '140px' },
  footerTitle: { fontSize: '1.2rem', marginBottom: '18px', color: COLOR_PRIMARY, fontWeight: 'bold' },
  footerLink: { display: 'block', color: '#ddd', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.3s ease' },
  socialLinks: { marginTop: '15px', display: 'flex', gap: '20px', justifyContent: 'flex-start' },
  socialLinksCenter: { justifyContent: 'center' },
  socialIconLink: { color: 'white', transition: 'color 0.3s ease' },
  copyright: { textAlign: 'center', paddingTop: '30px', marginTop: '40px', borderTop: '1px solid #555', fontSize: '0.9rem', color: '#aaa' },
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredAuth, setHoveredAuth] = useState<string | null>(null);
  const [hoveredFooterLink, setHoveredFooterLink] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Détection mobile
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth <= 900);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Détection de la page actuelle (sans react-router-dom)
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const isActive = (path: string) => currentPath === path;

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

        {/* DESKTOP */}
        {!isMobile && (
          <div style={styles.desktopRightMenu}>
            <a
              href="/"
              style={{
                ...styles.navLink,
                ...(isActive('/') ? styles.navLinkActive : {}),
                color: isActive('/') ? COLOR_PRIMARY : hoveredNav === 'accueil' ? COLOR_PRIMARY : '#333',
              }}
              onMouseEnter={() => setHoveredNav('accueil')}
              onMouseLeave={() => setHoveredNav(null)}
            >
              Accueil
            </a>
            <a
              href="/support"
              style={{
                ...styles.navLink,
                ...(isActive('/support') ? styles.navLinkActive : {}),
                color: isActive('/support') ? COLOR_PRIMARY : hoveredNav === 'support' ? COLOR_PRIMARY : '#333',
              }}
              onMouseEnter={() => setHoveredNav('support')}
              onMouseLeave={() => setHoveredNav(null)}
            >
              Support
            </a>
            <a
              href="/connexion"
              style={{
                ...styles.authButton,
                ...styles.connectButton,
                backgroundColor: hoveredAuth === 'connect' ? '#2E7D32' : COLOR_SECONDARY,
                transform: hoveredAuth === 'connect' ? 'translateY(-2px)' : 'none',
                boxShadow: hoveredAuth === 'connect' ? '0 6px 16px rgba(0,0,0,0.25)' : 'none',
              }}
              onMouseEnter={() => setHoveredAuth('connect')}
              onMouseLeave={() => setHoveredAuth(null)}
            >
              Se Connecter
            </a>
            <a
              href="/inscription"
              style={{
                ...styles.authButton,
                ...styles.signupButton,
                backgroundColor: hoveredAuth === 'signup' ? '#43A047' : COLOR_PRIMARY,
                transform: hoveredAuth === 'signup' ? 'translateY(-2px)' : 'none',
                boxShadow: hoveredAuth === 'signup' ? '0 6px 16px rgba(0,0,0,0.25)' : 'none',
              }}
              onMouseEnter={() => setHoveredAuth('signup')}
              onMouseLeave={() => setHoveredAuth(null)}
            >
              S'inscrire
            </a>
          </div>
        )}

        {/* MOBILE */}
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
            <a
              href="/"
              style={{
                ...styles.mobileNavLink,
                ...(isActive('/') ? styles.mobileNavLinkActive : {}),
                color: isActive('/') ? COLOR_PRIMARY : hoveredNav === 'accueil-mobile' ? COLOR_PRIMARY : '#333',
              }}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredNav('accueil-mobile')}
              onMouseLeave={() => setHoveredNav(null)}
            >
              Accueil
            </a>
            <a
              href="/support"
              style={{
                ...styles.mobileNavLink,
                ...(isActive('/support') ? styles.mobileNavLinkActive : {}),
                color: isActive('/support') ? COLOR_PRIMARY : hoveredNav === 'support-mobile' ? COLOR_PRIMARY : '#333',
              }}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredNav('support-mobile')}
              onMouseLeave={() => setHoveredNav(null)}
            >
              Support
            </a>
          </nav>
          <div style={styles.mobileAuthButtons}>
            <a
              href="/connexion"
              style={{
                ...styles.authButton,
                ...styles.connectButton,
                padding: '16px',
                textAlign: 'center',
                backgroundColor: hoveredAuth === 'connect-mobile' ? '#2E7D32' : COLOR_SECONDARY,
              }}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredAuth('connect-mobile')}
              onMouseLeave={() => setHoveredAuth(null)}
            >
              Se Connecter
            </a>
            <a
              href="/inscription"
              style={{
                ...styles.authButton,
                ...styles.signupButton,
                padding: '16px',
                textAlign: 'center',
                backgroundColor: hoveredAuth === 'signup-mobile' ? '#43A047' : COLOR_PRIMARY,
              }}
              onClick={() => setMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredAuth('signup-mobile')}
              onMouseLeave={() => setHoveredAuth(null)}
            >
              S'inscrire
            </a>
          </div>
        </div>
      )}

      <main style={styles.main}>{children}</main>

      {/* FOOTER - inchangé */}
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
            <a href="/documentation" style={{ ...styles.footerLink, color: hoveredFooterLink === 'doc' ? COLOR_PRIMARY : '#ddd' }} onMouseEnter={() => setHoveredFooterLink('doc')} onMouseLeave={() => setHoveredFooterLink(null)}>Documentation</a>
            <a href="/utilisation" style={{ ...styles.footerLink, color: hoveredFooterLink === 'guide' ? COLOR_PRIMARY : '#ddd' }} onMouseEnter={() => setHoveredFooterLink('guide')} onMouseLeave={() => setHoveredFooterLink(null)}>Guide d'utilisation</a>
            <a href="/support" style={{ ...styles.footerLink, color: hoveredFooterLink === 'support' ? COLOR_PRIMARY : '#ddd' }} onMouseEnter={() => setHoveredFooterLink('support')} onMouseLeave={() => setHoveredFooterLink(null)}>Support</a>
          </div>
          <div style={styles.footerSection}>
            <div style={styles.footerTitle}>Légal</div>
            <a href="/confidentialite" style={{ ...styles.footerLink, color: hoveredFooterLink === 'privacy' ? COLOR_PRIMARY : '#ddd' }} onMouseEnter={() => setHoveredFooterLink('privacy')} onMouseLeave={() => setHoveredFooterLink(null)}>Confidentialité</a>
            <a href="/conditions" style={{ ...styles.footerLink, color: hoveredFooterLink === 'terms' ? COLOR_PRIMARY : '#ddd' }} onMouseEnter={() => setHoveredFooterLink('terms')} onMouseLeave={() => setHoveredFooterLink(null)}>Conditions</a>
            <a href="/cookies" style={{ ...styles.footerLink, color: hoveredFooterLink === 'cookies' ? COLOR_PRIMARY : '#ddd' }} onMouseEnter={() => setHoveredFooterLink('cookies')} onMouseLeave={() => setHoveredFooterLink(null)}>Cookies</a>
          </div>
          <div style={styles.footerSection}>
            <div style={styles.footerTitle}>Suivez Nous</div>
            <div style={{ ...styles.socialLinks, ...(window.innerWidth <= 600 ? styles.socialLinksCenter : {}) }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ ...styles.socialIconLink, color: hoveredSocial === 'fb' ? COLOR_PRIMARY : 'white' }} onMouseEnter={() => setHoveredSocial('fb')} onMouseLeave={() => setHoveredSocial(null)}><Facebook size={26} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ ...styles.socialIconLink, color: hoveredSocial === 'in' ? COLOR_PRIMARY : 'white' }} onMouseEnter={() => setHoveredSocial('in')} onMouseLeave={() => setHoveredSocial(null)}><Linkedin size={26} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ ...styles.socialIconLink, color: hoveredSocial === 'ig' ? COLOR_PRIMARY : 'white' }} onMouseEnter={() => setHoveredSocial('ig')} onMouseLeave={() => setHoveredSocial(null)}><Instagram size={26} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ ...styles.socialIconLink, color: hoveredSocial === 'yt' ? COLOR_PRIMARY : 'white' }} onMouseEnter={() => setHoveredSocial('yt')} onMouseLeave={() => setHoveredSocial(null)}><Youtube size={26} /></a>
            </div>
          </div>
        </div>
        <div style={styles.copyright}>© 2025 CamerFarm AI. Tous Droits Réservés.</div>
      </footer>
    </div>
  );
};

export default Layout;