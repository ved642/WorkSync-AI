
import React from 'react';
import { GlassCard, Badge } from '../components/UI';
import { Users, CheckSquare, Activity, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', tasks: 40, performance: 24 },
  { name: 'Tue', tasks: 30, performance: 13 },
  { name: 'Wed', tasks: 20, performance: 98 },
  { name: 'Thu', tasks: 27, performance: 39 },
  { name: 'Fri', tasks: 18, performance: 48 },
  { name: 'Sat', tasks: 23, performance: 38 },
  { name: 'Sun', tasks: 34, performance: 43 },
];

const StatBox: React.FC<{ label: string; value: string; trend: string; icon: React.ReactNode }> = ({ label, value, trend, icon }) => (
  <GlassCard className="flex items-center justify-between">
    <div>
      <p className="text-zinc-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
      <p className="text-emerald-400 text-xs mt-1 font-medium flex items-center">
        <TrendingUp size={12} className="mr-1" /> {trend}
      </p>
    </div>
    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-violet-400 border border-white/5">
      {icon}
    </div>
  </GlassCard>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Enterprise Overview</h1>
        <p className="text-zinc-400 mt-1">AI-powered insights for your distributed team.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox label="Total Employees" value="128" trend="+12% this month" icon={<Users size={24} />} />
        <StatBox label="Active Tasks" value="482" trend="+5.4% vs last week" icon={<CheckSquare size={24} />} />
        <StatBox label="Team Efficiency" value="94.2%" trend="+2.1%" icon={<Activity size={24} />} />
        <StatBox label="Revenue / Head" value="$12.4k" trend="+8.2%" icon={<TrendingUp size={24} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Performance Analytics</h3>
            <div className="flex gap-2">
              <Badge variant="violet">Tasks</Badge>
              <Badge variant="emerald">Efficiency</Badge>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} 
                  itemStyle={{ color: '#fafafa' }}
                />
                <Area type="monotone" dataKey="tasks" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTasks)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-zinc-800 border border-white/5 overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="Activity" />
                </div>
                <div>
                  <p className="text-sm font-medium">Marcus assigned a new task</p>
                  <p className="text-xs text-zinc-500">2 hours ago • Engineering Team</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
            View all logs
          </button>
        </GlassCard>
      </div>
    </div>
  );
};
