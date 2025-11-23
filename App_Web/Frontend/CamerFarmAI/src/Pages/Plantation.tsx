// src/Pages/Plantation.tsx
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const COLOR_PRIMARY = '#4CAF50';
const COLOR_SECONDARY = '#388E3C';

interface PlantationData {
  id: number;
  nom: string;
  superficie: string;
  localisation: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  plantationPage: {
    fontFamily: 'Arial, sans-serif',
    padding: '40px 20px',
    minHeight: 'calc(100vh - 180px)',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  errorContainer: {
    backgroundColor: 'white',
    padding: '60px 40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
    marginBottom: '30px',
  },
  errorTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  errorMessage: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '40px',
    lineHeight: '1.6',
    fontFamily: 'Arial, sans-serif',
  },
  createButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 28px',
    backgroundColor: COLOR_PRIMARY,
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
  },
  createButtonHover: {
    backgroundColor: COLOR_SECONDARY,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  formInput: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  formInputFocus: {
    outline: 'none',
    borderColor: COLOR_PRIMARY,
  },
  modalButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end',
    marginTop: '30px',
  },
  modalButton: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'Arial, sans-serif',
  },
  buttonNext: {
    backgroundColor: COLOR_PRIMARY,
    color: 'white',
  },
  buttonCancel: {
    backgroundColor: '#e0e0e0',
    color: '#333',
  },
  // Liste des plantations
  plantationsList: {
    width: '100%',
    maxWidth: '1200px',
    marginTop: '30px',
  },
  listTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'Arial, sans-serif',
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    padding: '15px 20px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#333',
    borderBottom: '2px solid #e0e0e0',
    fontFamily: 'Arial, sans-serif',
  },
  tableCell: {
    padding: '15px 20px',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '0.95rem',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  tableRow: {
    transition: 'background-color 0.2s ease',
  },
  tableRowHover: {
    backgroundColor: '#f8f9fa',
  },
};

const Plantation: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plantations, setPlantations] = useState<PlantationData[]>([]);
  const [formData, setFormData] = useState({
    nom: '',
    superficie: '',
    localisation: '',
  });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ nom: '', superficie: '', localisation: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nom.trim() || !formData.superficie.trim() || !formData.localisation.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Créer la nouvelle plantation
    const newPlantation: PlantationData = {
      id: Date.now(),
      nom: formData.nom,
      superficie: formData.superficie,
      localisation: formData.localisation,
    };

    setPlantations(prev => [...prev, newPlantation]);
    handleCloseModal();
  };

  return (
    <div style={styles.plantationPage}>
      {plantations.length === 0 ? (
        <div style={styles.errorContainer}>
          <div style={styles.errorTitle}>OUPS,</div>
          <p style={styles.errorMessage}>
            Il semble que vous n'ayez pas créé une plantation.
          </p>
          <button
            style={{
              ...styles.createButton,
              ...(isHovered ? styles.createButtonHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCreate}
          >
            Créer-en
            <Plus size={20} />
          </button>
        </div>
      ) : (
        <div style={styles.plantationsList}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={styles.listTitle}>Liste des plantations</h2>
            <button
              style={{
                ...styles.createButton,
                ...(isHovered ? styles.createButtonHover : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleCreate}
            >
              <Plus size={20} />
              Ajouter une plantation
            </button>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Nom de plantation</th>
                  <th style={styles.tableHeader}>Zone</th>
                  <th style={styles.tableHeader}>Superficie</th>
                </tr>
              </thead>
              <tbody>
                {plantations.map((plantation) => (
                  <tr
                    key={plantation.id}
                    style={styles.tableRow}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={styles.tableCell}>{plantation.nom}</td>
                    <td style={styles.tableCell}>{plantation.localisation}</td>
                    <td style={styles.tableCell}>{plantation.superficie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Entrez les informations du champ</h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="nom">
                  Nom de votre plantation
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  placeholder="Entrer le nom de votre plantation"
                  style={{
                    ...styles.formInput,
                    ...(focusedInput === 'nom' ? styles.formInputFocus : {}),
                  }}
                  onFocus={() => setFocusedInput('nom')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="superficie">
                  Superficie de plantation
                </label>
                <input
                  type="text"
                  id="superficie"
                  name="superficie"
                  value={formData.superficie}
                  onChange={handleInputChange}
                  placeholder="Entrer la superficie de votre plantation"
                  style={{
                    ...styles.formInput,
                    ...(focusedInput === 'superficie' ? styles.formInputFocus : {}),
                  }}
                  onFocus={() => setFocusedInput('superficie')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="localisation">
                  Localisation
                </label>
                <input
                  type="text"
                  id="localisation"
                  name="localisation"
                  value={formData.localisation}
                  onChange={handleInputChange}
                  placeholder="Entrer la zone de votre plantation"
                  style={{
                    ...styles.formInput,
                    ...(focusedInput === 'localisation' ? styles.formInputFocus : {}),
                  }}
                  onFocus={() => setFocusedInput('localisation')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div style={styles.modalButtons}>
                <button
                  type="button"
                  style={{ ...styles.modalButton, ...styles.buttonCancel }}
                  onClick={handleCloseModal}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ ...styles.modalButton, ...styles.buttonNext }}
                >
                  Suivant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plantation;
