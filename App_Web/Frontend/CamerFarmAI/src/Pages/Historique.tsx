// src/Pages/Historique.tsx (Graphique)
import React, { useState } from 'react';
import { Calendar, User } from 'lucide-react';

const COLOR_PRIMARY = '#4CAF50';

// Types de capteurs
type SensorType = 'humidity' | 'temperature' | 'luminosity' | 'co2';

interface SensorButton {
  id: SensorType;
  label: string;
}

const sensors: SensorButton[] = [
  { id: 'humidity', label: 'Capteur Humidité du sol' },
  { id: 'temperature', label: 'Capteur Température ambiante' },
  { id: 'luminosity', label: 'Capteur de luminosité' },
  { id: 'co2', label: 'Capteur de CO2' },
];

// Données d'exemple pour chaque type de capteur
const generateGraphData = (sensorType: SensorType, startDate?: string, endDate?: string) => {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim', 'Lun', 'Mar', 'Mer'];
  
  // Données différentes pour chaque capteur
  const sensorData: Record<SensorType, number[]> = {
    humidity: [12, 25, 18, 45, 35, 65, 28, 75, 15, 48], // Humidité du sol (%)
    temperature: [22, 28, 24, 32, 27, 35, 29, 38, 21, 30], // Température (°C)
    luminosity: [15000, 35000, 22000, 55000, 42000, 72000, 38000, 80000, 18000, 50000], // Luminosité (lux)
    co2: [380, 420, 395, 450, 410, 480, 425, 500, 370, 440], // CO2 (ppm)
  };

  // Si des dates sont sélectionnées, filtrer les données
  let filteredDays = days;
  let filteredValues = sensorData[sensorType];

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Limiter à 10 jours max pour l'affichage
    const maxDays = Math.min(daysDiff, 10);
    filteredDays = days.slice(0, maxDays);
    filteredValues = sensorData[sensorType].slice(0, maxDays);
  }

  return { days: filteredDays, values: filteredValues, sensorType };
};

const styles: { [key: string]: React.CSSProperties } = {
  graphiquePage: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  
    minHeight: 'calc(100vh - 180px)',
    backgroundColor: '#f5f5f5',
  },
  tagline: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '20px',
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: 'Arial, sans-serif',
  },
  dashboardBanner: {
    backgroundColor: COLOR_PRIMARY,
    padding: '20px 30px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  bannerIcon: {
    width: '50px',
    height: '50px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: '2px',
    fontFamily: 'Arial, sans-serif',
  },
  welcomeSection: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  welcomeText: {
    fontSize: '1rem',
    color: '#333',
    lineHeight: '1.6',
    fontFamily: 'Arial, sans-serif',
  },
  instructionsSection: {
    backgroundColor: 'white',
    padding: '20px 25px',
    borderRadius: '8px',
    marginBottom: '25px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  instructionsText: {
    fontSize: '0.95rem',
    color: '#555',
    marginBottom: '20px',
    lineHeight: '1.5',
    fontFamily: 'Arial, sans-serif',
  },
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sensorButtonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    flex: '1',
    minWidth: '300px',
  },
  sensorButton: {
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    fontFamily: 'Arial, sans-serif',
  },
  sensorButtonActive: {
    backgroundColor: COLOR_PRIMARY,
    color: 'white',
  },
  sensorButtonInactive: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
  },
  datePickerContainer: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  datePickerGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  datePickerLabel: {
    fontSize: '0.9rem',
    color: '#333',
    fontWeight: '500',
    fontFamily: 'Arial, sans-serif',
  },
  datePickerInput: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: 'white',
    minWidth: '180px',
    cursor: 'pointer',
  },
  dateInput: {
    border: 'none',
    outline: 'none',
    fontSize: '0.9rem',
    color: '#333',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    flex: 1,
    padding: 0,
    margin: 0,
    width: '100%',
    minWidth: '120px',
    fontFamily: 'Arial, sans-serif',
  },
  datePickerIcon: {
    color: '#666',
  },
  graphSection: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  graphContainer: {
    position: 'relative',
    width: '100%',
    height: '450px',
    marginTop: '20px',
  },
  graphSvg: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  graphLine: {
    fill: 'none',
    stroke: '#2196F3',
    strokeWidth: '3',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  graphGrid: {
    stroke: '#e0e0e0',
    strokeWidth: '1',
    opacity: 0.3,
  },
  graphAxis: {
    stroke: '#999',
    strokeWidth: '1',
  },
  graphYLabel: {
    fontSize: '12px',
    fill: '#666',
    fontFamily: 'Arial, sans-serif',
  },
  graphXLabel: {
    fontSize: '11px',
    fill: '#666',
    fontFamily: 'Arial, sans-serif',
  },
};

const Graphique: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState<SensorType>('humidity');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Générer les données du graphique en fonction du capteur sélectionné et des dates
  const graphData = generateGraphData(selectedSensor, startDate, endDate);
  
  // Obtenir les valeurs min et max pour l'échelle du graphique selon le capteur
  const getYAxisRange = (sensorType: SensorType) => {
    switch (sensorType) {
      case 'humidity':
        return { min: 10, max: 80, step: 10 };
      case 'temperature':
        return { min: 15, max: 45, step: 5 };
      case 'luminosity':
        return { min: 0, max: 90000, step: 15000 };
      case 'co2':
        return { min: 350, max: 550, step: 25 };
      default:
        return { min: 10, max: 80, step: 10 };
    }
  };

  const yAxisRange = getYAxisRange(selectedSensor);
  
  // Générer les labels Y selon le type de capteur
  const generateYLabels = () => {
    const labels = [];
    for (let i = yAxisRange.min; i <= yAxisRange.max; i += yAxisRange.step) {
      labels.push(i);
    }
    return labels;
  };

  const yLabels = generateYLabels();

  return (
    <div style={styles.graphiquePage}>
      {/* Tagline */}
      <div style={styles.tagline}>
        Optimisez vos cultures, automatisez vos actions, recoltez l'avenir.
      </div>

      {/* Banner Dashboard */}
      <div style={styles.dashboardBanner}>
        <div style={styles.bannerIcon}>
          <User size={30} color="white" />
        </div>
        <div style={styles.bannerText}>DASHBOARD</div>
      </div>

      {/* Section de bienvenue */}
      <div style={styles.welcomeSection}>
        <p style={styles.welcomeText}>
          Bienvenue sur votre tableau de bord Smart Farming. Visualisez en temps réel les données de vos capteurs pour mieux comprendre l'état de vos parcelles et optimiser vos interventions.
        </p>
      </div>

      {/* Section instructions et filtres */}
      <div style={styles.instructionsSection}>
        <p style={styles.instructionsText}>
          Utilisez les boutons ci-dessous pour filtrer les types de capteurs (humidité, température, CO₂, etc.) et afficher ses mesures au fil des jours.
        </p>
        
        <div style={styles.filtersContainer}>
          {/* Boutons de capteurs */}
          <div style={styles.sensorButtonsContainer}>
            {sensors.map((sensor) => (
              <button
                key={sensor.id}
                style={{
                  ...styles.sensorButton,
                  ...(selectedSensor === sensor.id 
                    ? styles.sensorButtonActive 
                    : styles.sensorButtonInactive
                  ),
                }}
                onClick={() => setSelectedSensor(sensor.id)}
              >
                {sensor.label}
              </button>
            ))}
          </div>

          {/* Sélecteurs de dates */}
          <div style={styles.datePickerContainer}>
            <div style={styles.datePickerGroup}>
              <span style={styles.datePickerLabel}>Du :</span>
              <label style={styles.datePickerInput}>
                <Calendar size={18} style={styles.datePickerIcon} />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={endDate ? undefined : new Date().toISOString().split('T')[0]}
                  max={endDate || undefined}
                  style={styles.dateInput}
                />
              </label>
            </div>
            <div style={styles.datePickerGroup}>
              <span style={styles.datePickerLabel}>Au :</span>
              <label style={styles.datePickerInput}>
                <Calendar size={18} style={styles.datePickerIcon} />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || undefined}
                  style={styles.dateInput}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Section graphique */}
      <div style={styles.graphSection}>
        <div style={styles.graphContainer}>
          <svg style={styles.graphSvg} viewBox="0 0 1000 450" preserveAspectRatio="xMidYMid meet">
            {/* Grille horizontale et labels Y */}
            {yLabels.map((value, i) => {
              const y = 400 - (i * (350 / (yLabels.length - 1)));
              return (
                <g key={`grid-${i}`}>
                  <line
                    x1="80"
                    y1={y}
                    x2="950"
                    y2={y}
                    style={styles.graphGrid}
                  />
                  {/* Labels Y */}
                  <text
                    x="70"
                    y={y + 5}
                    style={styles.graphYLabel}
                    textAnchor="end"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            
            {/* Ligne du graphique */}
            {graphData.values.length > 0 && (
              <polyline
                points={graphData.values
                  .map((value, i) => {
                    const x = 80 + (i * 870) / Math.max(graphData.values.length - 1, 1);
                    // Normaliser les valeurs selon l'échelle du capteur
                    const range = yAxisRange.max - yAxisRange.min;
                    const normalizedValue = ((value - yAxisRange.min) / range) * 350;
                    const y = 400 - normalizedValue;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                style={styles.graphLine}
              />
            )}
            
            {/* Points sur la ligne */}
            {graphData.values.map((value, i) => {
              const x = 80 + (i * 870) / Math.max(graphData.values.length - 1, 1);
              const range = yAxisRange.max - yAxisRange.min;
              const normalizedValue = ((value - yAxisRange.min) / range) * 350;
              const y = 400 - normalizedValue;
              return (
                <circle
                  key={`point-${i}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#2196F3"
                />
              );
            })}
            
            {/* Axe X */}
            <line x1="80" y1="400" x2="950" y2="400" style={styles.graphAxis} />
            
            {/* Labels X - jours de la semaine */}
            {graphData.days.length > 0 && graphData.days.map((day, i) => {
              const x = 80 + (i * 870) / Math.max(graphData.days.length - 1, 1);
              return (
                <text
                  key={`x-label-${i}`}
                  x={x}
                  y="420"
                  style={styles.graphXLabel}
                  textAnchor="middle"
                >
                  {day}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Graphique;
