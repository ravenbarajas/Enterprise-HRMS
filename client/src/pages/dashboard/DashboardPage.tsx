import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DepartmentDistribution from '@/components/dashboard/DepartmentDistribution';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import RecentActivities from '@/components/dashboard/RecentActivities';
import Announcements from '@/components/dashboard/Announcements';
import { useAuth } from '@/hooks/useAuth';

const DashboardPage: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const [dateRange, setDateRange] = useState('week');
  
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Role-specific dashboard messages
  const getRoleSpecificMessage = () => {
    if (!user) return '';
    
    switch (user.role) {
      case 'admin':
        return 'Here\'s an overview of your organization\'s performance and activities.';
      case 'hr':
        return 'Here\'s the latest HR metrics and employee activities.';
      case 'manager':
        return 'Here\'s an overview of your department\'s performance and team activities.';
      case 'employee':
        return 'Here\'s your personal dashboard with important updates and tasks.';
      default:
        return 'Here\'s what\'s happening in your organization today.';
    }
  };

  return (
    <MainLayout 
      title="Dashboard"
      breadcrumbItems={[{ label: 'Dashboard' }]}
    >
      <div className="mb-6 md:mb-8 p-4 md:p-6 bg-card rounded-lg shadow-sm border border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              {getGreeting()}, {user?.name}
            </h2>
            <p className="text-muted">
              {getRoleSpecificMessage()}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="text-sm mr-3">Date Range:</span>
            <select 
              className="form-select rounded-md border-input px-3 py-1 bg-background"
              value={dateRange}
              onChange={handleDateRangeChange}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <DashboardStats />
      
      {/* Admin and HR specific charts */}
      {hasPermission(['admin', 'hr']) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DepartmentDistribution />
          <AttendanceChart />
        </div>
      )}
      
      {/* Manager specific charts */}
      {user?.role === 'manager' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card shadow-sm p-4 md:p-6">
            <h3 className="text-lg font-medium mb-4">Team Performance</h3>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted">Team performance metrics would appear here</p>
            </div>
          </div>
          <AttendanceChart />
        </div>
      )}
      
      {/* Employee specific charts */}
      {user?.role === 'employee' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card shadow-sm p-4 md:p-6">
            <h3 className="text-lg font-medium mb-4">My Tasks</h3>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted">Personal tasks and goals would appear here</p>
            </div>
          </div>
          <div className="card shadow-sm p-4 md:p-6">
            <h3 className="text-lg font-medium mb-4">My Attendance</h3>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted">Personal attendance records would appear here</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Recent Activity & Announcements - shown to everyone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivities />
        <Announcements />
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
