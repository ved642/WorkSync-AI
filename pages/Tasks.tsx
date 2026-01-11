
import React, { useState, useEffect } from 'react';
import { GlassCard, Badge, PrimaryButton } from '../components/UI';
import { dbService } from '../services/dbService';
import { geminiService } from '../services/geminiService';
import { Task, Employee } from '../types';
import { Plus, Sparkles, Clock, X } from 'lucide-react';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAssigning, setIsAssigning] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as Task['priority'],
    assignedToId: '',
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const loadedTasks = dbService.getTasks();
    const loadedEmployees = dbService.getEmployees();
    setTasks(loadedTasks);
    setEmployees(loadedEmployees);
    if (loadedEmployees.length > 0) {
      setNewTask(prev => ({...prev, assignedToId: loadedEmployees[0].id}));
    }
  }, []);

  const handleAISuggest = async (task: Task) => {
    setIsAssigning(task.id);
    try {
      const suggestion = await geminiService.suggestTaskAssignment(task, employees);
      const emp = employees.find(e => e.id === suggestion.employeeId);
      if (emp) {
        alert(`AI Suggestion: Assign to ${emp.name}.\n\nReason: ${suggestion.reasoning}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAssigning(null);
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignedToId) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      status: 'TODO',
      priority: newTask.priority,
      assignedToId: newTask.assignedToId,
      dueDate: newTask.dueDate,
      skillsRequired: [] // Could be extracted with AI
    };

    dbService.addTask(task);
    setTasks(prev => [...prev, task]);
    setIsModalOpen(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'MEDIUM',
      assignedToId: employees[0]?.id || '',
      dueDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Task Engine</h1>
          <p className="text-zinc-400 mt-1">Smart workload distribution and skill matching.</p>
        </div>
        <PrimaryButton onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Create Task
        </PrimaryButton>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-zinc-200 dark:border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create New Task</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Task Title</label>
                <input 
                  required
                  type="text" 
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Description</label>
                <textarea 
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                  className="w-full h-24 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={e => setNewTask({...newTask, priority: e.target.value as Task['priority']})}
                    className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={newTask.dueDate}
                    onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Assigned To</label>
                <select 
                  value={newTask.assignedToId}
                  onChange={e => setNewTask({...newTask, assignedToId: e.target.value})}
                  className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                  ))}
                </select>
              </div>
              <PrimaryButton className="w-full py-3 mt-4" disabled={!newTask.title || !newTask.assignedToId}>
                Initialize Task
              </PrimaryButton>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'].map((status) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{status.replace('_', ' ')}</h4>
              <Badge variant="violet">{tasks.filter(t => t.status === status).length}</Badge>
            </div>
            
            <div className="space-y-4 min-h-[400px]">
              {tasks.filter(t => t.status === status).map((task) => (
                <GlassCard key={task.id} className="p-4 cursor-grab active:cursor-grabbing hover:translate-y-[-4px] transition-all">
                  <div className="flex justify-between mb-3">
                    <Badge variant={task.priority === 'HIGH' ? 'rose' : 'amber'}>{task.priority}</Badge>
                    <div className="flex -space-x-2">
                      <div className="h-6 w-6 rounded-full border border-zinc-200 dark:border-black bg-zinc-800 overflow-hidden">
                        <img src={employees.find(e => e.id === task.assignedToId)?.avatar} alt="Avatar" />
                      </div>
                    </div>
                  </div>
                  <h5 className="font-bold text-sm mb-1">{task.title}</h5>
                  <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed">{task.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-white/5">
                    <div className="flex items-center text-[10px] text-zinc-500">
                      <Clock size={12} className="mr-1" />
                      {task.dueDate}
                    </div>
                    <button 
                      onClick={() => handleAISuggest(task)}
                      className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors"
                      title="AI Assignment Check"
                    >
                      {isAssigning === task.id ? <div className="animate-spin border-b-2 border-violet-400 w-3 h-3 rounded-full" /> : <Sparkles size={14} />}
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
