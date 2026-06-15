import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CourseProgressProvider } from './context/CourseProgressContext';
import Header from './components/Header/Header';
import CurriculumOverview from './features/curriculum/components/CurriculumOverview';
import SectionPage from './features/curriculum/components/SectionPage';
import SuspenseLoader from './components/SuspenseLoader/SuspenseLoader';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './styles/global.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Avoid excessive retries
    },
  },
});

function AppContent() {
  const { currentRoute } = useNavigation();

  // Route matching resolver
  const renderPage = () => {
    if (currentRoute === '/') {
      return <CurriculumOverview />;
    }
    
    if (currentRoute.startsWith('/section-')) {
      const sectionId = currentRoute.substring(1); // e.g. "section-1"
      return <SectionPage sectionId={sectionId} />;
    }
    
    // Fallback to home
    return <CurriculumOverview />;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, paddingBottom: '5rem', width: '100%', boxSizing: 'border-box' }}>
        <ErrorBoundary>
          <Suspense fallback={<SuspenseLoader />}>
            {renderPage()}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <CourseProgressProvider>
          <AppContent />
        </CourseProgressProvider>
      </NavigationProvider>
    </QueryClientProvider>
  );
}

export default App;
