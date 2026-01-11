
import React, { useState, useEffect } from 'react';
import { GlassCard, PrimaryButton, Badge } from '../components/UI';
import { FileText, Sparkles, Download, ArrowRight, Zap } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { dbService } from '../services/dbService';
import { AIReport } from '../types';

export const Reports: React.FC = () => {
  const [reports, setReports] = useState<AIReport[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setReports(dbService.getReports());
  }, []);

  const generateNewReport = async () => {
    setGenerating(true);
    try {
      const emps = dbService.getEmployees();
      const tasks = dbService.getTasks();
      const reportData = await geminiService.generateWeeklyReport(emps, tasks);
      const newReport: AIReport = {
        id: `rep-${Date.now()}`,
        generatedAt: new Date().toISOString().split('T')[0],
        summary: reportData.summary || '',
        keyInsights: reportData.keyInsights || [],
        recommendations: reportData.recommendations || []
      };
      dbService.addReport(newReport);
      setReports([newReport, ...reports]);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Insights</h1>
          <p className="text-zinc-400 mt-1">Strategic automated reporting for leadership.</p>
        </div>
        <PrimaryButton onClick={generateNewReport} loading={generating}>
          <Sparkles size={18} />
          Generate Weekly Audit
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {reports.length === 0 ? (
          <GlassCard className="text-center py-20 flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-zinc-500">
              <FileText size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">No reports generated yet</h3>
            <p className="text-zinc-500 max-w-sm">Use the AI engine to generate your first weekly organizational health audit.</p>
          </GlassCard>
        ) : (
          reports.map((report) => (
            <GlassCard key={report.id} className="relative group">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-8 w-8 rounded-lg orchid-gradient flex items-center justify-center text-white">
                        <Zap size={16} />
                      </div>
                      <Badge variant="violet">Weekly Audit</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Audit Report</h3>
                    <p className="text-sm text-zinc-500 flex items-center mb-6">
                      <Clock size={14} className="mr-1" /> Generated {report.generatedAt}
                    </p>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">
                      &quot;{report.summary}&quot;
                    </p>
                  </div>
                  <button className="flex items-center text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors">
                    Download PDF <Download size={14} className="ml-2" />
                  </button>
                </div>
                
                <div className="flex-1 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Critical Insights</h4>
                    <div className="space-y-3">
                      {report.keyInsights.map((insight, idx) => (
                        <div key={idx} className="flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                          <div className="h-5 w-5 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-[10px] font-bold mt-0.5">
                            {idx + 1}
                          </div>
                          <p className="text-sm text-zinc-300">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Action Plan</h4>
                    <div className="space-y-2">
                      {report.recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-center text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                          <ArrowRight size={14} className="mr-2 text-violet-500" />
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
};

const Clock: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
