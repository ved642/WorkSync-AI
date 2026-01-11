
import React from 'react';
import { GlassCard, PrimaryButton, Badge } from '../components/UI';
import { User, Bell, Shield, CreditCard, Laptop, Mail, Key } from 'lucide-react';

const SettingsItem: React.FC<{ icon: React.ReactNode; title: string; desc: string; active?: boolean }> = ({ icon, title, desc, active }) => (
  <div className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${active ? 'bg-violet-500/10 border border-violet-500/20' : 'hover:bg-white/5 border border-transparent'}`}>
    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${active ? 'bg-violet-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
      {icon}
    </div>
    <div>
      <h4 className={`text-sm font-bold ${active ? 'text-violet-100' : 'text-zinc-300'}`}>{title}</h4>
      <p className="text-xs text-zinc-500">{desc}</p>
    </div>
  </div>
);

export const Settings: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
        <p className="text-zinc-400 mt-1">Configure your workspace and enterprise preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <SettingsItem icon={<User size={18} />} title="My Profile" desc="Personal information" active />
          <SettingsItem icon={<Shield size={18} />} title="Security" desc="Auth and encryption" />
          <SettingsItem icon={<Bell size={18} />} title="Notifications" desc="System alerts" />
          <SettingsItem icon={<CreditCard size={18} />} title="Billing" desc="Plan and invoices" />
          <SettingsItem icon={<Laptop size={18} />} title="Integrations" desc="Connected services" />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <GlassCard>
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-zinc-800 border-2 border-violet-500/30 overflow-hidden">
                  <img src="https://picsum.photos/seed/admin/200/200" alt="Profile" />
                </div>
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-violet-600 border-4 border-[#09090b] flex items-center justify-center hover:scale-110 transition-transform">
                  <Laptop size={14} className="text-white" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold">Admin User</h3>
                <p className="text-zinc-500 text-sm">Managing Director @ WorkSync AI</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="violet">Administrator</Badge>
                  <Badge variant="emerald">Enterprise Plan</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block flex items-center gap-2">
                    <User size={12} /> Full Name
                  </span>
                  <input type="text" defaultValue="Alex Thompson" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block flex items-center gap-2">
                    <Mail size={12} /> Email Address
                  </span>
                  <input type="email" defaultValue="alex@worksync.ai" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500" />
                </label>
              </div>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block flex items-center gap-2">
                    <Key size={12} /> Current Password
                  </span>
                  <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500" />
                </label>
                <label className="block">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 block flex items-center gap-2">
                    <Key size={12} /> New Password
                  </span>
                  <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500" />
                </label>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex justify-end gap-3">
              <button className="px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/5 text-zinc-400 transition-all">Cancel</button>
              <PrimaryButton>Save Changes</PrimaryButton>
            </div>
          </GlassCard>

          <GlassCard className="border-rose-500/20">
            <h3 className="text-lg font-bold text-rose-400 mb-2">Danger Zone</h3>
            <p className="text-sm text-zinc-500 mb-6">Irreversible actions that affect your company data.</p>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-rose-500/5 rounded-xl border border-rose-500/10">
              <div>
                <p className="text-sm font-bold">Purge Company History</p>
                <p className="text-xs text-rose-500/60">This will delete all previous AI reports and strategy canvas data.</p>
              </div>
              <button className="px-4 py-2 bg-rose-500 text-white rounded-lg text-xs font-bold hover:bg-rose-600 transition-colors">Purge Data</button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
