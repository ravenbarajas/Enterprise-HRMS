import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false, onClose }) => {
  const { user, hasPermission } = useAuth();
  const [location] = useLocation();

  if (!user) return null;

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: 'tachometer-alt', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Employees', path: '/employees', icon: 'users', roles: ['admin', 'hr', 'manager'] },
    { name: 'Attendance', path: '/attendance', icon: 'calendar-check', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Leave Management', path: '/leave', icon: 'calendar-minus', roles: ['admin', 'hr', 'manager', 'employee'] },
    { name: 'Payroll', path: '/payroll', icon: 'money-bill-wave', roles: ['admin', 'hr'] },
    { name: 'Analytics', path: '/analytics', icon: 'chart-bar', roles: ['admin', 'hr'] },
    { name: 'Settings', path: '/settings', icon: 'cog', roles: ['admin'] },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  const handleNavClick = () => {
    if (mobile && onClose) {
      onClose();
    }
  };

  const userInitials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <aside className="w-64 bg-card h-full overflow-y-auto border-r">
      <div className="p-md">
        <div className="mb-xl">
          <div className="flex items-center p-sm bg-primary-50 dark:bg-bg-dark-tertiary rounded-lg">
            <div className="avatar avatar--md avatar--primary">
              <span>{userInitials}</span>
            </div>
            <div className="ml-sm">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
          </div>
        </div>
        
        <nav className="space-y-xs">
          {navigation.map((item) => {
            // Only show navigation items the user has permission to access
            if (!hasPermission(item.roles as any[])) return null;
            
            return (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={handleNavClick}
              >
                <a className={`nav-link ${isActive(item.path) ? 'nav-link--active' : ''}`}>
                  <span className="nav-link__icon">
                    <i className={`fas fa-${item.icon}`}></i>
                  </span>
                  <span>{item.name}</span>
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
