// src/types.d.ts

import * as React from 'react';
import { Properties } from 'csstype'; // Importe les types CSS standard

// Définit les types pour les variables CSS utilisées par Font Awesome (ex: --fa-icon)
// Note: Utiliser 'any' ici est une solution de contournement courante et nécessaire
// pour résoudre ce conflit de signature d'index entre Font Awesome et React.
type FontAwesomeCssVars = {
    [key: `--fa-${string}`]: any;
    [key: `--fa-font-${string}`]: any;
};

declare module 'react' {
    // Étend CSSProperties pour inclure les variables Font Awesome
    interface CSSProperties extends Properties, FontAwesomeCssVars {}
}

// Optionnel: Si vous utilisez des composants Font Awesome qui acceptent des styles en ligne,
// vous pourriez aussi avoir besoin d'étendre la propriété 'style' de Font Awesome.
declare module '@fortawesome/react-fontawesome' {
    interface FontAwesomeIconProps {
        style?: React.CSSProperties; // Déjà inclus, mais utile pour le debug
    }
}