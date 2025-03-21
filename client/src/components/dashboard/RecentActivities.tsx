import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Activity {
  id: number;
  type: 'user-add' | 'payroll' | 'leave' | 'alert';
  title: string;
  description: string;
  time: string;
}

const RecentActivities: React.FC = () => {
  const { user } = useAuth();
  
  // Admin activities
  const adminActivities: Activity[] = [
    {
      id: 1,
      type: 'user-add',
      title: 'New employee onboarded',
      description: 'Sarah Johnson joined as UX Designer',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'payroll',
      title: 'Payroll processed',
      description: 'August 2023 payroll has been processed',
      time: 'Yesterday'
    },
    {
      id: 3,
      type: 'leave',
      title: 'Leave approved',
      description: 'Michael Brown\'s vacation request approved',
      time: '2 days ago'
    },
    {
      id: 4,
      type: 'alert',
      title: 'System alert',
      description: 'Upcoming system maintenance scheduled',
      time: '3 days ago'
    }
  ];
  
  // HR activities
  const hrActivities: Activity[] = [
    {
      id: 1,
      type: 'user-add',
      title: 'New employee onboarded',
      description: 'Sarah Johnson joined as UX Designer',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'payroll',
      title: 'HR policy updated',
      description: 'Remote work policy has been updated',
      time: 'Yesterday'
    },
    {
      id: 3,
      type: 'leave',
      title: 'Leave requests pending',
      description: '3 leave requests require your approval',
      time: '2 days ago'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Performance review',
      description: 'Q3 performance reviews start next week',
      time: '3 days ago'
    }
  ];
  
  // Manager activities
  const managerActivities: Activity[] = [
    {
      id: 1,
      type: 'user-add',
      title: 'Team meeting scheduled',
      description: 'Weekly team meeting tomorrow at 10 AM',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'payroll',
      title: 'Budget report',
      description: 'Department budget report is ready for review',
      time: 'Yesterday'
    },
    {
      id: 3,
      type: 'leave',
      title: 'Leave requests pending',
      description: '2 team members requested time off',
      time: '2 days ago'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Project deadline',
      description: 'Project Alpha deadline approaching in 5 days',
      time: '3 days ago'
    }
  ];
  
  // Employee activities
  const employeeActivities: Activity[] = [
    {
      id: 1,
      type: 'user-add',
      title: 'Training scheduled',
      description: 'New skills training next Tuesday at 2 PM',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'payroll',
      title: 'Payslip available',
      description: 'Your August 2023 payslip is now available',
      time: 'Yesterday'
    },
    {
      id: 3,
      type: 'leave',
      title: 'Leave approved',
      description: 'Your vacation request has been approved',
      time: '2 days ago'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Team event',
      description: 'Department team building on Friday 3 PM',
      time: '3 days ago'
    }
  ];
  
  // Select activities based on user role
  let activities = adminActivities;
  
  if (user) {
    if (user.role === 'hr') {
      activities = hrActivities;
    } else if (user.role === 'manager') {
      activities = managerActivities;
    } else if (user.role === 'employee') {
      activities = employeeActivities;
    }
  }

  // Map activity types to icons and colors
  const getIconForActivityType = (type: Activity['type']) => {
    const colorMap = {
      primary: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400',
      success: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
      warning: 'text-amber-600 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400',
      danger: 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
    };
    
    switch (type) {
      case 'user-add':
        return { icon: 'user-plus', colorClass: colorMap.primary };
      case 'payroll':
        return { icon: 'file-alt', colorClass: colorMap.success };
      case 'leave':
        return { icon: 'calendar-alt', colorClass: colorMap.warning };
      case 'alert':
        return { icon: 'exclamation-triangle', colorClass: colorMap.danger };
      default:
        return { icon: 'bell', colorClass: colorMap.primary };
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border h-full">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-lg font-semibold">Recent Activities</h3>
      </div>
      <div className="p-0">
        <ul className="divide-y divide-border">
          {activities.map((activity) => {
            const { icon, colorClass } = getIconForActivityType(activity.type);
            
            return (
              <li key={activity.id} className="py-3 px-5">
                <div className="flex items-start space-x-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colorClass}`}>
                    <i className={`fas fa-${icon}`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted">{activity.description}</p>
                    <p className="text-xs text-muted mt-1">{activity.time}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-t border-border px-5 py-3 text-center">
        <button className="text-sm text-primary hover:text-primary-dark transition-colors">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;
