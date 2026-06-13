import React from 'react';
import TouchableOpacity from './ui/TouchableOpacity';
import { useNavigation } from '../context/NavigationContext';
import { useCourseProgress } from '../context/CourseProgressContext';

export function Header() {
  const { navigate, currentRoute } = useNavigation();
  const { resetProgress } = useCourseProgress();

  return (
    <header style={{
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderBottom: '1px solid #f1f5f9',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px 16px'
      }}>
        {/* Logo Clickable to navigate to home */}
        <TouchableOpacity 
          onPress={() => navigate('/')} 
          style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', minHeight: '44px' }}
        >
          <span className="material-symbols-outlined text-blue-600 font-bold" style={{ fontSize: '1.25rem' }}>
            school
          </span>
          <span style={{ fontWeight: 800, fontSize: 'clamp(0.85rem, 4.5vw, 1.125rem)', color: '#2563eb', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            Digital Marketing & AI
          </span>
        </TouchableOpacity>

        {/* Global actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <TouchableOpacity 
            onPress={resetProgress} 
            style={{ 
              fontSize: '0.6875rem', 
              fontWeight: 700, 
              color: '#64748b', 
              backgroundColor: '#f1f5f9', 
              padding: '0.5rem 0.875rem', 
              borderRadius: '9999px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.375rem',
              minHeight: '44px'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>refresh</span>
            RESET
          </TouchableOpacity>
        </div>
      </div>
    </header>
  );
}

export default Header;
