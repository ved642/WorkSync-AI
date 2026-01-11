
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  FileText, 
  Target, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  Bell,
  Search,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { User } from '../types';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-3 my-1 rounded-xl transition-all duration-200 group ${
      active 
      ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-violet-600 dark:text-violet-400 border border-violet-500/10 dark:border-white/5' 
      : 'text-zinc-500 hover:text-violet-500 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5'
    }`}
  >
    <span className={`${active ? 'text-violet-500 dark:text-violet-400' : 'group-hover:text-violet-500'} transition-colors`}>
      {icon}
    </span>
    {!collapsed && <span className="ml-3 font-medium text-sm">{label}</span>}
  </button>
);

const Sidebar: React.FC<{ activePage: string; setPage: (p: string) => void; collapsed: boolean; onLogout: () => void }> = ({ activePage, setPage, collapsed, onLogout }) => {
  return (
    <div className={`h-screen sticky top-0 bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-white/5 transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-6 flex items-center">
        <div className="h-8 w-8 orchid-gradient rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Sparkles className="text-white h-5 w-5" />
        </div>
        {!collapsed && <span className="ml-3 font-bold text-lg tracking-tight text-zinc-900 dark:text-white">WorkSync<span className="orchid-text-gradient">AI</span></span>}
      </div>

      <nav className="flex-1 px-4 mt-4 overflow-y-auto">
        <SidebarItem collapsed={collapsed} icon={<LayoutDashboard size={20} />} label="Dashboard" active={activePage === 'dashboard'} onClick={() => setPage('dashboard')} />
        <SidebarItem collapsed={collapsed} icon={<Users size={20} />} label="Employees" active={activePage === 'employees'} onClick={() => setPage('employees')} />
        <SidebarItem collapsed={collapsed} icon={<CheckSquare size={20} />} label="Tasks" active={activePage === 'tasks'} onClick={() => setPage('tasks')} />
        <SidebarItem collapsed={collapsed} icon={<FileText size={20} />} label="AI Reports" active={activePage === 'reports'} onClick={() => setPage('reports')} />
        <SidebarItem collapsed={collapsed} icon={<Target size={20} />} label="Strategy" active={activePage === 'strategy'} onClick={() => setPage('strategy')} />
        <SidebarItem collapsed={collapsed} icon={<BarChart3 size={20} />} label="SEO Tracking" active={activePage === 'seo'} onClick={() => setPage('seo')} />
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-white/5">
        <SidebarItem collapsed={collapsed} icon={<Settings size={20} />} label="Settings" active={activePage === 'settings'} onClick={() => setPage('settings')} />
        <SidebarItem collapsed={collapsed} icon={<LogOut size={20} />} label="Logout" onClick={onLogout} />
      </div>
    </div>
  );
};

const Topbar: React.FC<{ onMenuToggle: () => void; theme: string; toggleTheme: () => void; user: User }> = ({ onMenuToggle, theme, toggleTheme, user }) => (
  <div className="h-16 flex items-center justify-between px-8 bg-white/50 dark:bg-[#09090b]/50 backdrop-blur-xl sticky top-0 z-30 border-b border-zinc-200 dark:border-white/5">
    <div className="flex items-center gap-4">
      <button onClick={onMenuToggle} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg text-zinc-400">
        <Menu size={20} />
      </button>
      <div className="hidden md:flex items-center bg-zinc-100 dark:bg-white/5 rounded-full px-4 py-1.5 border border-zinc-200 dark:border-white/10 w-64">
        <Search size={16} className="text-zinc-500" />
        <input 
          type="text" 
          placeholder="Search performance..." 
          className="bg-transparent border-none outline-none text-sm ml-2 text-zinc-900 dark:text-zinc-300 w-full" 
        />
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button onClick={toggleTheme} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full text-zinc-400 transition-all active:scale-90">
        {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-violet-600" />}
      </button>
      <button className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full text-zinc-400 relative">
        <Bell size={20} />
        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-violet-500 rounded-full border border-white dark:border-[#09090b]"></span>
      </button>
      <div className="flex items-center gap-3 pl-2">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">{user.name}</p>
          <p className="text-[10px] text-zinc-500 font-medium">{user.role}</p>
        </div>
        <div className="h-8 w-8 rounded-full border border-zinc-200 dark:border-white/10 overflow-hidden cursor-pointer hover:border-violet-500/50 transition-colors">
          <img src={user.avatar} alt="Avatar" />
        </div>
      </div>
    </div>
  </div>
);

export const Layout: React.FC<{ 
  children: React.ReactNode; 
  activePage: string; 
  setPage: (p: string) => void;
  theme: string;
  toggleTheme: () => void;
  user: User;
  onLogout: () => void;
}> = ({ children, activePage, setPage, theme, toggleTheme, user, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-white transition-colors duration-300">
      <Sidebar activePage={activePage} setPage={setPage} collapsed={collapsed} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuToggle={() => setCollapsed(!collapsed)} theme={theme} toggleTheme={toggleTheme} user={user} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
