
import React from 'react';

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`glass rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group ${className}`}>
    {children}
  </div>
);

export const PrimaryButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string; 
  disabled?: boolean;
  loading?: boolean;
}> = ({ children, onClick, className = '', disabled, loading }) => (
  <button
    disabled={disabled || loading}
    onClick={onClick}
    className={`orchid-gradient px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
  >
    {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
    {children}
  </button>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'violet' | 'emerald' | 'rose' | 'amber' }> = ({ children, variant = 'violet' }) => {
  const variants = {
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
};
