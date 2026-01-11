
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import { PrimaryButton } from '../components/UI';
import { dbService } from '../services/dbService';

interface AuthProps {
  onLogin: (email: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(email || 'demo@worksync.ai');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#09090b]">
      {/* Animated Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/20 blur-[120px] animate-pulse delay-700"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 orchid-gradient rounded-2xl items-center justify-center shadow-2xl shadow-violet-500/20 mb-4">
            <Sparkles className="text-white h-7 w-7" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">WorkSync <span className="orchid-text-gradient">AI</span></h1>
          <p className="text-zinc-500 font-medium">Enterprise Intelligence Workspace</p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Sign in to your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-violet-500 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2 tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-violet-500 transition-all placeholder:text-zinc-700"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-zinc-500 cursor-pointer">
                <input type="checkbox" className="rounded border-white/10 bg-white/5 text-violet-500 focus:ring-violet-500" />
                Remember me
              </label>
              <a href="#" className="text-violet-400 hover:text-violet-300 font-bold transition-colors">Forgot password?</a>
            </div>

            <PrimaryButton className="w-full py-3.5" loading={isLoading}>
              Enter Workspace <ArrowRight size={18} className="ml-1" />
            </PrimaryButton>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-zinc-500">
              New to WorkSync? <a href="#" className="text-violet-400 font-bold hover:text-violet-300 transition-colors">Create Enterprise Account</a>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-zinc-600 text-xs">
          © 2024 WorkSync AI Technologies. All rights reserved.
        </p>
      </div>
    </div>
  );
};
