import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { CourseProgressProvider } from './context/CourseProgressContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SectionPage from './pages/SectionPage';
import './styles/global.css';

function AppContent() {
  const { currentRoute } = useNavigation();

  // Page Routing Router
  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <Dashboard />;
      case '/section-1':
        return <SectionPage sectionId="section-1" />;
      case '/section-2':
        return <SectionPage sectionId="section-2" />;
      case '/section-3':
        return <SectionPage sectionId="section-3" />;
      case '/section-4':
        return <SectionPage sectionId="section-4" />;
      case '/section-5':
        return <SectionPage sectionId="section-5" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      <Header />
      <main style={{ flex: 1, paddingBottom: '5rem' }}>
        {renderPage()}
      </main>
    </div>
  );
}

export function App() {
  return (
    <NavigationProvider>
      <CourseProgressProvider>
        <AppContent />
      </CourseProgressProvider>
    </NavigationProvider>
  );
}

export default App;
