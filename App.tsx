
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Tasks } from './pages/Tasks';
import { Reports } from './pages/Reports';
import { StrategyBuilder } from './pages/Strategy';
import { SEOTracking } from './pages/SEO';
import { Settings } from './pages/Settings';
import { dbService } from './services/dbService';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('ws_theme') || 'dark');

  useEffect(() => {
    dbService.init();
    const session = dbService.getSession();
    if (session) {
      setUser(session);
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ws_theme', theme);
  }, [theme]);

  const handleLogin = (email: string) => {
    const newUser = dbService.login(email);
    setUser(newUser);
  };

  const handleLogout = () => {
    dbService.logout();
    setUser(null);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-[#09090b] flex flex-col items-center justify-center">
        <div className="h-12 w-12 rounded-2xl orchid-gradient animate-pulse flex items-center justify-center shadow-2xl shadow-violet-500/40">
           <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
        </div>
        <p className="mt-4 text-zinc-500 font-medium tracking-widest text-[10px] uppercase animate-pulse">Initializing WorkSync Engine...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'tasks': return <Tasks />;
      case 'reports': return <Reports />;
      case 'strategy': return <StrategyBuilder />;
      case 'seo': return <SEOTracking />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout 
      activePage={activePage} 
      setPage={setActivePage} 
      theme={theme} 
      toggleTheme={toggleTheme}
      user={user}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
