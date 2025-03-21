import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Breadcrumb from '../common/Breadcrumb';
import { useAuth } from '@/hooks/useAuth';
import NotificationPanel from '../common/NotificationPanel';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbItems?: { label: string; path?: string }[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title, 
  breadcrumbItems = [] 
}) => {
  const { user } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const toggleNotificationPanel = () => {
    setNotificationPanelOpen(!notificationPanelOpen);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar 
        toggleMobileSidebar={toggleMobileSidebar} 
        toggleNotificationPanel={toggleNotificationPanel}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        {/* Mobile Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 flex z-40 lg:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={toggleMobileSidebar}
            ></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-card slide-in">
              <div className="absolute top-0 right-0 pt-2 mr-2">
                <button 
                  className="p-2 rounded-md text-muted"
                  onClick={toggleMobileSidebar}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <Sidebar mobile onClose={toggleMobileSidebar} />
            </div>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-bg-light-secondary dark:bg-bg-dark-secondary p-4 md:p-6 lg:p-8">
          <div className="mb-6 md:mb-8">
            <Breadcrumb items={[{ label: 'Home', path: '/' }, ...breadcrumbItems]} />
            <h1 className="text-2xl font-semibold mt-3">{title}</h1>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            {children}
          </div>
        </main>
        
        {/* Notification Panel */}
        {notificationPanelOpen && (
          <NotificationPanel onClose={toggleNotificationPanel} />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
