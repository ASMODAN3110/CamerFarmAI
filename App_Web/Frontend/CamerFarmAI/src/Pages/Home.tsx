// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { Bot, Brain, Activity, TrendingUp, ZapOff, Droplets } from "lucide-react";
import FloatingAIButton from '../components/FloatingAIButton';

// === CONSTANTES (inchangées) ===
const COLOR_PRIMARY = '#4CAF50';
const COLOR_SECONDARY = '#388E3C';
const backgroundImages = [
  '/images/Hero1.svg',
  '/images/Hero2.svg',
  '/images/Hero3.svg',
  '/images/Hero4.svg',
  '/images/Hero5.svg',
];

// === STYLES GLOBALES & AJUSTEMENTS ===
const styles: { [key: string]: React.CSSProperties } = {
  homePage: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    color: '#333',
  },
  // HERO : Correction de la zone noire + fondu
  heroSection: {
    position: 'relative',
    height: '70vh',
    minHeight: '500px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
  },
  heroImage: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0,
    transition: 'opacity 2s ease-in-out',
  },
  heroImageActive: { opacity: 1 },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '140px', // ← texte du hero bien descendu
  },
  heroContent: {
    color: 'white',
    textAlign: 'center',
    maxWidth: '900px',
    padding: '20px',
    zIndex: 10,
  },
  heroHeadline: {
    fontSize: window.innerWidth > 900 ? '2.4rem' :
             window.innerWidth > 600 ? '1.9rem' :
             window.innerWidth > 480 ? '1.6rem' : '1.4rem',
    marginBottom: '20px',
    fontWeight: 'bold',
    lineHeight: '1.3',
    textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
    transition: 'color 0.4s ease', // pour le changement de couleur fluide
  },
  heroText: {
    fontSize: window.innerWidth > 600 ? '1.1rem' : '1rem',
    marginBottom: '30px',
    lineHeight: '1.6',
    opacity: 0.95,
  },
  ctaButtonPrimary: {
    display: 'inline-block',
    padding: window.innerWidth > 600 ? '14px 30px' : '12px 24px',
    backgroundColor: '#FFFFFF',
    color: COLOR_PRIMARY,
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: window.innerWidth > 600 ? '1.1rem' : '1rem',
    fontWeight: 'bold',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
    transition: 'all 0.3s',
  },
  // SECTIONS (Styles de section inchangés)
  featuresSection: { padding: '60px 20px', textAlign: 'center', backgroundColor: '#F5F5F5' },
  featuresGrid: { display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px', flexWrap: 'wrap' },
  featureCard: { 
    flex: '1 1 280px', 
    maxWidth: '380px', 
    padding: '30px 25px', 
    backgroundColor: 'white', 
    borderRadius: '8px', 
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', 
    textAlign: 'center',
    transition: 'all 0.35s ease',
    cursor: 'pointer',
  },
  iconCircle: { width: '96px', height: '96px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 8px 20px rgba(0,0,0,0.12)' },
  impactSection: { padding: '60px 20px', textAlign: 'center', backgroundColor: '#D9D9D9' },
  impactGrid: { display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px', flexWrap: 'wrap' },
  impactItem: { 
    flex: '1 1 240px', 
    maxWidth: '250px', 
    padding: '20px', 
    backgroundColor: 'white', 
    borderRadius: '8px', 
    textAlign: 'center',
    transition: 'all 0.35s ease',
    cursor: 'pointer',
  },
  iconCircleSmall: { width: '76px', height: '76px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', boxShadow: '0 6px 16px rgba(0,0,0,0.1)' },
  finalCtaSection: { padding: '60px 20px', textAlign: 'center', backgroundColor: '#D1F4D7', color: 'green' },
  ctaButtonSecondary: { 
    display: 'inline-block', 
    padding: '12px 25px', 
    marginTop: '20px', 
    backgroundColor: COLOR_SECONDARY, 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '5px', 
    fontSize: '1.1em', 
    fontWeight: 'bold', 
    transition: 'background-color 0.3s', 
    cursor: 'pointer' 
  },
};

// === COMPOSANT PRINCIPAL ===
const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [headlineHovered, setHeadlineHovered] = useState(false);
  const [cardHovered, setCardHovered] = useState<number | null>(null);
  const [impactHovered, setImpactHovered] = useState<number | null>(null);

  // Logique du carrousel
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAIClick = () => {
    alert("Assistant IA CamerFarm - Bientôt disponible !");
  };

  return (
    <div style={styles.homePage}>
      {/* HERO – fondu subtil */}
      <header style={styles.heroSection}>
        {backgroundImages.map((img, i) => (
          <div
            key={i}
            style={{
              ...styles.heroImage,
              backgroundImage: `url(${img})`,
              ...(i === currentImageIndex ? styles.heroImageActive : {}),
            }}
          />
        ))}
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <h1 
              style={{
                ...styles.heroHeadline,
                color: headlineHovered ? COLOR_PRIMARY : 'white',
              }}
              onMouseEnter={() => setHeadlineHovered(true)}
              onMouseLeave={() => setHeadlineHovered(false)}
            >
                           TOUS ENSEMBLE POUR UNE AGRICULTURE INTELLIGENTE,CONNECTÉE ET AUTOMATISÉE.
            </h1>
            {/*<p style={styles.heroText}>

              La seule solution qui combine l’IA multilingue adaptée aux langues camerounaises avec des capteurs IoT alimentés par énergie solaire, garantissant une disponibilité continue.

            </p>*/}
          </div>
        </div>
      </header>

      {/* 3 PILIERS */}
      <section style={styles.featuresSection}>
        <h2>Fonctionnalités Principales</h2>
        <div style={styles.featuresGrid}>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              style={{
                ...styles.featureCard,
                transform: cardHovered === index ? 'translateY(-12px) scale(1.04)' : 'translateY(0) scale(1)',
                boxShadow: cardHovered === index ? '0 16px 32px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={() => setCardHovered(index)}
              onMouseLeave={() => setCardHovered(null)}
            >
              <div style={{ ...styles.iconCircle, backgroundColor: index === 0 ? '#E8F5E8' : index === 1 ? '#E3F2FD' : '#E0F2F1' }}>
                {index === 0 && <Bot size={52} color="#2E7D32" strokeWidth={2.2} />}
                {index === 1 && <Brain size={52} color="#1565C0" strokeWidth={2.2} />}
                {index === 2 && <Activity size={52} color="#00695C" strokeWidth={2.2} />}
              </div>
              <h3>{index === 0 ? 'Automatisation' : index === 1 ? 'AI Intégré' : 'Suivi En Temps Réel'}</h3>
              <p>
                {index === 0 && "Gérez votre irrigation, ventilation et éclairage sans effort. Notre système autonome, alimenté par énergie solaire, garantit que les tâches essentielles s'exécutent même en cas de coupure de courant."}
                {index === 1 && "Identifiez les maladies des cultures par simple photo et recevez des recommandations de traitement immédiates. Accédez à des conseils agricoles personnalisés en Français, Anglais et langues locales."}
                {index === 2 && "Visualisez les conditions critiques de votre champ à distance : humidité du sol, température, CO₂ et niveau d’eau. Recevez des alertes en temps réel pour anticiper les risques climatiques et les anomalies."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT */}
      <section style={styles.impactSection}>
        <h2>Agriculture intelligente face au climat, basée sur les données</h2>
        <div style={styles.impactGrid}>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              style={{
                ...styles.impactItem,
                transform: impactHovered === index ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
                boxShadow: impactHovered === index ? '0 14px 28px rgba(0,0,0,0.16)' : '0 4px 10px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={() => setImpactHovered(index)}
              onMouseLeave={() => setImpactHovered(null)}
            >
              <div style={{ ...styles.iconCircleSmall, backgroundColor: index === 0 ? '#E8F5E8' : index === 1 ? '#FFF3E0' : '#E3F2FD' }}>
                {index === 0 && <TrendingUp size={42} color="#2E7D32" strokeWidth={2.5} />}
                {index === 1 && <ZapOff size={42} color="#F57C00" strokeWidth={2.5} />}
                {index === 2 && <Droplets size={42} color="#1976D2" strokeWidth={2.5} />}
              </div>
              <p>
                {index === 0 && "Augmenter le rendement des produits."}
                {index === 1 && "Réduire la consommation d'énergie par une gestion intelligente (mode économie d'énergie automatique)."}
                {index === 2 && "Économiser la consommation d'eau grâce à l'irrigation précise."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contact" style={styles.finalCtaSection}>
        <h2>Prêt À Transformer Votre Agriculture ?</h2>
        <p>Rejoignez Les Centaines D'agriculteurs Qui Augmentent Leurs Rendements Avec CamerFarm AI</p>
        <a href="/inscription" style={styles.ctaButtonSecondary}>
          Nous Contacter
        </a>
      </section>

      {/* BOUTON D'IA FLOTTANT */}
      <FloatingAIButton onClick={handleAIClick} />
    </div>
  );
};

export default Home;