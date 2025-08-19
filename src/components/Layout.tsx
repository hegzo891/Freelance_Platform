import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FolderOpen, 
  User, 
  Users,
  FileText,
  CheckSquare,
  BarChart3,
  Menu, 
  X, 
  Bell, 
  ChevronDown,
  CheckCircle,
  DollarSign,
  MessageSquare,
  Play,
  FileText as FileTextIcon,
  UserPlus,
  Settings,
  LogOut
} from 'lucide-react';
import { mockUser, mockActivities, mockNotifications } from '../data/mockData';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/', icon: Home },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Invoices', href: '/invoices', icon: FileText },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const getIconComponent = (iconName: string) => {
    const icons = {
      CheckCircle,
      DollarSign,
      MessageSquare,
      Play,
      FileText: FileTextIcon,
      UserPlus,
      CheckSquare
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

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      case 'error': return 'bg-red-100 text-red-600';
      case 'info': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <h1 className="text-lg xl:text-xl font-bold text-gray-900">FreelancePro</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 mt-6 px-3 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center px-3 py-3 mb-2 text-sm xl:text-base font-medium rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`w-5 h-5 xl:w-6 xl:h-6 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 xl:w-6 xl:h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm xl:text-base font-medium text-gray-900 truncate">{mockUser.name}</p>
              <p className="text-xs xl:text-sm text-gray-500 truncate">{mockUser.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 xl:px-12">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationOpen(!notificationOpen);
                    setProfileDropdownOpen(false);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg relative"
                >
                  <Bell className="w-5 h-5 xl:w-6 xl:h-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
                
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 xl:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-sm xl:text-base font-semibold text-gray-900">Notifications</h3>
                      {unreadNotifications > 0 && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          {unreadNotifications} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {mockNotifications.slice(0, 5).map((notification) => (
                        <div key={notification.id} className={`px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start space-x-3">
                            <div className={`p-1 rounded-full ${getNotificationColor(notification.type)}`}>
                              <Bell className="w-3 h-3" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm xl:text-base font-medium text-gray-900">{notification.title}</p>
                              <p className="text-xs xl:text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-gray-200">
                      <button className="text-sm xl:text-base text-blue-600 hover:text-blue-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotificationOpen(false);
                  }}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg px-2 py-1"
                >
                  <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 xl:w-5 xl:h-5 text-blue-600" />
                  </div>
                  <span className="hidden md:block text-sm xl:text-base font-medium text-gray-700">{mockUser.name}</span>
                  <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5 text-gray-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{mockUser.name}</p>
                      <p className="text-xs text-gray-600">{mockUser.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile Settings
                      </Link>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="w-4 h-4 mr-3" />
                        Account Settings
                      </button>
                      <hr className="my-1" />
                      <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;