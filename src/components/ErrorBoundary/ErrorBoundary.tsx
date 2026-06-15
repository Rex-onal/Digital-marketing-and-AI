import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          padding: '2rem',
          textAlign: 'center',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--error-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          margin: '2rem auto',
          maxWidth: '500px'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--error)', marginBottom: '1rem' }}>
            error
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            An unexpected error occurred while loading this section.
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              minHeight: '44px',
              transition: 'var(--transition-fast)'
            }}
          >
            TRY AGAIN
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
