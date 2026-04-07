import { useState } from 'react';
import { registerUser, getUsers } from '../services/localStorageService';
import { useLanguage } from '../services/LanguageContext';
import { useTheme } from '../services/ThemeContext';

const theme = {
  fontFamily: "'Sora', 'Segoe UI', sans-serif",
  cardBg: 'var(--glass-bg)',
  border: 'var(--border)',
  borderFocus: 'var(--border-focus)',
  borderError: 'var(--danger-border)',
  borderSuccess: 'rgba(34,197,94,0.50)',
  inputBg: 'var(--input-bg)',
  inputBgFocus: 'var(--input-bg-focus)',
  text: 'var(--text)',
  textMuted: 'var(--text-muted)',
  btnBg: 'var(--btn-solid-bg)',
  btnText: 'var(--btn-solid-text)',
  btnDisabled: 'var(--border)',
   btnDisabledText: 'var(--text-muted)',
  radius: '13px',
  radiusBtn: '50px',
  shadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)',
};

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconCard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
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

const DarkBackground = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
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
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #06090e 0%, #0c1520 45%, #111e2e 70%, #090e18 100%)' }} />
    <svg viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice"
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '55%' }}>
      <polygon points="0,400 160,180 320,260 480,140 640,220 800,100 960,200 1120,130 1280,210 1440,150 1440,400" fill="#0d1824"/>
      <polygon points="0,400 100,250 260,310 420,190 580,270 720,160 900,240 1060,170 1200,250 1360,180 1440,220 1440,400" fill="#0a1520"/>
      <polygon points="0,400 80,300 200,345 380,260 520,322 680,242 820,304 980,232 1140,292 1300,252 1440,278 1440,400" fill="#070d17"/>
      <rect x="0" y="382" width="1440" height="18" fill="#050a12"/>
      <ellipse cx="720" cy="395" rx="900" ry="55" fill="rgba(55,85,125,0.07)"/>
    </svg>
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 120% 38% at 50% 73%, rgba(70,105,145,0.10) 0%, transparent 60%)',
      animation: 'fogDrift 12s ease-in-out infinite alternate' }} />
  </div>
);

const LightBackground = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: 0,
      background: 'linear-gradient(145deg, #eceaf6 0%, #e2dff4 35%, #d8d5ee 65%, #dddaf2 100%)' }} />
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 80% 60% at 78% -5%, rgba(200,190,255,0.45) 0%, transparent 55%)' }} />
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 100% 45% at 25% 105%, rgba(160,150,220,0.28) 0%, transparent 55%)' }} />
  </div>
);

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [username, setUsername]               = useState('');
  const [fullName, setFullName]               = useState('');
  const [phone, setPhone]                     = useState('');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors]         = useState({});
  const [isLoading, setIsLoading]   = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [focusedField, setFocusedField]     = useState(null);

  const validateEmail    = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone    = (v) => /^[0-9]{9,11}$/.test(v.replace(/\s/g, ''));
  const validatePassword = (v) => /[A-Z]/.test(v) && /[0-9]/.test(v) && v.length >= 8;

  const validateField = (fieldName, value) => {
    const errs = { ...errors };
    switch (fieldName) {
      case 'username':
        if (!value.trim())                          errs.username = t.register_username_required;
        else if (value.trim().length < 3)           errs.username = t.register_username_short;
        else if (!/^[a-zA-Z0-9_]+$/.test(value.trim())) errs.username = t.register_username_invalid;
        else {
          const users = getUsers();
          if (users.find(u => u.username === value.trim())) errs.username = t.register_username_taken;
          else delete errs.username;
        }
        break;
      case 'fullName':
        if (!value.trim())             errs.fullName = t.register_fullname_required;
        else if (value.trim().length < 2) errs.fullName = t.register_fullname_short;
        else delete errs.fullName;
        break;
      case 'phone':
        if (!value.trim())           errs.phone = t.register_phone_required;
        else if (!validatePhone(value)) errs.phone = t.register_phone_invalid;
        else delete errs.phone;
        break;
      case 'email':
        if (!value.trim())              errs.email = t.validation_email_required;
        else if (!validateEmail(value.trim())) errs.email = t.validation_email_invalid;
        else {
          const users = getUsers();
          if (users.find(u => u.email === value.trim())) errs.email = t.validation_email_exists;
          else delete errs.email;
        }
        break;
      case 'password':
        if (!value)                   errs.password = t.validation_password_required;
        else if (!validatePassword(value)) errs.password = t.validation_password_weak;
        else delete errs.password;
        break;
      case 'confirmPassword':
        if (!value)              errs.confirmPassword = t.validation_confirm_password_required;
        else if (value !== password) errs.confirmPassword = t.validation_passwords_not_match;
        else delete errs.confirmPassword;
        break;
      default: break;
    }
    setErrors(errs);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateField('password', e.target.value);
    if (confirmPassword) validateField('confirmPassword', confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateField('confirmPassword', e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const u = username.trim(), fn = fullName.trim(), ph = phone.trim();
    const em = email.trim(), pw = password.trim(), cp = confirmPassword.trim();
    const errs = {};

    if (!u) errs.username = t.register_username_required;
    else if (u.length < 3) errs.username = t.register_username_short;
    else if (!/^[a-zA-Z0-9_]+$/.test(u)) errs.username = t.register_username_invalid;
    else { const users = getUsers(); if (users.find(x => x.username === u)) errs.username = t.register_username_taken; }

    if (!fn) errs.fullName = t.register_fullname_required;
    else if (fn.length < 2) errs.fullName = t.register_fullname_short;

    if (!ph) errs.phone = t.register_phone_required;
    else if (!validatePhone(ph)) errs.phone = t.register_phone_invalid;

    if (!em) errs.email = t.validation_email_required;
    else if (!validateEmail(em)) errs.email = t.validation_email_invalid;
    else { const users = getUsers(); if (users.find(x => x.email === em)) errs.email = t.validation_email_exists; }

    if (!pw) errs.password = t.validation_password_required;
    else if (!validatePassword(pw)) errs.password = t.validation_password_weak;

    if (!cp) errs.confirmPassword = t.validation_confirm_password_required;
    else if (cp !== pw) errs.confirmPassword = t.validation_passwords_not_match;

    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsLoading(true);
    setTimeout(() => {
      const result = registerUser(u, fn, ph, em, pw);
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
    if (errors[field]) return 'var(--danger-border)';
    const validMap = {
      username:        username.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(username.trim()),
      fullName:        fullName.trim().length >= 2,
      phone:           phone.trim() && validatePhone(phone),
      email:           email.trim() && validateEmail(email.trim()),
      password:        password && validatePassword(password),
      confirmPassword: confirmPassword && confirmPassword === password,
    };
    if (validMap[field]) return 'var(--border-success)';
    return focusedField === field ? 'var(--border-focus)' : 'var(--border)';
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '15px 48px 15px 18px',
    fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text)',
    background: focusedField === field ? 'var(--input-bg-focus)' : 'var(--input-bg)',
    border: `1px solid ${getBorderColor(field)}`,
    borderRadius: '13px', outline: 'none',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(255,255,255,0.05)' : 'none',
    transition: 'all 0.2s ease', opacity: isLoading ? 0.6 : 1,
  });

  const fb = (isErr) => ({
    fontSize: '0.75rem', marginTop: '5px', marginLeft: '4px',
    color: isErr ? '#fca5a5' : '#86efac',
  });

  const IconSlot = ({ children }) => (
    <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
      {children}
    </span>
  );

  const cardBg     = isDark ? 'rgba(14,16,26,0.72)' : 'rgba(255,255,255,0.72)';
  const titleBarBg = isDark ? 'rgba(22,25,30,0.97)' : 'rgba(230,228,248,0.95)';
  const titleBarBorder = isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(100,90,160,0.12)';
  const cardShadow = isDark
    ? '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)'
    : '0 20px 60px rgba(80,70,140,0.18), 0 0 0 1px rgba(100,90,160,0.12)';

  return (
    <>
      {isDark ? <DarkBackground /> : <LightBackground />}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        minHeight: '100vh', padding: '24px 20px', fontFamily: 'var(--font-body)',
      }}>
        <div style={{
          width: '460px', maxWidth: '95vw',
          borderRadius: '14px', overflow: 'hidden',
          boxShadow: cardShadow,
          animation: 'cardIn 0.55s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          {/* Title bar */}
          <div style={{ height: '40px', background: titleBarBg, display: 'flex', alignItems: 'center', padding: '0 14px', gap: '8px', borderBottom: titleBarBorder }}>
            {[['#ff5f57'], ['#febc2e'], ['#28c840']].map(([color], i) => (
              <span key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: color, flexShrink: 0 }} />
            ))}
          </div>

          {/* Glass card */}
          <div style={{
            background: cardBg,
            backdropFilter: 'blur(26px) saturate(150%)',
            WebkitBackdropFilter: 'blur(26px) saturate(150%)',
            padding: '40px 44px 36px',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-body)', fontSize: '2rem', fontWeight: 700,
              color: 'var(--text)', textAlign: 'center', letterSpacing: '-0.02em', margin: '0 0 24px',
            }}>
              {t.register_title}
            </h1>

            {errors.general && (
              <div style={{
                color: 'var(--danger)', fontSize: '0.82rem', textAlign: 'center',
                padding: '10px 14px', marginBottom: '14px',
                background: 'var(--danger-dim)', border: '1px solid var(--danger-border)', borderRadius: '9px',
              }}>{errors.general}</div>
            )}
            {successMessage && (
              <div style={{
                color: '#86efac', fontSize: '0.82rem', textAlign: 'center',
                padding: '10px 14px', marginBottom: '14px',
                background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.28)', borderRadius: '9px',
              }}>{successMessage}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {/* Username */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input type="text" style={inputStyle('username')} value={username}
                    onChange={(e) => { setUsername(e.target.value); validateField('username', e.target.value); }}
                    onBlur={() => { setFocusedField(null); validateField('username', username); }}
                    onFocus={() => setFocusedField('username')}
                    placeholder={t.register_username_placeholder} disabled={isLoading} autoComplete="username" />
                  <IconSlot><IconUser /></IconSlot>
                </div>
                {errors.username && <div style={fb(true)}>❌ {errors.username}</div>}
                {!errors.username && username.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(username.trim()) && (
                  <div style={fb(false)}>✓ {t.register_username_valid}</div>
                )}
              </div>

              {/* Full Name */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input type="text" style={inputStyle('fullName')} value={fullName}
                    onChange={(e) => { setFullName(e.target.value); validateField('fullName', e.target.value); }}
                    onBlur={() => { setFocusedField(null); validateField('fullName', fullName); }}
                    onFocus={() => setFocusedField('fullName')}
                    placeholder={t.register_fullname_placeholder} disabled={isLoading} autoComplete="name" />
                  <IconSlot><IconCard /></IconSlot>
                </div>
                {errors.fullName && <div style={fb(true)}>❌ {errors.fullName}</div>}
                {!errors.fullName && fullName.trim().length >= 2 && (
                  <div style={fb(false)}>✓ {t.register_fullname_valid}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input type="tel" style={inputStyle('phone')} value={phone}
                    onChange={(e) => { setPhone(e.target.value); validateField('phone', e.target.value); }}
                    onBlur={() => { setFocusedField(null); validateField('phone', phone); }}
                    onFocus={() => setFocusedField('phone')}
                    placeholder={t.register_phone_placeholder} disabled={isLoading} autoComplete="tel" />
                  <IconSlot><IconPhone /></IconSlot>
                </div>
                {errors.phone && <div style={fb(true)}>❌ {errors.phone}</div>}
                {!errors.phone && phone.trim() && validatePhone(phone) && (
                  <div style={fb(false)}>✓ {t.register_phone_valid}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input type="email" style={inputStyle('email')} value={email}
                    onChange={(e) => { setEmail(e.target.value); validateField('email', e.target.value); }}
                    onBlur={() => { setFocusedField(null); validateField('email', email); }}
                    onFocus={() => setFocusedField('email')}
                    placeholder={t.register_email_placeholder} disabled={isLoading} autoComplete="email" />
                  <IconSlot><IconMail /></IconSlot>
                </div>
                {errors.email && <div style={fb(true)}>❌ {errors.email}</div>}
                {!errors.email && email.trim() && validateEmail(email.trim()) && (
                  <div style={fb(false)}>✓ {t.validation_email_valid}</div>
                )}
              </div>

              {/* Password */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} style={inputStyle('password')} value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => { setFocusedField(null); validateField('password', password); }}
                    onFocus={() => setFocusedField('password')}
                    placeholder={t.register_password_placeholder} disabled={isLoading} autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 0 }}>
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {errors.password && <div style={fb(true)}>❌ {errors.password}</div>}
                {!errors.password && password && validatePassword(password) && (
                  <div style={fb(false)}>✓ {t.validation_password_strong}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div style={{ position: 'relative' }}>
                  <input type={showConfirmPassword ? 'text' : 'password'} style={inputStyle('confirmPassword')} value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={() => { setFocusedField(null); validateField('confirmPassword', confirmPassword); }}
                    onFocus={() => setFocusedField('confirmPassword')}
                    placeholder={t.register_confirm_password_placeholder} disabled={isLoading} autoComplete="new-password" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 0 }}>
                    {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {errors.confirmPassword && <div style={fb(true)}>❌ {errors.confirmPassword}</div>}
                {!errors.confirmPassword && confirmPassword && confirmPassword === password && (
                  <div style={fb(false)}>✓ {t.validation_passwords_match}</div>
                )}
              </div>

              {/* Submit */}
              <button type="submit" disabled={isLoading}
                style={{
                  width: '100%', padding: '15px',
                  background: isLoading ? 'var(--border)' : 'var(--btn-solid-bg)',
                  color: isLoading ? 'var(--text-muted)' : 'var(--btn-solid-text)',
                  borderRadius: '13px',
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700,
                  cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '6px',
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
                    border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'rgba(255,255,255,0.85)',
                    animation: 'spin 0.8s linear infinite', display: 'inline-block',
                  }} />
                )}
                {isLoading ? t.register_processing : t.register_button}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {t.register_link_text}{' '}
              <button onClick={onSwitchToLogin} disabled={isLoading}
                style={{ background: 'none', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, padding: 0 }}>
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