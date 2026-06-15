import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface NavigationContextType {
  currentRoute: string;
  navigate: (route: string) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const getInitialRoute = (): string => {
    if (typeof window !== 'undefined' && window.location) {
      const path = window.location.pathname;
      return path === '/' ? '/' : path;
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState({}, '', route);
    }
  };

  const goBack = () => {
    if (currentRoute.startsWith('/section-')) {
      navigate('/');
    } else {
      if (typeof window !== 'undefined' && window.history) {
        window.history.back();
      }
    }
  };

  const value: NavigationContextType = {
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
