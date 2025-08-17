export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'pending' | 'overdue';
  deadline: string;
  progress: number;
  budget: number;
  description: string;
  startDate: string;
}

export interface Activity {
  id: string;
  type: 'project' | 'payment' | 'client' | 'task';
  message: string;
  timestamp: string;
  icon: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
  location: string;
  bio: string;
  company: string;
  website: string;
  hourlyRate: number;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalEarnings: number;
  monthlyEarnings: number;
  tasksDue: number;
  totalClients: number;
  pendingInvoices: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  avatar: string;
  totalProjects: number;
  totalPaid: number;
  status: 'active' | 'inactive';
  joinDate: string;
  lastContact: string;
}

export interface Invoice {
  id: string;
  clientName: string;
  clientId: string;
  projectName: string;
  projectId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  issueDate: string;
  dueDate: string;
  description: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
  assignedTo: string;
  createdDate: string;
  completedDate?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}