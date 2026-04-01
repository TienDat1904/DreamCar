import { useState } from 'react';
import { registerUser, getUsers } from '../services/localStorageService';
import { useLanguage } from '../services/LanguageContext';

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation: min 8 chars, at least 1 uppercase, 1 number
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUpperCase && hasNumber && isLongEnough;
  };

  // Validate single field
  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'email':
        if (!value.trim()) {
          newErrors.email = t.validation_email_required;
        } else if (!validateEmail(value.trim())) {
          newErrors.email = t.validation_email_invalid;
        } else {
          const users = getUsers();
          if (users.find(user => user.email === value.trim())) {
            newErrors.email = t.validation_email_exists;
          } else {
            delete newErrors.email;
          }
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = t.validation_password_required;
        } else if (!validatePassword(value)) {
          newErrors.password = t.validation_password_weak;
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = t.validation_confirm_password_required;
        } else if (value !== password) {
          newErrors.confirmPassword = t.validation_passwords_not_match;
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateField('email', value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validateField('password', value);
    if (confirmPassword) {
      validateField('confirmPassword', confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateField('confirmPassword', value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    const newErrors = {};

    if (!trimmedEmail) {
      newErrors.email = t.validation_email_required;
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = t.validation_email_invalid;
    } else {
      const users = getUsers();
      if (users.find(user => user.email === trimmedEmail)) {
        newErrors.email = t.validation_email_exists;
      }
    }

    if (!trimmedPassword) {
      newErrors.password = t.validation_password_required;
    } else if (!validatePassword(trimmedPassword)) {
      newErrors.password = t.validation_password_weak;
    }

    if (!trimmedConfirmPassword) {
      newErrors.confirmPassword = t.validation_confirm_password_required;
    } else if (trimmedConfirmPassword !== trimmedPassword) {
      newErrors.confirmPassword = t.validation_passwords_not_match;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = registerUser(trimmedEmail, trimmedPassword);
      if (result.success) {
        setSuccessMessage(t.register_success);
        setTimeout(() => {
          onRegisterSuccess();
          onSwitchToLogin();
        }, 1500);
      } else {
        setErrors({ general: result.message });
        setIsLoading(false);
      }
    }, 1000);
  };

  const getInputBorderColor = (fieldName) => {
    if (errors[fieldName]) {
      return '#e74c3c';
    }
    if (fieldName === 'email' && email.trim() && validateEmail(email.trim())) {
      return '#2ecc71';
    }
    if (fieldName === 'password' && password && validatePassword(password)) {
      return '#2ecc71';
    }
    if (fieldName === 'confirmPassword' && confirmPassword && confirmPassword === password) {
      return '#2ecc71';
    }
    return '#bdc3c7';
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
      maxWidth: '450px',
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
      marginBottom: '22px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '8px',
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '14px',
      border: '2px solid',
      borderRadius: '4px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
    },
    togglePasswordBtn: {
      position: 'absolute',
      right: '12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      color: '#7f8c8d',
      transition: 'color 0.3s',
      padding: '0',
    },
    errorMessage: {
      color: '#e74c3c',
      fontSize: '12px',
      marginTop: '6px',
      marginLeft: '2px',
    },
    successMessage: {
      color: '#2ecc71',
      fontSize: '12px',
      marginTop: '6px',
      marginLeft: '2px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    buttonDisabled: {
      backgroundColor: '#95a5a6',
      cursor: 'not-allowed',
    },
    generalError: {
      color: '#e74c3c',
      fontSize: '14px',
      marginBottom: '16px',
      textAlign: 'center',
      padding: '12px',
      backgroundColor: '#fadbd8',
      borderRadius: '4px',
    },
    generalSuccess: {
      color: '#27ae60',
      fontSize: '14px',
      marginBottom: '16px',
      textAlign: 'center',
      padding: '12px',
      backgroundColor: '#d5f4e6',
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
      backgroundColor: 'transparent',
      border: 'none',
      padding: '0',
      font: 'inherit',
    },
    spinner: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #2ecc71',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };

  const spinnerKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{spinnerKeyframes}</style>
      <div style={containerStyles.container}>
        <div style={containerStyles.formWrapper}>
          <h1 style={containerStyles.title}>{t.register_title}</h1>

          {errors.general && (
            <div style={containerStyles.generalError}>{errors.general}</div>
          )}

          {successMessage && (
            <div style={containerStyles.generalSuccess}>{successMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={containerStyles.formGroup}>
              <label style={containerStyles.label}>{t.register_email_label}</label>
              <input
                type="email"
                style={{
                  ...containerStyles.input,
                  borderColor: getInputBorderColor('email'),
                }}
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateField('email', email)}
                placeholder={t.register_email_placeholder}
                disabled={isLoading}
              />
              {errors.email && (
                <div style={containerStyles.errorMessage}>❌ {errors.email}</div>
              )}
              {!errors.email && email.trim() && validateEmail(email.trim()) && (
                <div style={containerStyles.successMessage}>✓ {t.validation_email_valid}</div>
              )}
            </div>

            <div style={containerStyles.formGroup}>
              <label style={containerStyles.label}>{t.register_password_label}</label>
              <div style={containerStyles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={{
                    ...containerStyles.input,
                    borderColor: getInputBorderColor('password'),
                  }}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => validateField('password', password)}
                  placeholder={t.register_password_placeholder}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  style={containerStyles.togglePasswordBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <div style={containerStyles.errorMessage}>❌ {errors.password}</div>
              )}
              {!errors.password && password && validatePassword(password) && (
                <div style={containerStyles.successMessage}>✓ {t.validation_password_strong}</div>
              )}
            </div>

            <div style={containerStyles.formGroup}>
              <label style={containerStyles.label}>{t.register_confirm_password_label}</label>
              <div style={containerStyles.inputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  style={{
                    ...containerStyles.input,
                    borderColor: getInputBorderColor('confirmPassword'),
                  }}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={() => validateField('confirmPassword', confirmPassword)}
                  placeholder={t.register_confirm_password_placeholder}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  style={containerStyles.togglePasswordBtn}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <div style={containerStyles.errorMessage}>❌ {errors.confirmPassword}</div>
              )}
              {!errors.confirmPassword && confirmPassword && confirmPassword === password && (
                <div style={containerStyles.successMessage}>✓ {t.validation_passwords_match}</div>
              )}
            </div>

            <button
              type="submit"
              style={{
                ...containerStyles.button,
                ...(isLoading ? containerStyles.buttonDisabled : {}),
              }}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#27ae60';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#2ecc71';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={containerStyles.spinner}></div>
                  {t.register_processing}
                </>
              ) : (
                t.register_button
              )}
            </button>
          </form>

          <div style={containerStyles.link}>
            {t.register_link_text}{' '}
            <button
              style={containerStyles.linkButton}
              onClick={onSwitchToLogin}
              disabled={isLoading}
            >
              {t.register_link_button}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;




