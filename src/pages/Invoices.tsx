import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Eye, Send, Calendar, DollarSign } from 'lucide-react';
import { mockInvoices } from '../data/mockData';
import { Invoice } from '../types';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
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

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your billing and payments</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base">
          <Plus className="w-4 h-4 inline mr-2" />
          Create Invoice
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search invoices..."
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Desktop table view */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                    <div className="text-sm text-gray-500">Issued: {formatDate(invoice.issueDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.projectName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet card view */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {filteredInvoices.map((invoice) => (
          <div key={invoice.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">{invoice.id}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{invoice.clientName}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(invoice.status)}`}>
                {invoice.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Project</p>
                <p className="text-sm sm:text-base font-medium text-gray-900">{invoice.projectName}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Amount</span>
                <div className="flex items-center space-x-1 text-sm sm:text-base font-bold text-gray-900">
                  <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  <span>{formatCurrency(invoice.amount)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Due Date</span>
                <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-900">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span>{formatDate(invoice.dueDate)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Issued</span>
                <span className="text-xs sm:text-sm text-gray-900">{formatDate(invoice.issueDate)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-xs sm:text-sm">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                View
              </button>
              <button className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg hover:bg-green-100 transition-colors duration-200 font-medium text-xs sm:text-sm">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                Download
              </button>
              <button className="flex-1 bg-purple-50 text-purple-600 py-2 px-3 rounded-lg hover:bg-purple-100 transition-colors duration-200 font-medium text-xs sm:text-sm">
                <Send className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                Send
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredInvoices.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="max-w-md mx-auto px-4">
            <div className="text-gray-400 mb-4">
              <Search className="w-8 h-8 sm:w-12 sm:h-12 mx-auto" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters to find what you\'re looking for.' 
                : 'Get started by creating your first invoice.'
              }
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base">
                Create First Invoice
              </button>
            )}
          </div>
        </div>
      )}

      {/* Summary stats */}
      {filteredInvoices.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
              <p className="text-xs sm:text-sm text-gray-600">Total Invoices</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                {filteredInvoices.filter(i => i.status === 'paid').length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Paid</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-yellow-600">
                {filteredInvoices.filter(i => i.status === 'pending').length}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {formatCurrency(filteredInvoices.reduce((sum, i) => sum + i.amount, 0))}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Total Amount</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;