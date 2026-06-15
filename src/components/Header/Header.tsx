import React, { useEffect, useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useCourseProgress } from '@/context/CourseProgressContext';

export const Header: React.FC = () => {
  const { navigate } = useNavigation();
  const { resetProgress } = useCourseProgress();
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header style={{
      backgroundColor: 'var(--glass-bg)',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '12px 24px'
      }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            display: 'flex',
            alignItems: 'center', 
            gap: '0.625rem', 
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <div style={{
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
              school
            </span>
          </div>
          <span style={{ 
            fontWeight: 800, 
            fontSize: 'clamp(1rem, 4.5vw, 1.25rem)', 
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            fontFamily: 'inherit'
          }}>
            Digital Marketing & AI
          </span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Switcher Button */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-light)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              transition: 'var(--transition-fast)'
            }}
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Reset progress */}
          <button 
            onClick={resetProgress} 
            style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: 'var(--text-secondary)', 
              backgroundColor: 'var(--bg-tertiary)', 
              border: '1px solid var(--border-light)',
              padding: '0.5rem 1rem', 
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              cursor: 'pointer',
              height: '40px',
              transition: 'var(--transition-fast)'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>refresh</span>
            RESET
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
