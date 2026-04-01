import React from 'react';

function ConfirmModal({ title, message, onConfirm, onCancel, confirmText, cancelText, isDanger = false }) {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
      animation: 'fadeIn 0.3s ease-out',
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '30px',
      maxWidth: '400px',
      width: '90%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      animation: 'slideUp 0.3s ease-out',
    },
    title: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#2c3e50',
      margin: '0 0 16px 0',
    },
    message: {
      fontSize: '14px',
      color: '#7f8c8d',
      lineHeight: '1.6',
      margin: '0 0 24px 0',
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      minWidth: '100px',
    },
    cancelBtn: {
      backgroundColor: '#ecf0f1',
      color: '#2c3e50',
    },
    confirmBtn: {
      backgroundColor: isDanger ? '#e74c3c' : '#3498db',
      color: 'white',
    },
  };

  // Add animations
  React.useEffect(() => {
    const style = document.createElement('style');
    if (!document.querySelector('style[data-confirm-modal-animation]')) {
      style.setAttribute('data-confirm-modal-animation', 'true');
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.cancelBtn }}
            onClick={onCancel}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4d6d8';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ecf0f1';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {cancelText}
          </button>
          <button
            style={{ ...styles.button, ...styles.confirmBtn }}
            onClick={onConfirm}
            onMouseEnter={(e) => {
              const hoverColor = isDanger ? '#c0392b' : '#2980b9';
              e.currentTarget.style.backgroundColor = hoverColor;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              const normalColor = isDanger ? '#e74c3c' : '#3498db';
              e.currentTarget.style.backgroundColor = normalColor;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
