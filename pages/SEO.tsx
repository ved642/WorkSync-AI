
import React, { useState, useEffect } from 'react';
import { GlassCard, Badge } from '../components/UI';
import { Globe, ArrowUpRight, ArrowDownRight, Search, Activity, SearchIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trafficData = [
  { date: '2024-01', traffic: 4000 },
  { date: '2024-02', traffic: 3000 },
  { date: '2024-03', traffic: 5000 },
  { date: '2024-04', traffic: 4500 },
  { date: '2024-05', traffic: 6000 },
  { date: '2024-06', traffic: 7500 },
];

export const SEOTracking: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Market Presence</h1>
          <p className="text-zinc-400 mt-1">Real-time SEO tracking and visibility metrics.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <Globe size={16} className="text-violet-400" />
          <span className="text-sm font-bold">worksync.ai</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="flex justify-between items-start">
            <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Visibility Score</p>
            <Activity size={18} className="text-violet-400" />
          </div>
          <h2 className="text-4xl font-black mt-4">84.2%</h2>
          <p className="text-emerald-400 text-xs mt-2 font-medium flex items-center">
            <ArrowUpRight size={14} className="mr-1" /> +4.2% since last month
          </p>
        </GlassCard>
        
        <GlassCard>
          <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Organic Traffic</p>
          <h2 className="text-4xl font-black mt-4">12.5k</h2>
          <p className="text-emerald-400 text-xs mt-2 font-medium flex items-center">
            <ArrowUpRight size={14} className="mr-1" /> +12% since last month
          </p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Avg. Position</p>
          <h2 className="text-4xl font-black mt-4">#3.8</h2>
          <p className="text-rose-400 text-xs mt-2 font-medium flex items-center">
            <ArrowDownRight size={14} className="mr-1" /> -0.2 positions
          </p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <h3 className="text-lg font-bold mb-8">Traffic Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} 
                  itemStyle={{ color: '#fafafa' }}
                />
                <Area type="monotone" dataKey="traffic" stroke="#d946ef" fillOpacity={1} fill="url(#colorTraffic)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Top Keywords</h3>
            <button className="text-violet-400 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { kw: 'ai task manager', pos: 1, volume: '2.4k' },
              { kw: 'enterprise employee tool', pos: 3, volume: '1.2k' },
              { kw: 'smart resource allocation', pos: 2, volume: '800' },
              { kw: 'ai strategy builder', pos: 5, volume: '4.5k' },
              { kw: 'workload tracking b2b', pos: 8, volume: '500' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-violet-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-black/40 flex items-center justify-center text-zinc-500 font-bold text-xs group-hover:text-violet-400">
                    #{item.pos}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.kw}</p>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">{item.volume} Monthly Search</p>
                  </div>
                </div>
                <SearchIcon size={14} className="text-zinc-600" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
