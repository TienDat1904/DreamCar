import { useEffect } from 'react';

function ConfirmModal({ title, message, onConfirm, onCancel, confirmText, cancelText, isDanger = false }) {

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 2000, padding: '20px',
        animation: 'cmFadeIn 0.2s ease',
      }}
      onClick={onCancel}
    >
      <style>{`
        @keyframes cmFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes cmSlideUp { from{opacity:0;transform:scale(0.94) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .cm-cancel:hover { background: rgba(255,255,255,0.09) !important; color: #f1f1f3 !important; }
        .cm-confirm-danger:hover  { background: #dc2626 !important; }
        .cm-confirm-neutral:hover { background: #2563eb !important; }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#13131a',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.65)',
          width: '100%', maxWidth: '420px',
          padding: '32px 28px',
          animation: 'cmSlideUp 0.28s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.15rem', fontWeight: 700,
          color: '#f1f1f3', margin: '0 0 10px',
        }}>
          {title}
        </h3>

        {/* Message */}
        <p style={{
          fontSize: '0.88rem', color: '#71717a',
          lineHeight: 1.65, margin: '0 0 26px',
        }}>
          {message}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="cm-cancel"
            onClick={onCancel}
            style={{
              flex: 1, padding: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '999px',
              color: '#a1a1aa',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.88rem', fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {cancelText}
          </button>

          <button
            className={isDanger ? 'cm-confirm-danger' : 'cm-confirm-neutral'}
            onClick={onConfirm}
            style={{
              flex: 1, padding: '12px',
              background: isDanger ? '#ef4444' : '#3b82f6',
              border: 'none',
              borderRadius: '999px',
              color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.88rem', fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s',
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