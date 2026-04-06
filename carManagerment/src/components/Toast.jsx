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

  const accent = { success: '#22c55e', error: '#ef4444', info: '#3b82f6', warning: '#f59e0b' };
  const icon   = { success: '✓', error: '✕', info: 'i', warning: '!' };

  return (
    <div style={{
      position: 'fixed', top: 20, right: 20,
      zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 10,
      pointerEvents: 'none',
    }}>
      {toasts.map((toast) => {
        const color = accent[toast.type] || '#71717a';
        return (
          <div
            key={toast.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              minWidth: 280, maxWidth: 380,
              padding: '14px 16px',
              background: '#18181c',
              border: `1px solid rgba(255,255,255,0.1)`,
              borderLeft: `3px solid ${color}`,
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              position: 'relative', overflow: 'hidden',
              animation: 'toastIn 0.3s cubic-bezier(0.22,1,0.36,1)',
              pointerEvents: 'all',
            }}
          >
            {/* Icon */}
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: `${color}22`,
              border: `1.5px solid ${color}55`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color, fontSize: '0.7rem', fontWeight: 800,
              flexShrink: 0,
            }}>
              {icon[toast.type] || '•'}
            </div>

            {/* Message */}
            <span style={{
              flex: 1, fontSize: '0.85rem', fontWeight: 500,
              color: '#e4e4e7', fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.4, wordBreak: 'break-word',
            }}>
              {toast.message}
            </span>

            {/* Close */}
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none', border: 'none',
                color: '#52525b', cursor: 'pointer',
                fontSize: 18, lineHeight: 1,
                padding: '0 2px', flexShrink: 0,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#a1a1aa'}
              onMouseLeave={e => e.currentTarget.style.color = '#52525b'}
            >
              ×
            </button>

            {/* Progress bar */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0,
              height: 2, background: color,
              animation: 'toastShrink 3s linear forwards',
              borderRadius: '0 0 0 12px',
            }} />
          </div>
        );
      })}
    </div>
  );
}

export default Toast;