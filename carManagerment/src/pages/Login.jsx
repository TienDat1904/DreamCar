import { useState } from 'react';
import { loginUser } from '../services/localStorageService';
import { useLanguage } from '../services/LanguageContext';
import { useToast } from '../services/ToastContext';

/* ─── Design tokens ─── */
const theme = {
  fontFamily: "'Sora', 'Segoe UI', sans-serif",
  cardBg: 'rgba(16, 20, 28, 0.70)',
  border: 'rgba(255,255,255,0.10)',
  borderFocus: 'rgba(255,255,255,0.38)',
  inputBg: 'rgba(255,255,255,0.055)',
  inputBgFocus: 'rgba(255,255,255,0.095)',
  text: '#e8eaed',
  textMuted: 'rgba(232,234,237,0.42)',
  btnBg: '#ffffff',
  btnText: '#0d1117',
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
      * { box-sizing: border-box; }
    `}</style>
  </div>
);

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError(t.validation_username_required || 'Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    const result = loginUser(username.trim(), password);
    if (result.success) {
      showToast(t.login_success, 'success');
      onLoginSuccess();
    } else {
      setError(result.message);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '15px 48px 15px 18px',
    fontFamily: theme.fontFamily,
    fontSize: '0.88rem',
    color: theme.text,
    background: focusedField === field ? theme.inputBgFocus : theme.inputBg,
    border: `1px solid ${focusedField === field ? theme.borderFocus : theme.border}`,
    borderRadius: theme.radius,
    outline: 'none',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(255,255,255,0.06)' : 'none',
    transition: 'all 0.2s ease',
  });

  return (
    <>
      <BackgroundScene />
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        minHeight: '100vh', padding: '20px', fontFamily: theme.fontFamily,
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
              fontFamily: theme.fontFamily,
              fontSize: '2rem', fontWeight: 700,
              color: theme.text, textAlign: 'center',
              letterSpacing: '-0.02em', margin: '0 0 30px',
            }}>
              {t.login_title}
            </h1>

            {error && (
              <div style={{
                color: '#fca5a5', fontSize: '0.82rem', textAlign: 'center',
                padding: '10px 14px', marginBottom: '18px',
                background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: '9px',
              }}>{error}</div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Username */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  style={inputStyle('username')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t.login_username_placeholder || 'Tên đăng nhập'}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="username"
                />
                <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }}>
                  <IconUser />
                </span>
              </div>

              {/* Password */}
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={inputStyle('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login_password_placeholder || 'Mật khẩu'}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: theme.textMuted, display: 'flex', alignItems: 'center', padding: 0,
                  }}
                >
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>

              {/* Remember / Forgot */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  color: theme.textMuted, fontSize: '0.8rem', cursor: 'pointer',
                }}>
                  <input type="checkbox" style={{ accentColor: '#fff', width: 14, height: 14 }} />
                  {t.login_remember_me || 'Ghi nhớ tôi'}
                </label>
                <button type="button" style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: theme.textMuted, fontSize: '0.8rem', fontFamily: theme.fontFamily,
                }}>
                  {t.login_forgot_password || 'Quên mật khẩu?'}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: '100%', padding: '15px',
                  background: theme.btnBg, color: theme.btnText,
                  border: 'none', borderRadius: theme.radiusBtn,
                  fontFamily: theme.fontFamily, fontSize: '0.9rem', fontWeight: 700,
                  cursor: 'pointer', marginTop: '4px',
                  boxShadow: '0 4px 20px rgba(255,255,255,0.14)',
                  transition: 'transform 0.15s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,255,255,0.14)'; }}
              >
                {t.login_button}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.82rem', color: theme.textMuted }}>
              {t.login_link_text}{' '}
              <button
                onClick={onSwitchToRegister}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: theme.text, fontFamily: theme.fontFamily,
                  fontSize: '0.82rem', fontWeight: 700, padding: 0,
                }}
              >
                {t.login_link_button}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;