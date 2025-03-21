import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DepartmentDistribution from '@/components/dashboard/DepartmentDistribution';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import RecentActivities from '@/components/dashboard/RecentActivities';
import Announcements from '@/components/dashboard/Announcements';
import { useAuth } from '@/hooks/useAuth';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('week');
  
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
  };

  return (
    <MainLayout 
      title="Dashboard"
      breadcrumbItems={[{ label: 'Dashboard' }]}
    >
      <div className="mb-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-xl font-semibold mb-xs">
            Welcome back, {user?.name}
          </h2>
          <p className="text-muted">
            Here's what's happening in your organization today
          </p>
        </div>
        
        <div className="mt-sm md:mt-0 flex items-center">
          <span className="text-sm mr-sm">Date Range:</span>
          <select 
            className="form-control"
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
      
      {/* Stats Cards */}
      <DashboardStats />
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
        <DepartmentDistribution />
        <AttendanceChart />
      </div>
      
      {/* Recent Activity & Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <RecentActivities />
        <Announcements />
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
