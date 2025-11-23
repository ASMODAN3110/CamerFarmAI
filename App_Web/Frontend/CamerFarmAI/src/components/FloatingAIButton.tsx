// src/components/FloatingAIButton.tsx

import React from 'react';
import { Brain } from 'lucide-react';
import { useState } from 'react';

// --- STYLES ---
const styles: { [key: string]: React.CSSProperties } = {
    // Bouton de base, flottant en bas à droite
    floatingButton: {
        position: 'fixed',
        bottom: '30px',      // Marge du bas
        right: '30px',       // Marge de droite
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#4CAF50', // Vert primaire
        color: 'white',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000, // S'assurer qu'il est au-dessus du contenu
        transition: 'transform 0.3s, background-color 0.3s',
        border: 'none',
        outline: 'none',
    },
    // Effet de survol (implémentation simplifiée)
    // Note: Les vrais effets de survol en style inline nécessitent des hooks (useState/onMouseEnter/onMouseLeave)
    icon: {
        // Taille de l'icône dans le bouton
    },
};

// --- INTERFACE ---
interface FloatingAIButtonProps {
    onClick: () => void; // Fonction à exécuter lors du clic (ex: ouvrir le chat)
    ariaLabel?: string;  // Description pour l'accessibilité
}

// --- COMPOSANT ---
const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onClick, ariaLabel = "Ouvrir l'assistant IA" }) => {
    
    // Pour gérer les vrais effets de survol en style inline (meilleure pratique)
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        ...styles.floatingButton,
        // Changer la couleur ou la mise à l'échelle au survol
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        backgroundColor: isHovered ? '#388E3C' : '#4CAF50', // Vert foncé au survol
    };

    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            aria-label={ariaLabel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Brain size={28} color="white" style={styles.icon} />
        </button>
    );
};

export default FloatingAIButton;