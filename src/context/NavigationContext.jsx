import React, { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  // Try to read initial path from browser history on load, otherwise fallback to '/'
  const getInitialRoute = () => {
    if (typeof window !== 'undefined' && window.location) {
      const path = window.location.pathname;
      return path === '/' ? '/' : path;
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Handle browser back/forward buttons
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({}, '', route);
    }
  };

  const goBack = () => {
    // Basic back navigation fallback
    if (currentRoute.startsWith('/section-')) {
      navigate('/');
    } else {
      if (typeof window !== 'undefined' && window.history) {
        window.history.back();
      }
    }
  };

  const value = {
    currentRoute,
    navigate,
    goBack
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
