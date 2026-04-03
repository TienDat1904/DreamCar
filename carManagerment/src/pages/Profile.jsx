import { useState } from 'react';
import { logoutUser } from '../services/localStorageService';
import { useLanguage } from '../services/LanguageContext';
import { useToast } from '../services/ToastContext';

const theme = {
  fontFamily: "'Sora', 'Segoe UI', sans-serif",
  bg: '#09090b',
  card: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.08)',
  text: '#f1f1f3',
  textMuted: '#71717a',
  accent: '#f59e0b',
  accentDim: 'rgba(245,158,11,0.12)',
  danger: '#ef4444',
  dangerDim: 'rgba(239,68,68,0.12)',
  dangerBorder: 'rgba(239,68,68,0.28)',
  radius: '14px',
};

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconCard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.64 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const IconLogout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

function Profile({ currentUser, onLogout }) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    if (!confirmLogout) { setConfirmLogout(true); return; }
    logoutUser();
    showToast(t.login_success ? t.nav_logout : 'Logged out', 'success');
    onLogout();
  };

  const getInitials = () => {
    const name = currentUser?.fullName || currentUser?.username || '';
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
  };

  // ✅ All labels now from translations
  const infoRows = [
    { icon: <IconUser />,  label: t.profile_username, value: currentUser?.username },
    { icon: <IconCard />,  label: t.profile_fullname, value: currentUser?.fullName },
    { icon: <IconPhone />, label: t.profile_phone,    value: currentUser?.phone },
    { icon: <IconMail />,  label: t.profile_email,    value: currentUser?.email },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      fontFamily: theme.fontFamily,
      padding: '60px 20px 80px',
      color: theme.text,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .profile-card { animation: fadeUp 0.45s ease both; }
        .profile-card:nth-child(2) { animation-delay: 0.08s; }
        .profile-card:nth-child(3) { animation-delay: 0.16s; }
        .info-row:hover { background: rgba(255,255,255,0.055) !important; }
        .logout-btn-main:hover { background: rgba(239,68,68,0.18) !important; border-color: rgba(239,68,68,0.5) !important; }
        .logout-btn-confirm:hover { background: #dc2626 !important; }
        .cancel-btn:hover { background: rgba(255,255,255,0.08) !important; }
      `}</style>

      <div style={{ maxWidth: '560px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── Avatar card ── */}
        <div className="profile-card" style={{
          background: theme.card,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: theme.radius,
          padding: '36px 32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '14px', textAlign: 'center',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.accent}, #ea580c)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', fontWeight: 700, color: '#0a0a0a',
            boxShadow: `0 0 0 4px ${theme.accentDim}, 0 12px 30px rgba(245,158,11,0.25)`,
          }}>
            {getInitials()}
          </div>

          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: theme.text, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              {currentUser?.fullName || currentUser?.username || '—'}
            </h1>
            <p style={{ fontSize: '0.82rem', color: theme.textMuted, margin: 0 }}>
              @{currentUser?.username}
            </p>
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 14px',
            background: theme.accentDim,
            border: `1px solid rgba(245,158,11,0.25)`,
            borderRadius: '999px',
            fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: theme.accent,
          }}>
            <IconShield />
            {t.profile_member_badge}
          </div>
        </div>

        {/* ── Info card ── */}
        <div className="profile-card" style={{
          background: theme.card,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: theme.radius,
          overflow: 'hidden',
        }}>
          <div style={{ padding: '18px 24px 12px', borderBottom: `1px solid ${theme.cardBorder}` }}>
            <h2 style={{
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: theme.textMuted, margin: 0,
            }}>
              {t.profile_info_section}
            </h2>
          </div>

          {infoRows.map(({ icon, label, value }, i) => (
            <div
              key={label}
              className="info-row"
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '16px 24px',
                borderBottom: i < infoRows.length - 1 ? `1px solid ${theme.cardBorder}` : 'none',
                transition: 'background 0.2s',
                cursor: 'default',
              }}
            >
              <span style={{ color: theme.accent, flexShrink: 0, display: 'flex' }}>{icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.7rem', color: theme.textMuted, marginBottom: '3px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {label}
                </div>
                <div style={{
                  fontSize: '0.92rem', fontWeight: 500,
                  color: value ? theme.text : theme.textMuted,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {value || t.profile_no_data}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Account/Logout card ── */}
        <div className="profile-card" style={{
          background: theme.card,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: theme.radius,
          padding: '24px',
        }}>
          <h2 style={{
            fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: theme.textMuted, margin: '0 0 16px',
          }}>
            {t.profile_account_section}
          </h2>

          {!confirmLogout ? (
            <button
              className="logout-btn-main"
              onClick={handleLogout}
              style={{
                width: '100%', padding: '13px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: theme.dangerDim, color: theme.danger,
                border: `1px solid ${theme.dangerBorder}`,
                borderRadius: '10px',
                fontFamily: theme.fontFamily, fontSize: '0.9rem', fontWeight: 600,
                cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              <IconLogout />
              {t.profile_logout_btn}
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontSize: '0.88rem', color: theme.textMuted, margin: '0 0 4px', textAlign: 'center' }}>
                {t.profile_logout_confirm}
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="cancel-btn"
                  onClick={() => setConfirmLogout(false)}
                  style={{
                    flex: 1, padding: '12px',
                    background: 'rgba(255,255,255,0.05)', color: theme.text,
                    border: `1px solid ${theme.cardBorder}`,
                    borderRadius: '10px',
                    fontFamily: theme.fontFamily, fontSize: '0.88rem', fontWeight: 500,
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                >
                  {t.profile_logout_cancel}
                </button>
                <button
                  className="logout-btn-confirm"
                  onClick={handleLogout}
                  style={{
                    flex: 1, padding: '12px',
                    background: theme.danger, color: '#fff',
                    border: 'none', borderRadius: '10px',
                    fontFamily: theme.fontFamily, fontSize: '0.88rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                >
                  {t.profile_logout_yes}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;