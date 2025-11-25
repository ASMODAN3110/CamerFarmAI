// src/components/Layout.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Facebook, Linkedin, Instagram, Youtube, Menu, X, Bell, User, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
  signupButton: { backgroundColor: COLOR_SECONDARY, color: 'white' },

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
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    transition: 'color 0.3s ease',
    position: 'relative',
  },
  iconButtonHover: {
    color: COLOR_PRIMARY,
  },
  notificationBadge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '8px',
    height: '8px',
    backgroundColor: '#dc3545',
    borderRadius: '50%',
  },
  notificationsDropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '10px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '320px',
    maxWidth: '400px',
    maxHeight: '400px',
    overflowY: 'auto',
    zIndex: 1001,
  },
  notificationsHeader: {
    padding: '16px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationsTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  notificationsList: {
    padding: '8px 0',
  },
  notificationItem: {
    padding: '12px 16px',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  notificationItemHover: {
    backgroundColor: '#f9f9f9',
  },
  notificationEmpty: {
    padding: '40px 20px',
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9rem',
  },
  notificationButtonContainer: {
    position: 'relative',
  },
  profileButtonContainer: {
    position: 'relative',
  },
  profileDropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '10px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '200px',
    zIndex: 1001,
    overflow: 'hidden',
  },
  profileMenuItem: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '0.95rem',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    borderBottom: '1px solid #f0f0f0',
  },
  profileMenuItemLast: {
    borderBottom: 'none',
  },
  profileMenuItemHover: {
    backgroundColor: '#f9f9f9',
  },
  profileMenuItemDanger: {
    color: '#dc3545',
  },
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHistoriquePage = location.pathname === '/historique';
  const isPlantationPage = location.pathname === '/plantation';
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Données d'exemple pour les notifications (à remplacer par de vraies données plus tard)
  interface Notification {
    id: number;
    message: string;
    time: string;
  }
  const notifications: Notification[] = [
    // Exemple de notifications - à remplacer par de vraies données
    // { id: 1, message: 'Nouvelle alerte: Humidité basse', time: 'Il y a 5 min' },
  ];

  // Fermer le menu de notifications quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    if (notificationsOpen || profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen, profileMenuOpen]);

  const handleLogout = () => {
    // Supprimer les tokens
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
    setProfileMenuOpen(false);
    navigate('/');
  };

  // Détection mobile
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth <= 900);
    updateSize();
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
        {!isMobile && (
          <div style={styles.desktopRightMenu}>
            {(isHistoriquePage || isPlantationPage) ? (
              // Navigation pour les pages Historique et Plantation
              <>
                <a href="/" style={styles.navLink}>Accueil</a>
                <a href="/monitoring" style={styles.navLink}>Monitoring</a>
                <a href="/historique" style={isHistoriquePage ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}>Graphique</a>
                <a href="/plantation" style={isPlantationPage ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}>Plantation</a>
                <a href="/support" style={styles.navLink}>Support</a>
                <a href="/ia" style={styles.navLink}>IA</a>
                <div style={styles.notificationButtonContainer} ref={notificationsRef}>
                  <button 
                    style={styles.iconButton}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLOR_PRIMARY}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    aria-label="Notifications"
                  >
                    <Bell size={22} />
                    {notifications.length > 0 && <span style={styles.notificationBadge} />}
                  </button>
                  {notificationsOpen && (
                    <div style={styles.notificationsDropdown}>
                      <div style={styles.notificationsHeader}>
                        <div style={styles.notificationsTitle}>Notifications</div>
                        <button
                          onClick={() => setNotificationsOpen(false)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#666' }}
                        >
                          ×
                        </button>
                      </div>
                      <div style={styles.notificationsList}>
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <div
                              key={notif.id}
                              style={styles.notificationItem}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <div style={{ fontSize: '0.9rem', color: '#333', marginBottom: '4px' }}>{notif.message}</div>
                              <div style={{ fontSize: '0.75rem', color: '#999' }}>{notif.time}</div>
                            </div>
                          ))
                        ) : (
                          <div style={styles.notificationEmpty}>
                            Aucune notification
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div style={styles.profileButtonContainer} ref={profileRef}>
                  <button 
                    style={styles.iconButton}
                    onMouseEnter={(e) => e.currentTarget.style.color = COLOR_PRIMARY}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    aria-label="Profil"
                  >
                    <User size={22} />
                  </button>
                  {profileMenuOpen && (
                    <div style={styles.profileDropdown}>
                      <div
                        style={styles.profileMenuItem}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => {
                          navigate('/profil');
                          setProfileMenuOpen(false);
                        }}
                      >
                        <User size={18} />
                        Profil
                      </div>
                      <div
                        style={{ ...styles.profileMenuItem, ...styles.profileMenuItemLast, ...styles.profileMenuItemDanger }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={handleLogout}
                      >
                        <LogOut size={18} />
                        Déconnexion
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Navigation pour les autres pages
              <>
                <a href="/" style={location.pathname === '/' ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}>Accueil</a>
                <a href="/historique" style={styles.navLink}>Graphique</a>
                <a href="/plantation" style={isPlantationPage ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}>Plantation</a>
                <a href="/support" style={location.pathname === '/support' ? { ...styles.navLink, ...styles.navLinkActive } : styles.navLink}>Support</a>
                {!isAuthenticated && (
                  <>
                    <a href="/connexion" style={{ ...styles.authButton, ...styles.connectButton }}>Se Connecter</a>
                    <a href="/inscription" style={{ ...styles.authButton, ...styles.signupButton }}>S'inscrire</a>
                  </>
                )}
              </>
            )}
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
            {(isHistoriquePage || isPlantationPage) ? (
              // Navigation pour les pages Historique et Plantation
              <>
                <a href="/" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Accueil</a>
                <a href="/monitoring" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Monitoring</a>
                <a href="/historique" style={isHistoriquePage ? { ...styles.mobileNavLink, color: COLOR_PRIMARY } : styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Graphique</a>
                <a href="/plantation" style={isPlantationPage ? { ...styles.mobileNavLink, color: COLOR_PRIMARY } : styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Plantation</a>
                <a href="/support" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Support</a>
                <a href="/ia" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>IA</a>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
                  <button 
                    style={{ ...styles.iconButton, fontSize: '1.5rem', position: 'relative' }}
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setMobileMenuOpen(false);
                    }}
                    aria-label="Notifications"
                  >
                    <Bell size={24} />
                    {notifications.length > 0 && <span style={styles.notificationBadge} />}
                  </button>
                  <div style={styles.profileButtonContainer} ref={profileRef}>
                    <button 
                      style={{ ...styles.iconButton, fontSize: '1.5rem' }}
                      onClick={() => {
                        setProfileMenuOpen(!profileMenuOpen);
                      }}
                      aria-label="Profil"
                    >
                      <User size={24} />
                    </button>
                    {profileMenuOpen && (
                      <div style={{ ...styles.profileDropdown, position: 'absolute', top: '100%', left: '0', marginTop: '10px' }}>
                        <div
                          style={styles.profileMenuItem}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          onClick={() => {
                            navigate('/profil');
                            setProfileMenuOpen(false);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <User size={18} />
                          Profil
                        </div>
                        <div
                          style={{ ...styles.profileMenuItem, ...styles.profileMenuItemLast, ...styles.profileMenuItemDanger }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LogOut size={18} />
                          Déconnexion
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // Navigation pour les autres pages
              <>
                <a href="/" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Accueil</a>
                <a href="/historique" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Graphique</a>
                <a href="/plantation" style={isPlantationPage ? { ...styles.mobileNavLink, color: COLOR_PRIMARY } : styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Plantation</a>
                <a href="/support" style={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Support</a>
              </>
            )}
          </nav>
          {!isAuthenticated && !isHistoriquePage && (
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
          )}
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