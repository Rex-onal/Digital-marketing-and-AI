import React from 'react';

export const SuspenseLoader: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '250px',
      width: '100%',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      <style>{`
        @keyframes spin-glow {
          0% {
            transform: rotate(0deg);
            border-top-color: var(--primary);
          }
          50% {
            border-top-color: var(--accent);
            box-shadow: 0 0 20px var(--accent-glow);
          }
          100% {
            transform: rotate(360deg);
            border-top-color: var(--primary);
          }
        }
      `}</style>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '3px solid var(--border-light)',
        borderTop: '3px solid var(--primary)',
        animation: 'spin-glow 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        marginBottom: '1.25rem'
      }} />
      <span style={{
        fontSize: '0.8125rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
      }}>
        Loading Learning Path...
      </span>
    </div>
  );
};

export default SuspenseLoader;
