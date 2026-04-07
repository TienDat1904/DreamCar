import { useEffect } from 'react';
import { useToast } from '../services/ToastContext';

function Toast() {
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    if (document.querySelector('style[data-toast]')) return;
    const s = document.createElement('style');
    s.setAttribute('data-toast', 'true');
    s.textContent = `
      @keyframes toastIn {
        from { transform: translateX(110%); opacity: 0; }
        to   { transform: translateX(0);   opacity: 1; }
      }
      @keyframes toastShrink {
        from { width: 100%; }
        to   { width: 0%; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const ACCENT = {
    success: '#22c55e',
    error:   'var(--danger)',
    info:    '#3b82f6',
    warning: 'var(--accent)',
  };
  const ICON = { success: '✓', error: '✕', info: 'i', warning: '!' };

  return (
    <div style={{
      position: 'fixed', top: 20, right: 20,
      zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 10,
      pointerEvents: 'none',
    }}>
      {toasts.map((toast) => {
        const color = ACCENT[toast.type] || 'var(--text-muted)';
        return (
          <div key={toast.id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            minWidth: 280, maxWidth: 380,
            padding: '14px 16px',
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: `1px solid var(--border-hov)`,
            borderLeft: `3px solid ${color}`,
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            position: 'relative', overflow: 'hidden',
            animation: 'toastIn 0.3s cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: 'all',
          }}>
            {/* Icon */}
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              border: `1.5px solid ${color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color, fontSize: '0.7rem', fontWeight: 800, flexShrink: 0,
              opacity: 0.9,
            }}>
              {ICON[toast.type] || '•'}
            </div>

            {/* Message */}
            <span style={{
              flex: 1, fontSize: '0.85rem', fontWeight: 500,
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.4, wordBreak: 'break-word',
            }}>
              {toast.message}
            </span>

            {/* Close */}
            <button onClick={() => removeToast(toast.id)}
              style={{
                background: 'none', border: 'none',
                color: 'var(--text-muted)', cursor: 'pointer',
                fontSize: 18, lineHeight: 1,
                padding: '0 2px', flexShrink: 0,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >×</button>

            {/* Progress bar */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0,
              height: 2, background: color,
              animation: 'toastShrink 3s linear forwards',
              borderRadius: '0 0 0 var(--radius-md)',
            }} />
          </div>
        );
      })}
    </div>
  );
}

export default Toast;