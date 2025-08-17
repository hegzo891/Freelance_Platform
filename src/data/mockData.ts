import { Project, Activity, User, DashboardStats, Client, Invoice, Task, Notification } from '../types/index.ts';

export const mockUser: User = {
  name: 'Ahmed Hegazy',
  email: 'ahmed.hegazy@freelancer.com',
  avatar: '',
  role: 'Full Stack Developer',
  phone: '+20 (100) 123-4567',
  location: 'Cairo, Egypt',
  bio: 'Experienced full-stack developer specializing in React, Node.js, and modern web technologies. Passionate about creating exceptional user experiences and scalable applications for clients worldwide.',
  company: 'Freelance',
  website: 'www.ahmedhegazy.dev',
  hourlyRate: 85
};

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Website',
    client: 'TechCorp Inc.',
    status: 'active',
    deadline: '2025-02-15',
    progress: 75,
    budget: 8500,
    description: 'Complete e-commerce platform with payment integration',
    startDate: '2024-12-01'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    client: 'StartupXYZ',
    status: 'active',
    deadline: '2025-01-30',
    progress: 45,
    budget: 12000,
    description: 'React Native mobile application for iOS and Android',
    startDate: '2024-11-15'
  },
  {
    id: '3',
    name: 'Website Redesign',
    client: 'Creative Agency',
    status: 'completed',
    deadline: '2024-12-20',
    progress: 100,
    budget: 3500,
    description: 'Complete website redesign with modern UI/UX',
    startDate: '2024-11-01'
  },
  {
    id: '4',
    name: 'API Integration',
    client: 'DataFlow Co.',
    status: 'pending',
    deadline: '2025-02-05',
    progress: 20,
    budget: 2800,
    description: 'Third-party API integration and documentation',
    startDate: '2024-12-15'
  },
  {
    id: '5',
    name: 'Dashboard Development',
    client: 'Analytics Pro',
    status: 'active',
    deadline: '2024-12-25',
    progress: 90,
    budget: 4200,
    description: 'Analytics dashboard with real-time data visualization',
    startDate: '2024-11-20'
  },
  {
    id: '6',
    name: 'Landing Page',
    client: 'Marketing Plus',
    status: 'completed',
    deadline: '2024-12-15',
    progress: 100,
    budget: 1500,
    description: 'High-converting landing page with A/B testing',
    startDate: '2024-11-25'
  },
  {
    id: '7',
    name: 'CRM System',
    client: 'SalesForce Ltd',
    status: 'active',
    deadline: '2025-03-10',
    progress: 30,
    budget: 15000,
    description: 'Custom CRM system with advanced reporting',
    startDate: '2024-12-20'
  },
  {
    id: '8',
    name: 'Portfolio Website',
    client: 'Design Studio',
    status: 'pending',
    deadline: '2025-02-20',
    progress: 10,
    budget: 2200,
    description: 'Creative portfolio website with animations',
    startDate: '2025-01-05'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'project',
    message: 'Completed milestone for E-commerce Website project',
    timestamp: '2 hours ago',
    icon: 'CheckCircle'
  },
  {
    id: '2',
    type: 'payment',
    message: 'Received payment of $3,500 from Creative Agency',
    timestamp: '1 day ago',
    icon: 'DollarSign'
  },
  {
    id: '3',
    type: 'client',
    message: 'New message from TechCorp Inc. regarding project updates',
    timestamp: '2 days ago',
    icon: 'MessageSquare'
  },
  {
    id: '4',
    type: 'project',
    message: 'Started new project: CRM System for SalesForce Ltd',
    timestamp: '3 days ago',
    icon: 'Play'
  },
  {
    id: '5',
    type: 'payment',
    message: 'Invoice INV-004 sent to DataFlow Co.',
    timestamp: '4 days ago',
    icon: 'FileText'
  },
  {
    id: '6',
    type: 'task',
    message: 'Completed database schema design task',
    timestamp: '5 days ago',
    icon: 'CheckSquare'
  },
  {
    id: '7',
    type: 'client',
    message: 'Added new client: Design Studio',
    timestamp: '1 week ago',
    icon: 'UserPlus'
  }
];

export const mockStats: DashboardStats = {
  totalProjects: 8,
  activeProjects: 3,
  completedProjects: 2,
  totalEarnings: 47700,
  monthlyEarnings: 12500,
  tasksDue: 5,
  totalClients: 7,
  pendingInvoices: 3
};

export const monthlyEarningsData = [
  { month: 'Jun', earnings: 3200 },
  { month: 'Jul', earnings: 4200 },
  { month: 'Aug', earnings: 5800 },
  { month: 'Sep', earnings: 3200 },
  { month: 'Oct', earnings: 6500 },
  { month: 'Nov', earnings: 4800 },
  { month: 'Dec', earnings: 8500 },
  { month: 'Jan', earnings: 12500 }
];

export const projectStatusData = [
  { name: 'Active', value: 3, color: '#3B82F6' },
  { name: 'Completed', value: 2, color: '#10B981' },
  { name: 'Pending', value: 2, color: '#F59E0B' },
  { name: 'Overdue', value: 1, color: '#EF4444' }
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@techcorp.com',
    company: 'TechCorp Inc.',
    phone: '+1 (555) 123-4567',
    avatar: '',
    totalProjects: 3,
    totalPaid: 15000,
    status: 'active',
    joinDate: '2024-06-15',
    lastContact: '2025-01-10'
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily@startupxyz.com',
    company: 'StartupXYZ',
    phone: '+1 (555) 987-6543',
    avatar: '',
    totalProjects: 2,
    totalPaid: 18500,
    status: 'active',
    joinDate: '2024-08-20',
    lastContact: '2025-01-08'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@creative.com',
    company: 'Creative Agency',
    phone: '+1 (555) 456-7890',
    avatar: '',
    totalProjects: 1,
    totalPaid: 3500,
    status: 'active',
    joinDate: '2024-10-05',
    lastContact: '2024-12-20'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@dataflow.com',
    company: 'DataFlow Co.',
    phone: '+1 (555) 321-9876',
    avatar: '',
    totalProjects: 1,
    totalPaid: 0,
    status: 'active',
    joinDate: '2024-12-10',
    lastContact: '2025-01-05'
  },
  {
    id: '5',
    name: 'David Johnson',
    email: 'david@analyticspro.com',
    company: 'Analytics Pro',
    phone: '+1 (555) 654-3210',
    avatar: '',
    totalProjects: 1,
    totalPaid: 4200,
    status: 'active',
    joinDate: '2024-11-15',
    lastContact: '2024-12-25'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    email: 'lisa@marketingplus.com',
    company: 'Marketing Plus',
    phone: '+1 (555) 789-0123',
    avatar: '',
    totalProjects: 1,
    totalPaid: 1500,
    status: 'inactive',
    joinDate: '2024-11-20',
    lastContact: '2024-12-15'
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'robert@salesforce.com',
    company: 'SalesForce Ltd',
    phone: '+1 (555) 147-2580',
    avatar: '',
    totalProjects: 1,
    totalPaid: 5000,
    status: 'active',
    joinDate: '2024-12-18',
    lastContact: '2025-01-12'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    clientName: 'TechCorp Inc.',
    clientId: '1',
    projectName: 'E-commerce Website',
    projectId: '1',
    amount: 8500,
    status: 'paid',
    issueDate: '2024-12-01',
    dueDate: '2024-12-31',
    description: 'E-commerce website development - Phase 1',
    items: [
      { id: '1', description: 'Frontend Development', quantity: 40, rate: 85, amount: 3400 },
      { id: '2', description: 'Backend Development', quantity: 35, rate: 85, amount: 2975 },
      { id: '3', description: 'Database Design', quantity: 15, rate: 85, amount: 1275 },
      { id: '4', description: 'Testing & Deployment', quantity: 10, rate: 85, amount: 850 }
    ]
  },
  {
    id: 'INV-002',
    clientName: 'StartupXYZ',
    clientId: '2',
    projectName: 'Mobile App Development',
    projectId: '2',
    amount: 12000,
    status: 'pending',
    issueDate: '2024-12-15',
    dueDate: '2025-01-15',
    description: 'Mobile app development - Initial phase',
    items: [
      { id: '1', description: 'App Design & Wireframes', quantity: 25, rate: 85, amount: 2125 },
      { id: '2', description: 'React Native Development', quantity: 60, rate: 85, amount: 5100 },
      { id: '3', description: 'API Integration', quantity: 30, rate: 85, amount: 2550 },
      { id: '4', description: 'Testing & Optimization', quantity: 26, rate: 85, amount: 2225 }
    ]
  },
  {
    id: 'INV-003',
    clientName: 'Creative Agency',
    clientId: '3',
    projectName: 'Website Redesign',
    projectId: '3',
    amount: 3500,
    status: 'paid',
    issueDate: '2024-11-01',
    dueDate: '2024-12-01',
    description: 'Complete website redesign project',
    items: [
      { id: '1', description: 'UI/UX Design', quantity: 20, rate: 85, amount: 1700 },
      { id: '2', description: 'Frontend Development', quantity: 15, rate: 85, amount: 1275 },
      { id: '3', description: 'Content Migration', quantity: 6, rate: 85, amount: 525 }
    ]
  },
  {
    id: 'INV-004',
    clientName: 'DataFlow Co.',
    clientId: '4',
    projectName: 'API Integration',
    projectId: '4',
    amount: 2800,
    status: 'overdue',
    issueDate: '2024-12-20',
    dueDate: '2025-01-05',
    description: 'Third-party API integration services',
    items: [
      { id: '1', description: 'API Analysis & Planning', quantity: 10, rate: 85, amount: 850 },
      { id: '2', description: 'Integration Development', quantity: 18, rate: 85, amount: 1530 },
      { id: '3', description: 'Documentation', quantity: 5, rate: 85, amount: 420 }
    ]
  },
  {
    id: 'INV-005',
    clientName: 'SalesForce Ltd',
    clientId: '7',
    projectName: 'CRM System',
    projectId: '7',
    amount: 5000,
    status: 'paid',
    issueDate: '2024-12-25',
    dueDate: '2025-01-25',
    description: 'CRM system development - Initial payment',
    items: [
      { id: '1', description: 'Project Setup & Planning', quantity: 15, rate: 85, amount: 1275 },
      { id: '2', description: 'Database Architecture', quantity: 20, rate: 85, amount: 1700 },
      { id: '3', description: 'Initial Development', quantity: 24, rate: 85, amount: 2025 }
    ]
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the homepage with modern design principles',
    projectId: '1',
    projectName: 'E-commerce Website',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2025-01-20',
    assignedTo: 'Ahmed Hegazy',
    createdDate: '2025-01-10'
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    description: 'Set up secure login and registration functionality with JWT tokens',
    projectId: '2',
    projectName: 'Mobile App Development',
    priority: 'high',
    status: 'todo',
    dueDate: '2025-01-25',
    assignedTo: 'Ahmed Hegazy',
    createdDate: '2025-01-08'
  },
  {
    id: '3',
    title: 'Database Schema Design',
    description: 'Design and implement optimized database structure for e-commerce platform',
    projectId: '1',
    projectName: 'E-commerce Website',
    priority: 'medium',
    status: 'completed',
    dueDate: '2025-01-15',
    assignedTo: 'Ahmed Hegazy',
    createdDate: '2025-01-05',
    completedDate: '2025-01-14'
  },
  {
    id: '4',
    title: 'API Integration Testing',
    description: 'Test and validate third-party payment API integration',
    projectId: '4',
    projectName: 'API Integration',
    priority: 'medium',
    status: 'todo',
    dueDate: '2025-02-01',
    assignedTo: 'Ahmed Hegazy',
    createdDate: '2024-12-20'
  },
  {
    id: '5',
    title: 'Mobile App UI Components',
    description: 'Develop reusable UI components for React Native application',
    projectId: '2',
    projectName: 'Mobile App Development',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2025-01-28',
    assignedTo: 'Ahmed Hegazy',
    createdDate: '2025-01-12'
  },
  {
    id: '6',
    title: 'Performance Optimization',
    description: 'Optimize dashboard loading times and implement caching strategies',
    projectId: '5',
    projectName: 'Dashboard Development',
    priority: 'low',
    status: 'todo',
    dueDate: '2024-12-30',
    assignedTo: 'Ahmed Hegazy',
    createdDate: '2024-12-15'
  },
  {
    id: '7',
    title: 'CRM User Interface',
    description: 'Design and implement the main CRM dashboard interface',
    projectId: '7',
    projectName: 'CRM System',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2025-02-05',
    assignedTo: 'Ahmed Hegazy',
    createdDate: '2024-12-22'
  },
  {
    id: '8',
    title: 'Content Management System',
    description: 'Build CMS for easy content updates and management',
    projectId: '8',
    projectName: 'Portfolio Website',
    priority: 'medium',
    status: 'todo',
    dueDate: '2025-02-15',
    assignedTo: 'Ahmed Hegazy',
    createdDate: '2025-01-06'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Payment Received',
    message: 'Payment of $5,000 received from SalesForce Ltd',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Task Overdue',
    message: 'Performance Optimization task is overdue',
    timestamp: '3 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'info',
    title: 'New Message',
    message: 'New message from TechCorp Inc. about project updates',
    timestamp: '5 hours ago',
    read: true
  },
  {
    id: '4',
    type: 'error',
    title: 'Invoice Overdue',
    message: 'Invoice INV-004 is overdue for DataFlow Co.',
    timestamp: '1 day ago',
    read: false
  },
  {
    id: '5',
    type: 'success',
    title: 'Project Completed',
    message: 'Website Redesign project has been completed successfully',
    timestamp: '2 days ago',
    read: true
  }
];