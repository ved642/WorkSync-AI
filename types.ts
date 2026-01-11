
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId: string;
  avatar?: string;
}

export interface Company {
  id: string;
  name: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
}

export interface Employee {
  id: string;
  userId: string;
  name: string;
  email: string;
  skills: string[];
  workload: number; // 0-100
  performance: number; // 0-100
  department: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEW';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignedToId: string;
  dueDate: string;
  skillsRequired: string[];
}

export interface AIReport {
  id: string;
  generatedAt: string;
  summary: string;
  keyInsights: string[];
  recommendations: string[];
}

export interface Strategy {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface SEOData {
  id: string;
  domain: string;
  score: number;
  keywords: { word: string; ranking: number }[];
  organicTraffic: number;
}
