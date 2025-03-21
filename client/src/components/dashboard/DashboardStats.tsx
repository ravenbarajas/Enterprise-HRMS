import React from 'react';
import StatCard from '../common/StatCard';
import { useAuth } from '@/hooks/useAuth';

const DashboardStats: React.FC = () => {
  const { user } = useAuth();
  
  // Admin & HR stats
  const adminHrStats = [
    {
      title: 'Total Employees',
      value: '187',
      icon: 'users',
      iconColor: 'primary',
      change: {
        value: 12,
        isPositive: true,
        timeframe: 'last month'
      }
    },
    {
      title: 'Attendance Rate',
      value: '94.5%',
      icon: 'calendar-check',
      iconColor: 'success',
      change: {
        value: 2.3,
        isPositive: true,
        timeframe: 'last week'
      }
    },
    {
      title: 'Open Positions',
      value: '12',
      icon: 'briefcase',
      iconColor: 'warning',
      change: {
        value: 4,
        isPositive: true,
        timeframe: 'new this month'
      }
    },
    {
      title: 'Turnover Rate',
      value: '3.2%',
      icon: 'user-minus',
      iconColor: 'danger',
      change: {
        value: 1.5,
        isPositive: false, // Decreasing turnover is positive
        timeframe: 'last quarter'
      }
    }
  ];
  
  // Manager stats
  const managerStats = [
    {
      title: 'Team Members',
      value: '24',
      icon: 'users',
      iconColor: 'primary',
      change: {
        value: 2,
        isPositive: true,
        timeframe: 'last month'
      }
    },
    {
      title: 'Team Attendance',
      value: '96.2%',
      icon: 'calendar-check',
      iconColor: 'success',
      change: {
        value: 1.8,
        isPositive: true,
        timeframe: 'last week'
      }
    },
    {
      title: 'Pending Approvals',
      value: '5',
      icon: 'clipboard-list',
      iconColor: 'warning',
      change: {
        value: 2,
        isPositive: false,
        timeframe: 'since yesterday'
      }
    },
    {
      title: 'Team Performance',
      value: '87%',
      icon: 'chart-line',
      iconColor: 'success',
      change: {
        value: 3,
        isPositive: true,
        timeframe: 'last month'
      }
    }
  ];
  
  // Employee stats
  const employeeStats = [
    {
      title: 'Attendance',
      value: '98%',
      icon: 'calendar-check',
      iconColor: 'success',
      change: {
        value: 2,
        isPositive: true,
        timeframe: 'this month'
      }
    },
    {
      title: 'Leave Balance',
      value: '12 days',
      icon: 'calendar-minus',
      iconColor: 'primary',
      change: {
        value: 0,
        isPositive: true,
        timeframe: 'unchanged'
      }
    },
    {
      title: 'Pending Tasks',
      value: '3',
      icon: 'tasks',
      iconColor: 'warning',
      change: {
        value: 2,
        isPositive: false,
        timeframe: 'since yesterday'
      }
    },
    {
      title: 'Performance',
      value: '92%',
      icon: 'chart-line',
      iconColor: 'success',
      change: {
        value: 4,
        isPositive: true,
        timeframe: 'last review'
      }
    }
  ];
  
  // Choose which stats to display based on user role
  let statsData = adminHrStats;
  
  if (user) {
    if (user.role === 'manager') {
      statsData = managerStats;
    } else if (user.role === 'employee') {
      statsData = employeeStats;
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor as any}
          change={stat.change}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
