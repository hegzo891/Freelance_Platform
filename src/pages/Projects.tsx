import React, { useState } from 'react';
import { Calendar, DollarSign, Search, Filter, MoreHorizontal, Plus, Eye, Edit, Trash2, Play, Pause, CheckCircle } from 'lucide-react';
import { mockProjects } from '../data/mockData';
import { Project } from '../types';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('deadline');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'progress':
        return b.progress - a.progress;
      case 'budget':
        return b.budget - a.budget;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const isOverdue = (deadline: string, status: string) => {
    return new Date(deadline) < new Date() && status !== 'completed';
  };

  return (
    <div className="p-4 sm:p-6 xl:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2 text-base sm:text-lg xl:text-xl">Manage and track all your freelance projects</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 xl:px-8 xl:py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-base xl:text-lg">
          <Plus className="w-5 h-5 inline mr-2" />
          New Project
        </button>
      </div>

      {/* Filters and controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 xl:w-6 xl:h-6" />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 xl:pl-14 pr-4 py-3 xl:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-5 h-5 xl:w-6 xl:h-6" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 xl:py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 xl:py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base xl:text-lg"
          >
            <option value="deadline">Sort by Deadline</option>
            <option value="progress">Sort by Progress</option>
            <option value="budget">Sort by Budget</option>
            <option value="name">Sort by Name</option>
          </select>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 text-sm font-medium ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-3 text-sm font-medium border-l border-gray-300 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Projects display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 xl:p-8 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate">{project.name}</h3>
                  <p className="text-sm xl:text-base text-gray-600 mt-1 truncate">{project.client}</p>
                </div>
                <div className="relative">
                  <button className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal className="w-5 h-5 xl:w-6 xl:h-6" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm xl:text-base text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm xl:text-base font-medium capitalize ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm xl:text-base text-gray-600">Progress</span>
                    <span className="text-sm xl:text-base font-medium text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center justify-between">
                  <span className="text-sm xl:text-base text-gray-600">Deadline</span>
                  <div className={`flex items-center space-x-1 text-sm xl:text-base ${
                    isOverdue(project.deadline, project.status) ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    <Calendar className="w-4 h-4 xl:w-5 xl:h-5" />
                    <span>{formatDate(project.deadline)}</span>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center justify-between">
                  <span className="text-sm xl:text-base text-gray-600">Budget</span>
                  <div className="flex items-center space-x-1 text-sm xl:text-base font-medium text-gray-900">
                    <DollarSign className="w-4 h-4 xl:w-5 xl:h-5 text-green-500" />
                    <span>{formatCurrency(project.budget)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-sm">
                  <Eye className="w-4 h-4 inline mr-1" />
                  View
                </button>
                <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium text-sm">
                  <Edit className="w-4 h-4 inline mr-1" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{project.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${isOverdue(project.deadline, project.status) ? 'text-red-600' : 'text-gray-900'}`}>
                        {formatDate(project.deadline)}
                        {isOverdue(project.deadline, project.status) && (
                          <span className="block text-xs text-red-500">Overdue</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(project.budget)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        {project.status === 'active' ? (
                          <button className="text-yellow-600 hover:text-yellow-900">
                            <Pause className="w-4 h-4" />
                          </button>
                        ) : project.status === 'pending' ? (
                          <button className="text-green-600 hover:text-green-900">
                            <Play className="w-4 h-4" />
                          </button>
                        ) : null}
                        {project.status !== 'completed' && (
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 xl:py-24">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 xl:w-20 xl:h-20 mx-auto" />
            </div>
            <h3 className="text-xl xl:text-2xl font-medium text-gray-900 mb-4">No projects found</h3>
            <p className="text-base xl:text-lg text-gray-600 mb-8">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters to find what you\'re looking for.' 
                : 'Get started by creating your first project.'
              }
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-base xl:text-lg">
                Create First Project
              </button>
            )}
          </div>
        </div>
      )}

      {/* Summary stats */}
      {filteredProjects.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 xl:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 xl:gap-8">
            <div className="text-center">
              <p className="text-2xl xl:text-4xl font-bold text-gray-900">{filteredProjects.length}</p>
              <p className="text-sm xl:text-base text-gray-600 mt-1">Total Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl xl:text-4xl font-bold text-green-600">
                {filteredProjects.filter(p => p.status === 'completed').length}
              </p>
              <p className="text-sm xl:text-base text-gray-600 mt-1">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl xl:text-4xl font-bold text-blue-600">
                {filteredProjects.filter(p => p.status === 'active').length}
              </p>
              <p className="text-sm xl:text-base text-gray-600 mt-1">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl xl:text-4xl font-bold text-gray-900">
                {formatCurrency(filteredProjects.reduce((sum, p) => sum + p.budget, 0))}
              </p>
              <p className="text-sm xl:text-base text-gray-600 mt-1">Total Budget</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;