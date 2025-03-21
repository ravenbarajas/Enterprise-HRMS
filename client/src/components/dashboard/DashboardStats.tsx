import React from 'react';
import StatCard from '../common/StatCard';

const DashboardStats: React.FC = () => {
  // In a real app, this data would come from an API
  const statsData = [
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-lg">
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
