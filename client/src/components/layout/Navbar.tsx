import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

interface NavbarProps {
  toggleMobileSidebar: () => void;
  toggleNotificationPanel: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  toggleMobileSidebar, 
  toggleNotificationPanel 
}) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const userInitials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="bg-card border-b shadow-sm z-10">
      <div className="w-full mx-auto px-md">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-sm rounded-md p-sm text-muted hover:bg-primary-50 dark:hover:bg-bg-dark-tertiary"
              onClick={toggleMobileSidebar}
            >
              <i className="fas fa-bars"></i>
            </button>
            <span className="text-xl font-bold text-primary">Enterprise HRMS</span>
          </div>
          
          <div className="flex items-center">
            <button 
              className="p-sm rounded-full text-muted hover:bg-primary-50 dark:hover:bg-bg-dark-tertiary relative mr-sm"
              onClick={toggleNotificationPanel}
            >
              <i className="fas fa-bell"></i>
              <span className="absolute top-0 right-0 bg-danger text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            
            <button 
              className="p-sm rounded-full text-muted hover:bg-primary-50 dark:hover:bg-bg-dark-tertiary mr-sm"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <i className="fas fa-moon"></i>
              ) : (
                <i className="fas fa-sun"></i>
              )}
            </button>
            
            <div className="relative" ref={menuRef}>
              <button 
                className="flex text-sm rounded-full focus:outline-none"
                onClick={toggleUserMenu}
              >
                <div className="avatar avatar--md avatar--primary">
                  <span>{userInitials}</span>
                </div>
              </button>
              
              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-sm w-48 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-sm border-b">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </p>
                  </div>
                  <div className="py-sm">
                    <a 
                      href="#" 
                      className="block px-md py-sm text-sm hover:bg-primary-50 dark:hover:bg-bg-dark-tertiary"
                    >
                      Your Profile
                    </a>
                    <a 
                      href="#" 
                      className="block px-md py-sm text-sm hover:bg-primary-50 dark:hover:bg-bg-dark-tertiary"
                    >
                      Settings
                    </a>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-md py-sm text-sm hover:bg-primary-50 dark:hover:bg-bg-dark-tertiary"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
