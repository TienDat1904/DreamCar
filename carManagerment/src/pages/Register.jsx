import { useState } from 'react';
import { registerUser, getUsers } from '../services/localStorageService';
import { useLanguage } from '../services/LanguageContext';

/* ─── Shared design tokens (same as Login) ─── */
const theme = {
  fontFamily: "'Sora', 'Segoe UI', sans-serif",
  bgDeep: '#080b0f',
  cardBg: 'rgba(16, 20, 28, 0.70)',
  border: 'rgba(255,255,255,0.10)',
  borderFocus: 'rgba(255,255,255,0.38)',
  borderError: 'rgba(239,68,68,0.55)',
  borderSuccess: 'rgba(34,197,94,0.50)',
  inputBg: 'rgba(255,255,255,0.055)',
  inputBgFocus: 'rgba(255,255,255,0.095)',
  text: '#e8eaed',
  textMuted: 'rgba(232,234,237,0.42)',
  btnBg: '#ffffff',
  btnText: '#0d1117',
  btnDisabled: 'rgba(255,255,255,0.22)',
  btnDisabledText: 'rgba(255,255,255,0.45)',
  radius: '13px',
  radiusBtn: '50px',
  shadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)',
};

/* ─── SVG icons ─── */
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconEyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

/* ─── Background scene (identical to Login) ─── */
const BackgroundScene = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: '#080b0f' }}>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        radial-gradient(1px 1px at 12% 10%, rgba(255,255,255,0.65) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 30% 6%, rgba(255,255,255,0.5) 0%, transparent 100%),
        radial-gradient(1px 1px at 58% 4%, rgba(255,255,255,0.7) 0%, transparent 100%),
        radial-gradient(1px 1px at 76% 13%, rgba(255,255,255,0.4) 0%, transparent 100%),
        radial-gradient(1px 1px at 91% 8%, rgba(255,255,255,0.55) 0%, transparent 100%),
        radial-gradient(1px 1px at 45% 19%, rgba(255,255,255,0.45) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 70% 22%, rgba(255,255,255,0.6) 0%, transparent 100%),
        radial-gradient(1px 1px at 6% 28%, rgba(255,255,255,0.3) 0%, transparent 100%),
        radial-gradient(1px 1px at 85% 30%, rgba(255,255,255,0.35) 0%, transparent 100%)
      `,
    }} />
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #06090e 0%, #0c1520 45%, #111e2e 70%, #090e18 100%)',
    }} />
    <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '55%' }}>
      <polygon points="0,400 160,180 320,260 480,140 640,220 800,100 960,200 1120,130 1280,210 1440,150 1440,400" fill="#0d1824"/>
      <polygon points="0,400 100,250 260,310 420,190 580,270 720,160 900,240 1060,170 1200,250 1360,180 1440,220 1440,400" fill="#0a1520"/>
      <polygon points="0,400 80,300 200,345 380,260 520,322 680,242 820,304 980,232 1140,292 1300,252 1440,278 1440,400" fill="#070d17"/>
      <rect x="0" y="382" width="1440" height="18" fill="#050a12"/>
      <ellipse cx="720" cy="395" rx="900" ry="55" fill="rgba(55,85,125,0.07)"/>
    </svg>
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 120% 38% at 50% 73%, rgba(70,105,145,0.10) 0%, transparent 60%)',
      animation: 'fogDrift 12s ease-in-out infinite alternate',
    }} />
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
      @keyframes fogDrift { 0%{transform:translateX(-3%) scaleY(1)} 100%{transform:translateX(3%) scaleY(1.07)} }
      @keyframes cardIn  { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes spin    { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      * { box-sizing: border-box; }
    `}</style>
  </div>
);

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
  const [focusedField, setFocusedField] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 8;

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    switch (fieldName) {
      case 'email':
        if (!value.trim()) { newErrors.email = t.validation_email_required; }
        else if (!validateEmail(value.trim())) { newErrors.email = t.validation_email_invalid; }
        else {
          const users = getUsers();
          if (users.find(u => u.email === value.trim())) { newErrors.email = t.validation_email_exists; }
          else { delete newErrors.email; }
        }
        break;
      case 'password':
        if (!value) { newErrors.password = t.validation_password_required; }
        else if (!validatePassword(value)) { newErrors.password = t.validation_password_weak; }
        else { delete newErrors.password; }
        break;
      case 'confirmPassword':
        if (!value) { newErrors.confirmPassword = t.validation_confirm_password_required; }
        else if (value !== password) { newErrors.confirmPassword = t.validation_passwords_not_match; }
        else { delete newErrors.confirmPassword; }
        break;
      default: break;
    }
    setErrors(newErrors);
  };

  const handleEmailChange = (e) => { setEmail(e.target.value); validateField('email', e.target.value); };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); validateField('password', e.target.value);
    if (confirmPassword) validateField('confirmPassword', confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => { setConfirmPassword(e.target.value); validateField('confirmPassword', e.target.value); };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const trimEmail = email.trim(), trimPwd = password.trim(), trimConfirm = confirmPassword.trim();
    const newErrors = {};
    if (!trimEmail) newErrors.email = t.validation_email_required;
    else if (!validateEmail(trimEmail)) newErrors.email = t.validation_email_invalid;
    else { const users = getUsers(); if (users.find(u => u.email === trimEmail)) newErrors.email = t.validation_email_exists; }
    if (!trimPwd) newErrors.password = t.validation_password_required;
    else if (!validatePassword(trimPwd)) newErrors.password = t.validation_password_weak;
    if (!trimConfirm) newErrors.confirmPassword = t.validation_confirm_password_required;
    else if (trimConfirm !== trimPwd) newErrors.confirmPassword = t.validation_passwords_not_match;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setIsLoading(true);
    setTimeout(() => {
      const result = registerUser(trimEmail, trimPwd);
      if (result.success) {
        setSuccessMessage(t.register_success);
        setTimeout(() => { onRegisterSuccess(); onSwitchToLogin(); }, 1500);
      } else {
        setErrors({ general: result.message });
        setIsLoading(false);
      }
    }, 1000);
  };

  const getBorderColor = (field) => {
    if (errors[field]) return theme.borderError;
    if (field === 'email' && email.trim() && validateEmail(email.trim())) return theme.borderSuccess;
    if (field === 'password' && password && validatePassword(password)) return theme.borderSuccess;
    if (field === 'confirmPassword' && confirmPassword && confirmPassword === password) return theme.borderSuccess;
    return focusedField === field ? theme.borderFocus : theme.border;
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '15px 48px 15px 18px',
    fontFamily: theme.fontFamily,
    fontSize: '0.88rem',
    color: theme.text,
    background: focusedField === field ? theme.inputBgFocus : theme.inputBg,
    border: `1px solid ${getBorderColor(field)}`,
    borderRadius: theme.radius,
    outline: 'none',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(255,255,255,0.05)' : 'none',
    transition: 'all 0.2s ease',
    opacity: isLoading ? 0.6 : 1,
  });

  const feedbackStyle = (isError) => ({
    fontSize: '0.75rem',
    marginTop: '5px',
    marginLeft: '4px',
    color: isError ? '#fca5a5' : '#86efac',
  });

  return (
    <>
      <BackgroundScene />
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        minHeight: '100vh', padding: '24px 20px', fontFamily: theme.fontFamily,
      }}>
        <div style={{
          width: '460px', maxWidth: '95vw',
          borderRadius: '14px', overflow: 'hidden',
          boxShadow: theme.shadow,
          animation: 'cardIn 0.55s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          {/* Title bar */}
          <div style={{
            height: '40px', background: 'rgba(22,25,30,0.97)',
            display: 'flex', alignItems: 'center', padding: '0 14px', gap: '8px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            {[['#ff5f57'], ['#febc2e'], ['#28c840']].map(([color], i) => (
              <span key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: color, flexShrink: 0 }} />
            ))}
          </div>

          {/* Glass card */}
          <div style={{
            background: theme.cardBg,
            backdropFilter: 'blur(26px) saturate(150%)',
            WebkitBackdropFilter: 'blur(26px) saturate(150%)',
            padding: '44px 44px 38px',
          }}>
            <h1 style={{
              fontFamily: theme.fontFamily, fontSize: '2rem', fontWeight: 700,
              color: theme.text, textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 28px',
            }}>
              {t.register_title}
            </h1>

            {/* General error */}
            {errors.general && (
              <div style={{
                color: '#fca5a5', fontSize: '0.82rem', textAlign: 'center',
                padding: '10px 14px', marginBottom: '16px',
                background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: '9px',
              }}>{errors.general}</div>
            )}

            {/* Success */}
            {successMessage && (
              <div style={{
                color: '#86efac', fontSize: '0.82rem', textAlign: 'center',
                padding: '10px 14px', marginBottom: '16px',
                background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.28)',
                borderRadius: '9px',
              }}>{successMessage}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Email */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    style={inputStyle('email')}
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => { setFocusedField(null); validateField('email', email); }}
                    onFocus={() => setFocusedField('email')}
                    placeholder={t.register_email_placeholder}
                    disabled={isLoading}
                  />
                  <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }}>
                    <IconMail />
                  </span>
                </div>
                {errors.email && <div style={feedbackStyle(true)}>❌ {errors.email}</div>}
                {!errors.email && email.trim() && validateEmail(email.trim()) && (
                  <div style={feedbackStyle(false)}>✓ {t.validation_email_valid}</div>
                )}
              </div>

              {/* Password */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    style={inputStyle('password')}
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => { setFocusedField(null); validateField('password', password); }}
                    onFocus={() => setFocusedField('password')}
                    placeholder={t.register_password_placeholder}
                    disabled={isLoading}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: theme.textMuted, display: 'flex', padding: 0 }}>
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {errors.password && <div style={feedbackStyle(true)}>❌ {errors.password}</div>}
                {!errors.password && password && validatePassword(password) && (
                  <div style={feedbackStyle(false)}>✓ {t.validation_password_strong}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    style={inputStyle('confirmPassword')}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={() => { setFocusedField(null); validateField('confirmPassword', confirmPassword); }}
                    onFocus={() => setFocusedField('confirmPassword')}
                    placeholder={t.register_confirm_password_placeholder}
                    disabled={isLoading}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: theme.textMuted, display: 'flex', padding: 0 }}>
                    {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {errors.confirmPassword && <div style={feedbackStyle(true)}>❌ {errors.confirmPassword}</div>}
                {!errors.confirmPassword && confirmPassword && confirmPassword === password && (
                  <div style={feedbackStyle(false)}>✓ {t.validation_passwords_match}</div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%', padding: '15px',
                  background: isLoading ? theme.btnDisabled : theme.btnBg,
                  color: isLoading ? theme.btnDisabledText : theme.btnText,
                  border: 'none', borderRadius: theme.radiusBtn,
                  fontFamily: theme.fontFamily, fontSize: '0.9rem', fontWeight: 700,
                  cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '4px',
                  boxShadow: isLoading ? 'none' : '0 4px 20px rgba(255,255,255,0.14)',
                  transition: 'transform 0.15s, box-shadow 0.2s, background 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                }}
                onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,255,255,0.2)'; } }}
                onMouseLeave={e => { if (!isLoading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.14)'; } }}
              >
                {isLoading && (
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'rgba(255,255,255,0.85)',
                    animation: 'spin 0.8s linear infinite',
                    display: 'inline-block',
                  }} />
                )}
                {isLoading ? t.register_processing : t.register_button}
              </button>
            </form>

            {/* Switch to Login */}
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.82rem', color: theme.textMuted }}>
              {t.register_link_text}{' '}
              <button
                onClick={onSwitchToLogin}
                disabled={isLoading}
                style={{
                  background: 'none', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
                  color: theme.text, fontFamily: theme.fontFamily,
                  fontSize: '0.82rem', fontWeight: 700, padding: 0,
                }}
              >
                {t.register_link_button}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;