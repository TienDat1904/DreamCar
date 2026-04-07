import { useEffect } from 'react';

function ConfirmModal({ title, message, onConfirm, onCancel, confirmText, cancelText, isDanger = false }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 2000, padding: '20px',
      }}
      onClick={onCancel}
    >
      <style>{`
        @keyframes cmIn { from{opacity:0;transform:scale(0.94) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .cm-cancel:hover  { background: var(--bg-card-hov) !important; color: var(--text) !important; }
        .cm-confirm:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--border-hov)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          width: '100%', maxWidth: '420px',
          padding: '32px 28px',
          animation: 'cmIn 0.28s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.15rem', fontWeight: 700,
          color: 'var(--text)', margin: '0 0 10px',
        }}>{title}</h3>

        <p style={{
          fontSize: '0.88rem', color: 'var(--text-muted)',
          lineHeight: 1.65, margin: '0 0 26px',
        }}>{message}</p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="cm-cancel" onClick={onCancel}
            style={{
              flex: 1, padding: '12px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-pill)',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem', fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
          >{cancelText}</button>

          <button className="cm-confirm" onClick={onConfirm}
            style={{
              flex: 1, padding: '12px',
              background: isDanger ? 'var(--danger)' : 'var(--accent)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem', fontWeight: 700,
              cursor: 'pointer',
              transition: 'opacity 0.2s, transform 0.15s',
            }}
          >{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;