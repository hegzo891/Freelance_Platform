import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, Flag, User, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { mockTasks } from '../data/mockData';
import { Task } from '../types';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'todo':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'todo':
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== 'completed';
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your project tasks and deadlines</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base">
          <Plus className="w-4 h-4 inline mr-2" />
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks grid - responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(task.status)}
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">{task.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

            <div className="space-y-3">
              {/* Project */}
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Project</span>
                <span className="text-xs sm:text-sm font-medium text-gray-900 truncate ml-2">{task.projectName}</span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </span>
              </div>

              {/* Due Date */}
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Due Date</span>
                <div className={`flex items-center space-x-1 text-xs sm:text-sm ${
                  isOverdue(task.dueDate, task.status) ? 'text-red-600' : 'text-gray-900'
                }`}>
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{formatDate(task.dueDate)}</span>
                  {isOverdue(task.dueDate, task.status) && (
                    <span className="text-xs bg-red-100 text-red-800 px-1 rounded">Overdue</span>
                  )}
                </div>
              </div>

              {/* Assigned To */}
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Assigned To</span>
                <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-900">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span>{task.assignedTo}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                {task.status !== 'completed' && (
                  <button className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg hover:bg-green-100 transition-colors duration-200 font-medium text-xs sm:text-sm">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                    Complete
                  </button>
                )}
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-xs sm:text-sm">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="max-w-md mx-auto px-4">
            <div className="text-gray-400 mb-4">
              <Search className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your search or filters to find what you\'re looking for.' 
                : 'Get started by creating your first task.'
              }
            </p>
            {(!searchTerm && statusFilter === 'all' && priorityFilter === 'all') && (
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base">
                Create First Task
              </button>
            )}
          </div>
        </div>
      )}

      {/* Summary stats */}
      {filteredTasks.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{filteredTasks.length}</p>
              <p className="text-xs sm:text-sm text-gray-600">Total Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                {filteredTasks.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-blue-600">
                {filteredTasks.filter(t => t.status === 'in-progress').length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-red-600">
                {filteredTasks.filter(t => isOverdue(t.dueDate, t.status)).length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Overdue</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;