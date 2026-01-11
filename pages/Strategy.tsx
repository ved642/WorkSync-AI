
import React, { useState, useEffect } from 'react';
import { GlassCard, PrimaryButton, Badge } from '../components/UI';
import { Target, Sparkles, Wand2, Lightbulb, Save } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { Strategy } from '../types';

export const StrategyBuilder: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStrategies(dbService.getStrategies());
  }, []);

  const handleGenerate = async () => {
    if (!goal) return;
    setLoading(true);
    try {
      const data = await geminiService.generateStrategy(goal);
      const newStrategy: Strategy = {
        id: `strat-${Date.now()}`,
        title: data.title || 'Untitled Strategy',
        content: data.content || '',
        updatedAt: new Date().toISOString()
      };
      dbService.addStrategy(newStrategy);
      setStrategies([newStrategy, ...strategies]);
      setGoal('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Strategy Canvas</h1>
          <p className="text-zinc-400 mt-1">Design long-term competitive roadmaps.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="sticky top-24 border-violet-500/20 shadow-xl shadow-violet-500/5">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="text-amber-400" size={20} />
              New Objective
            </h3>
            <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
              Describe your current business goal or market challenge to generate an AI-driven strategic framework.
            </p>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Increase market share in the B2B SaaS space for healthcare by 15% within 12 months."
              className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500 transition-colors mb-4 placeholder:text-zinc-700"
            />
            <PrimaryButton 
              className="w-full" 
              onClick={handleGenerate} 
              loading={loading}
              disabled={!goal}
            >
              <Wand2 size={16} />
              Formulate Strategy
            </PrimaryButton>
          </GlassCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {strategies.length === 0 ? (
            <div className="h-64 flex flex-center justify-center items-center border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-zinc-600 font-medium">No strategic frameworks created yet.</p>
            </div>
          ) : (
            strategies.map((strat) => (
              <GlassCard key={strat.id} className="relative">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                      <Target size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{strat.title}</h3>
                      <p className="text-xs text-zinc-500">Updated {new Date(strat.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-400">
                      <Save size={18} />
                    </button>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none prose-sm">
                  {strat.content.split('\n').map((line, i) => (
                    <p key={i} className="text-zinc-300 leading-relaxed mb-4">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <Badge variant="emerald">Approved</Badge>
                  <Badge variant="violet">High Priority</Badge>
                  <Badge variant="amber">2024 Focus</Badge>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
