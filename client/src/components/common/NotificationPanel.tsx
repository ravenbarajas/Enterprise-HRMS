import React from 'react';

interface Notification {
  id: number;
  type: 'message' | 'alert' | 'success';
  title: string;
  content: string;
  time: string;
  icon: string;
  iconColor: string;
}

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  // Mock notifications - in a real app, this would come from a context/API
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'message',
      title: 'New message from HR',
      content: 'Please review your benefits enrollment',
      time: '10 minutes ago',
      icon: 'envelope',
      iconColor: 'primary'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Reminder: Team Meeting',
      content: 'Scheduled for today at 2:00 PM',
      time: '1 hour ago',
      icon: 'bell',
      iconColor: 'warning'
    },
    {
      id: 3,
      type: 'success',
      title: 'Your leave request was approved',
      content: 'Aug 24-26 vacation days approved',
      time: 'Yesterday',
      icon: 'check-circle',
      iconColor: 'success'
    }
  ];

  return (
    <div className="fixed right-0 top-16 mt-sm w-80 bg-card shadow-lg rounded-lg overflow-hidden z-50 border">
      <div className="p-md bg-primary-50 dark:bg-bg-dark-tertiary border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Notifications</h3>
          <button 
            className="text-muted hover:text-primary"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className="p-md border-b hover:bg-primary-50 dark:hover:bg-bg-dark-tertiary"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <span className={`h-8 w-8 rounded-full bg-${notification.iconColor} flex items-center justify-center text-white`}>
                  <i className={`fas fa-${notification.icon}`}></i>
                </span>
              </div>
              <div className="ml-sm">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted">{notification.content}</p>
                <p className="text-xs text-muted mt-xs">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-sm bg-primary-50 dark:bg-bg-dark-tertiary text-center">
        <a href="#" className="text-sm text-primary hover:text-primary-700 dark:hover:text-primary-300">
          View all notifications
        </a>
      </div>
    </div>
  );
};

export default NotificationPanel;
