import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FolderOpen, DollarSign, CheckCircle, Clock, TrendingUp, Users, FileText, AlertTriangle } from 'lucide-react';
import StatCard from '../components/StatCard';
import { mockStats, mockActivities, monthlyEarningsData, projectStatusData } from '../data/mockData';

const Overview = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getIconComponent = (iconName: string) => {
    const icons = {
      CheckCircle,
      DollarSign,
      MessageSquare: FileText,
      Play: TrendingUp,
      FileText,
      UserPlus: Users,
      CheckSquare: CheckCircle
    };
    const Icon = icons[iconName as keyof typeof icons] || CheckCircle;
    return <Icon className="w-4 h-4" />;
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-100 text-blue-600';
      case 'payment': return 'bg-green-100 text-green-600';
      case 'client': return 'bg-purple-100 text-purple-600';
      case 'task': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page header */}
      <div className="mb-6 sm:mb-8 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2 text-base sm:text-lg xl:text-xl">Welcome back, Ahmed! Here's what's happening with your projects.</p>
      </div>

      {/* Stats cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-8">
        <StatCard
          title="Total Projects"
          value={mockStats.totalProjects}
          icon={FolderOpen}
          change="+2 this month"
          changeType="positive"
          color="blue"
        />
        <StatCard
          title="Total Earnings"
          value={formatCurrency(mockStats.totalEarnings)}
          icon={DollarSign}
          change="+15% from last month"
          changeType="positive"
          color="green"
        />
        <StatCard
          title="Active Projects"
          value={mockStats.activeProjects}
          icon={CheckCircle}
          change={`${mockStats.completedProjects} completed`}
          changeType="positive"
          color="green"
        />
        <StatCard
          title="Tasks Due"
          value={mockStats.tasksDue}
          icon={Clock}
          change="2 due this week"
          changeType="negative"
          color="red"
        />
      </div>

      {/* Secondary stats */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-8">
        <StatCard
          title="Total Clients"
          value={mockStats.totalClients}
          icon={Users}
          change="+1 new client"
          changeType="positive"
          color="blue"
        />
        <StatCard
          title="Monthly Earnings"
          value={formatCurrency(mockStats.monthlyEarnings)}
          icon={DollarSign}
          change="+25% from last month"
          changeType="positive"
          color="green"
        />
        <StatCard
          title="Pending Invoices"
          value={mockStats.pendingInvoices}
          icon={FileText}
          change="1 overdue"
          changeType="negative"
          color="yellow"
        />
        <StatCard
          title="Completion Rate"
          value="87%"
          icon={TrendingUp}
          change="+5% improvement"
          changeType="positive"
          color="green"
        />
      </div>

      {/* Charts section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
        {/* Monthly earnings chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 xl:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg xl:text-xl font-semibold text-gray-900">Monthly Earnings</h2>
            <TrendingUp className="w-5 h-5 xl:w-6 xl:h-6 text-green-500" />
          </div>
          <div className="h-64 xl:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEarningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: '#6b7280' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), 'Earnings']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="earnings" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project status pie chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 xl:p-8">
          <h2 className="text-lg xl:text-xl font-semibold text-gray-900 mb-6">Project Status</h2>
          <div className="h-64 xl:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {projectStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 xl:w-4 xl:h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm xl:text-base text-gray-600 truncate">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity and quick actions */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8">
        {/* Recent activity */}
        <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6 xl:p-8">
          <h2 className="text-lg xl:text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {mockActivities.slice(0, 6).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className={`p-2 rounded-full flex-shrink-0 ${getActivityColor(activity.type)}`}>
                  {getIconComponent(activity.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm xl:text-base text-gray-900">{activity.message}</p>
                  <p className="text-sm xl:text-base text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="text-sm xl:text-base text-blue-600 hover:text-blue-800 font-medium">
              View all activities
            </button>
          </div>
        </div>

        {/* Quick actions and alerts */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
                Create New Project
              </button>
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm">
                Send Invoice
              </button>
              <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium text-sm">
                Add New Client
              </button>
              <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium text-sm">
                Create Task
              </button>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Overdue Invoice</p>
                  <p className="text-xs text-red-600">INV-004 is 8 days overdue</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Task Due Soon</p>
                  <p className="text-xs text-yellow-600">Homepage design due in 2 days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">New Message</p>
                  <p className="text-xs text-blue-600">Client message requires response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;