import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Announcement {
  id: number;
  title: string;
  content: string;
  source: string;
  tag: {
    label: string;
    type: 'primary' | 'secondary' | 'warning' | 'default';
  };
  highlighted?: boolean;
}

const Announcements: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const isAdmin = hasPermission(['admin']);

  // Common announcements for all users
  const commonAnnouncements: Announcement[] = [
    {
      id: 1,
      title: 'Company Picnic - Save the Date!',
      content: 'Join us for our annual company picnic on September 15th at Riverside Park.',
      source: 'HR',
      tag: { label: 'Company-wide', type: 'primary' },
      highlighted: true
    },
    {
      id: 2,
      title: 'IT System Upgrade',
      content: 'We\'ll be upgrading our systems this weekend. Expect brief service interruptions.',
      source: 'IT',
      tag: { label: 'Important', type: 'warning' }
    }
  ];
  
  // Admin specific announcements
  const adminAnnouncements: Announcement[] = [
    ...commonAnnouncements,
    {
      id: 3,
      title: 'Board Meeting Next Week',
      content: 'Quarterly board meeting scheduled for next Monday at 9 AM.',
      source: 'Executive Office',
      tag: { label: 'Confidential', type: 'secondary' }
    }
  ];
  
  // HR specific announcements
  const hrAnnouncements: Announcement[] = [
    ...commonAnnouncements,
    {
      id: 3,
      title: 'Updated Onboarding Process',
      content: 'Please review the new employee onboarding procedure before our next hire starts.',
      source: 'HR Director',
      tag: { label: 'Process Change', type: 'secondary' }
    }
  ];
  
  // Manager specific announcements
  const managerAnnouncements: Announcement[] = [
    ...commonAnnouncements,
    {
      id: 3,
      title: 'Department Budget Review',
      content: 'Submit your Q4 budget projections by the end of the week.',
      source: 'Finance',
      tag: { label: 'Action Required', type: 'warning' }
    }
  ];
  
  // Employee specific announcements
  const employeeAnnouncements: Announcement[] = [
    ...commonAnnouncements,
    {
      id: 3,
      title: 'Updated Travel Policy',
      content: 'Please review the new travel policy before booking your next business trip.',
      source: 'Finance',
      tag: { label: 'Policy Update', type: 'default' }
    }
  ];
  
  // Select announcements based on user role
  let announcements = commonAnnouncements;
  
  if (user) {
    if (user.role === 'admin') {
      announcements = adminAnnouncements;
    } else if (user.role === 'hr') {
      announcements = hrAnnouncements;
    } else if (user.role === 'manager') {
      announcements = managerAnnouncements;
    } else if (user.role === 'employee') {
      announcements = employeeAnnouncements;
    }
  }
  
  // Map for badge styles
  const badgeStyles = {
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border h-full">
      <div className="border-b border-border p-5 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Announcements</h3>
        {isAdmin && (
          <button className="text-primary text-sm hover:text-primary-dark transition-colors">
            + New
          </button>
        )}
      </div>
      <div className="p-5">
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li 
              key={announcement.id} 
              className={`p-4 rounded-lg ${
                announcement.highlighted 
                  ? 'bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30' 
                  : 'border border-border'
              }`}
            >
              <h4 className="font-medium text-sm md:text-base">{announcement.title}</h4>
              <p className="text-sm text-muted mt-1.5">{announcement.content}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-muted">Posted by {announcement.source}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${badgeStyles[announcement.tag.type]}`}>
                  {announcement.tag.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border p-3 text-center">
        <button className="text-sm text-primary hover:text-primary-dark transition-colors">
          View all announcements
        </button>
      </div>
    </div>
  );
};

export default Announcements;
