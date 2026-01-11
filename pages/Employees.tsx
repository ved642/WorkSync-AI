
import React, { useState, useEffect } from 'react';
import { GlassCard, Badge, PrimaryButton } from '../components/UI';
import { dbService } from '../services/dbService';
import { Employee } from '../types';
import { UserPlus, Search, MoreVertical, X } from 'lucide-react';

export const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    skills: ''
  });

  useEffect(() => {
    setEmployees(dbService.getEmployees());
  }, []);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email) return;

    const employee: Employee = {
      id: `emp-${Date.now()}`,
      userId: `user-${Date.now()}`,
      name: newEmployee.name,
      email: newEmployee.email,
      department: newEmployee.department,
      skills: newEmployee.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
      workload: 0,
      performance: 100,
      avatar: `https://picsum.photos/seed/${newEmployee.name}/100/100`
    };

    dbService.addEmployee(employee);
    setEmployees(prev => [...prev, employee]);
    setIsModalOpen(false);
    setNewEmployee({ name: '', email: '', department: 'Engineering', skills: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Personnel</h1>
          <p className="text-zinc-400 mt-1">Manage talent, skills, and organizational health.</p>
        </div>
        <PrimaryButton onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} />
          Add Employee
        </PrimaryButton>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-zinc-200 dark:border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">New Employee</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={newEmployee.name}
                  onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}
                  className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Email</label>
                <input 
                  required
                  type="email" 
                  value={newEmployee.email}
                  onChange={e => setNewEmployee({...newEmployee, email: e.target.value})}
                  className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Department</label>
                <select 
                  value={newEmployee.department}
                  onChange={e => setNewEmployee({...newEmployee, department: e.target.value})}
                  className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                >
                  <option>Engineering</option>
                  <option>Data Science</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Skills (Comma separated)</label>
                <input 
                  type="text" 
                  placeholder="React, AWS, Python"
                  value={newEmployee.skills}
                  onChange={e => setNewEmployee({...newEmployee, skills: e.target.value})}
                  className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <PrimaryButton className="w-full py-3 mt-4" disabled={!newEmployee.name || !newEmployee.email}>
                Add Personnel
              </PrimaryButton>
            </form>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 bg-zinc-100 dark:bg-white/5 p-4 rounded-2xl border border-zinc-200 dark:border-white/5">
        <div className="flex-1 flex items-center px-4 bg-white dark:bg-black/20 rounded-xl border border-zinc-200 dark:border-white/10">
          <Search size={18} className="text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search by name, skill, or department..." 
            className="w-full bg-transparent p-3 outline-none text-sm text-zinc-900 dark:text-zinc-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <GlassCard key={emp.id} className="relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4 items-center">
                <div className="h-14 w-14 rounded-2xl border-2 border-violet-500/20 overflow-hidden">
                  <img src={emp.avatar} alt={emp.name} className="object-cover h-full w-full" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{emp.name}</h3>
                  <p className="text-xs text-violet-400 font-medium">{emp.department}</p>
                </div>
              </div>
              <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {emp.skills.map(skill => (
                    <Badge key={skill} variant="amber">{skill}</Badge>
                  ))}
                  {emp.skills.length === 0 && <span className="text-xs text-zinc-400 italic">No skills listed</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-white/5">
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Current Workload</p>
                  <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-violet-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${emp.workload}%` }}
                    />
                  </div>
                  <p className="text-xs mt-1 font-semibold">{emp.workload}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Performance</p>
                  <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${emp.performance}%` }}
                    />
                  </div>
                  <p className="text-xs mt-1 font-semibold">{emp.performance}%</p>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
