import React from 'react';
import { useToast } from '../services/ToastContext';

function Toast() {
  const { toasts, removeToast } = useToast();

  const styles = {
    container: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    toast: {
      backgroundColor: 'white',
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      minWidth: '280px',
      maxWidth: '400px',
      animation: 'slideIn 0.3s ease-out',
      overflow: 'hidden',
    },
    toastSuccess: {
      borderLeft: '4px solid #2ecc71',
    },
    toastError: {
      borderLeft: '4px solid #e74c3c',
    },
    toastInfo: {
      borderLeft: '4px solid #3498db',
    },
    toastWarning: {
      borderLeft: '4px solid #f39c12',
    },
    icon: {
      fontSize: '20px',
      fontWeight: 'bold',
      minWidth: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconSuccess: {
      color: '#2ecc71',
    },
    iconError: {
      color: '#e74c3c',
    },
    iconInfo: {
      color: '#3498db',
    },
    iconWarning: {
      color: '#f39c12',
    },
    message: {
      fontSize: '14px',
      color: '#2c3e50',
      fontWeight: '500',
      flex: 1,
      wordWrap: 'break-word',
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#95a5a6',
      padding: '0',
      minWidth: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'color 0.3s',
    },
    progressBar: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      height: '3px',
      animation: 'shrink 3s linear forwards',
    },
    progressBarSuccess: {
      backgroundColor: '#2ecc71',
    },
    progressBarError: {
      backgroundColor: '#e74c3c',
    },
    progressBarInfo: {
      backgroundColor: '#3498db',
    },
    progressBarWarning: {
      backgroundColor: '#f39c12',
    },
  };

  // Add styles for animations
  const style = document.createElement('style');
  if (!document.querySelector('style[data-toast-animation]')) {
    style.setAttribute('data-toast-animation', 'true');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes shrink {
        from {
          width: 100%;
        }
        to {
          width: 0%;
        }
      }

      @media (max-width: 480px) {
        .toast-container {
          left: 10px;
          right: 10px;
          top: 10px;
        }
        .toast-item {
          min-width: unset;
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      case 'warning':
        return '⚠';
      default:
        return '•';
    }
  };

  const getIconStyle = (type) => {
    switch (type) {
      case 'success':
        return styles.iconSuccess;
      case 'error':
        return styles.iconError;
      case 'info':
        return styles.iconInfo;
      case 'warning':
        return styles.iconWarning;
      default:
        return {};
    }
  };

  const getToastStyle = (type) => {
    switch (type) {
      case 'success':
        return styles.toastSuccess;
      case 'error':
        return styles.toastError;
      case 'info':
        return styles.toastInfo;
      case 'warning':
        return styles.toastWarning;
      default:
        return {};
    }
  };

  const getProgressStyle = (type) => {
    switch (type) {
      case 'success':
        return styles.progressBarSuccess;
      case 'error':
        return styles.progressBarError;
      case 'info':
        return styles.progressBarInfo;
      case 'warning':
        return styles.progressBarWarning;
      default:
        return {};
    }
  };

  return (
    <div style={styles.container} className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{ ...styles.toast, ...getToastStyle(toast.type), position: 'relative' }}
          className="toast-item"
        >
          <div style={{ ...styles.icon, ...getIconStyle(toast.type) }}>
            {getIcon(toast.type)}
          </div>
          <div style={styles.message}>{toast.message}</div>
          <button
            style={styles.closeBtn}
            onClick={() => removeToast(toast.id)}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2c3e50')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#95a5a6')}
          >
            ×
          </button>
          <div style={{ ...styles.progressBar, ...getProgressStyle(toast.type) }} />
        </div>
      ))}
    </div>
  );
}

export default Toast;
