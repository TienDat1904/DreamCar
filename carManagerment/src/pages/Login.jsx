import { useState } from 'react';
import { loginUser } from '../services/localStorageService';
import { useLanguage } from '../services/LanguageContext';
import { useToast } from '../services/ToastContext';

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t.validation_email_required);
      return;
    }

    const result = loginUser(email, password);
    if (result.success) {
      showToast(t.login_success, 'success');
      onLoginSuccess();
    } else {
      setError(result.message);
    }
  };

  const containerStyles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
    },
    formWrapper: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      padding: '40px',
      maxWidth: '400px',
      width: '100%',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#2c3e50',
      margin: '0 0 30px 0',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '14px',
      border: '1px solid #bdc3c7',
      borderRadius: '4px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#3498db',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px',
    },
    error: {
      color: '#e74c3c',
      fontSize: '14px',
      marginBottom: '16px',
      textAlign: 'center',
      padding: '10px',
      backgroundColor: '#fadbd8',
      borderRadius: '4px',
    },
    link: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: '#7f8c8d',
    },
    linkButton: {
      color: '#3498db',
      cursor: 'pointer',
      textDecoration: 'underline',
      backgroundColor: 'none',
      border: 'none',
      padding: '0',
      font: 'inherit',
    },
  };

  return (
    <div style={containerStyles.container}>
      <div style={containerStyles.formWrapper}>
        <h1 style={containerStyles.title}>{t.login_title}</h1>

        {error && <div style={containerStyles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={containerStyles.formGroup}>
            <label style={containerStyles.label}>{t.login_email_label}</label>
            <input
              type="email"
              style={containerStyles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.login_email_placeholder}
              onFocus={(e) => {
                e.target.style.borderColor = '#3498db';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#bdc3c7';
              }}
            />
          </div>

          <div style={containerStyles.formGroup}>
            <label style={containerStyles.label}>{t.login_password_label}</label>
            <input
              type="password"
              style={containerStyles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.login_password_placeholder}
              onFocus={(e) => {
                e.target.style.borderColor = '#3498db';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#bdc3c7';
              }}
            />
          </div>

          <button
            type="submit"
            style={containerStyles.button}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2980b9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#3498db';
            }}
          >
            {t.login_button}
          </button>
        </form>

        <div style={containerStyles.link}>
          {t.login_link_text}{' '}
          <button
            style={containerStyles.linkButton}
            onClick={onSwitchToRegister}
          >
            {t.login_link_button}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

