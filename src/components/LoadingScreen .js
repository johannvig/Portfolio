import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      fontSize: '20px',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '20px' }}>
        Appuyez sur le bouton <strong>Q</strong> pour quitter la partie <br/> Utiliser les <strong>Flèches</strong> pour se déplacer
      </div>
      <div className="loading-spinner">
        
        <div style={{
          width: '40px',
          height: '40px',
          border: '5px solid rgba(255, 255, 255, 0.3)',
          borderTop: '5px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
