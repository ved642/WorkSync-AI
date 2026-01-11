
import { User, Employee, Task, AIReport, Strategy, SEOData, UserRole } from '../types';

const STORAGE_KEYS = {
  USERS: 'ws_users',
  EMPLOYEES: 'ws_employees',
  TASKS: 'ws_tasks',
  REPORTS: 'ws_reports',
  STRATEGIES: 'ws_strategies',
  SEO: 'ws_seo',
  AUTH: 'ws_session'
};

const defaultEmployees: Employee[] = [
  {
    id: 'emp-1',
    userId: 'user-1',
    name: 'Sarah Chen',
    email: 'sarah@worksync.ai',
    skills: ['React', 'TypeScript', 'Node.js', 'UI/UX'],
    workload: 65,
    performance: 92,
    department: 'Engineering',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 'emp-2',
    userId: 'user-2',
    name: 'Marcus Thorne',
    email: 'marcus@worksync.ai',
    skills: ['Python', 'Data Science', 'SQL', 'AWS'],
    workload: 40,
    performance: 88,
    department: 'Data',
    avatar: 'https://picsum.photos/seed/marcus/100/100'
  },
  {
    id: 'emp-3',
    userId: 'user-3',
    name: 'Elena Rodriguez',
    email: 'elena@worksync.ai',
    skills: ['Marketing', 'SEO', 'Content Strategy'],
    workload: 85,
    performance: 95,
    department: 'Marketing',
    avatar: 'https://picsum.photos/seed/elena/100/100'
  }
];

const defaultTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Migrate Dashboard to Tailwind v4',
    description: 'Update all legacy components to the latest Tailwind specification.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    assignedToId: 'emp-1',
    dueDate: '2024-06-15',
    skillsRequired: ['React', 'Tailwind']
  },
  {
    id: 'task-2',
    title: 'Q2 Content Audit',
    description: 'Analyze all blog posts from the last quarter for SEO performance.',
    status: 'TODO',
    priority: 'MEDIUM',
    assignedToId: 'emp-3',
    dueDate: '2024-06-20',
    skillsRequired: ['SEO', 'Marketing']
  }
];

export const dbService = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.EMPLOYEES)) {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(defaultEmployees));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(defaultTasks));
    }
  },

  getSession: (): User | null => {
    const session = localStorage.getItem(STORAGE_KEYS.AUTH);
    return session ? JSON.parse(session) : null;
  },

  login: (email: string): User => {
    const user: User = {
      id: 'admin-1',
      name: email.split('@')[0],
      email: email,
      role: UserRole.ADMIN,
      companyId: 'company-1',
      avatar: 'https://picsum.photos/seed/admin/100/100'
    };
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  getEmployees: (): Employee[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES) || '[]');
  },

  addEmployee: (employee: Employee) => {
    const emps = dbService.getEmployees();
    emps.push(employee);
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(emps));
  },

  getTasks: (): Task[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TASKS) || '[]');
  },

  addTask: (task: Task) => {
    const tasks = dbService.getTasks();
    tasks.push(task);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  getReports: (): AIReport[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REPORTS) || '[]');
  },

  addReport: (report: AIReport) => {
    const reports = dbService.getReports();
    reports.unshift(report);
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  },

  getStrategies: (): Strategy[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STRATEGIES) || '[]');
  },

  addStrategy: (strategy: Strategy) => {
    const strategies = dbService.getStrategies();
    strategies.unshift(strategy);
    localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(strategies));
  }
};
