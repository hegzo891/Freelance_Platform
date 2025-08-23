import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, Building, MoreHorizontal, Eye, User } from 'lucide-react';
import { mockClients } from '../data/mockData';
import { Client } from '../types';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Client['status']) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border border-green-200'
      : 'bg-gray-100 text-gray-800 border border-gray-200';
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your client relationships</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base">
          <Plus className="w-4 h-4 inline mr-2" />
          Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Clients grid - responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{client.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{client.company}</p>
                </div>
              </div>
              <button className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>

              {/* Contact info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <Building className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate">{client.company}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-gray-900">{client.totalProjects}</p>
                  <p className="text-xs text-gray-600">Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-green-600">{formatCurrency(client.totalPaid)}</p>
                  <p className="text-xs text-gray-600">Total Paid</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-xs sm:text-sm">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredClients.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="max-w-md mx-auto px-4">
            <div className="text-gray-400 mb-4">
              <Search className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters to find what you\'re looking for.' 
                : 'Get started by adding your first client.'
              }
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base">
                Add First Client
              </button>
            )}
          </div>
        </div>
      )}

      {/* Summary stats */}
      {filteredClients.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{filteredClients.length}</p>
              <p className="text-xs sm:text-sm text-gray-600">Total Clients</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                {filteredClients.filter(c => c.status === 'active').length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Active</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {filteredClients.reduce((sum, c) => sum + c.totalProjects, 0)}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Total Projects</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {formatCurrency(filteredClients.reduce((sum, c) => sum + c.totalPaid, 0))}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;