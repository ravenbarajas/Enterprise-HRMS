import React from 'react';

interface Activity {
  id: number;
  type: 'user-add' | 'payroll' | 'leave' | 'alert';
  title: string;
  description: string;
  time: string;
}

const RecentActivities: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const activities: Activity[] = [
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

  const getIconForActivityType = (type: Activity['type']) => {
    switch (type) {
      case 'user-add':
        return { icon: 'user-plus', color: 'primary' };
      case 'payroll':
        return { icon: 'file-alt', color: 'success' };
      case 'leave':
        return { icon: 'calendar-alt', color: 'warning' };
      case 'alert':
        return { icon: 'exclamation-triangle', color: 'danger' };
      default:
        return { icon: 'bell', color: 'primary' };
    }
  };

  return (
    <div className="card shadow-md h-full">
      <div className="card__header">
        <h3 className="card__title">Recent Activities</h3>
      </div>
      <div className="card__body p-0">
        <ul className="divide-y">
          {activities.map((activity) => {
            const { icon, color } = getIconForActivityType(activity.type);
            
            return (
              <li key={activity.id} className="py-sm px-md">
                <div className="flex items-start">
                  <div className={`h-10 w-10 rounded-full bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center mr-sm`}>
                    <i className={`fas fa-${icon} text-${color}`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted">{activity.description}</p>
                    <p className="text-xs text-muted mt-xs">{activity.time}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="card__footer text-center">
        <a href="#" className="text-sm text-primary hover:text-primary-700 dark:hover:text-primary-300">
          View all activity
        </a>
      </div>
    </div>
  );
};

export default RecentActivities;
