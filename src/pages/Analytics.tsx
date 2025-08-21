import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, FolderOpen, Clock, Calendar, Target } from 'lucide-react';
import StatCard from '../components/StatCard';

const Analytics = () => {
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 4200, projects: 3 },
    { month: 'Feb', revenue: 5800, projects: 4 },
    { month: 'Mar', revenue: 3200, projects: 2 },
    { month: 'Apr', revenue: 6500, projects: 5 },
    { month: 'May', revenue: 4800, projects: 3 },
    { month: 'Jun', revenue: 7200, projects: 6 },
    { month: 'Jul', revenue: 8500, projects: 7 },
    { month: 'Aug', revenue: 6800, projects: 5 },
    { month: 'Sep', revenue: 9200, projects: 8 },
    { month: 'Oct', revenue: 7500, projects: 6 },
    { month: 'Nov', revenue: 8800, projects: 7 },
    { month: 'Dec', revenue: 10200, projects: 9 }
  ];

  const clientDistributionData = [
    { name: 'TechCorp Inc.', value: 45, color: '#3B82F6' },
    { name: 'StartupXYZ', value: 30, color: '#10B981' },
    { name: 'Creative Agency', value: 15, color: '#F59E0B' },
    { name: 'Others', value: 10, color: '#EF4444' }
  ];

  const projectTypeData = [
    { type: 'Web Development', count: 12, revenue: 45000 },
    { type: 'Mobile Apps', count: 8, revenue: 32000 },
    { type: 'UI/UX Design', count: 6, revenue: 18000 },
    { type: 'Consulting', count: 4, revenue: 12000 }
  ];

  const weeklyHoursData = [
    { week: 'Week 1', hours: 42 },
    { week: 'Week 2', hours: 38 },
    { week: 'Week 3', hours: 45 },
    { week: 'Week 4', hours: 40 }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Comprehensive insights into your freelance business</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(95200)}
          icon={DollarSign}
          change="+15% from last month"
          changeType="positive"
          color="green"
        />
        <StatCard
          title="Active Clients"
          value={12}
          icon={Users}
          change="+3 new this month"
          changeType="positive"
          color="blue"
        />
        <StatCard
          title="Projects Completed"
          value={48}
          icon={FolderOpen}
          change="+8 this month"
          changeType="positive"
          color="green"
        />
        <StatCard
          title="Avg. Hours/Week"
          value={41}
          icon={Clock}
          change="-2 hours from last week"
          changeType="negative"
          color="yellow"
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Monthly Revenue Trend</h2>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Client Revenue Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Client Revenue Distribution</h2>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {clientDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
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
          <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4">
            {clientDistributionData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs sm:text-sm text-gray-600 truncate">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Types Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Project Types Performance</h2>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTypeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  type="category"
                  dataKey="type"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  width={100}
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'count' ? `${value} projects` : formatCurrency(Number(value)), 
                    name === 'count' ? 'Projects' : 'Revenue'
                  ]}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Hours Tracking */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Weekly Hours Tracking</h2>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip
                  formatter={(value) => [`${value} hours`, 'Hours Worked']}
                  labelStyle={{ color: '#374151' }}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Monthly Goal</h3>
            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Revenue Target</span>
                <span className="font-medium">$12,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">$10,200 achieved (85%)</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Projects Target</span>
                <span className="font-medium">10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">9 completed (90%)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Top Performing Month</h3>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">December</p>
            <p className="text-sm text-gray-600 mt-1">$10,200 revenue</p>
            <p className="text-sm text-gray-600">9 projects completed</p>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs sm:text-sm text-green-800">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                +18% from previous month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">E-commerce Website</p>
                <p className="text-xs text-gray-600">TechCorp Inc.</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-red-600 font-medium">Jan 15</p>
                <p className="text-xs text-red-600">2 days left</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Mobile App</p>
                <p className="text-xs text-gray-600">StartupXYZ</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-yellow-600 font-medium">Jan 30</p>
                <p className="text-xs text-yellow-600">17 days left</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;