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
  const { hasPermission } = useAuth();
  const isAdmin = hasPermission(['admin']);

  // Mock data - in a real app, this would come from an API
  const announcements: Announcement[] = [
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
      title: 'Updated Travel Policy',
      content: 'Please review the new travel policy before booking your next business trip.',
      source: 'Finance',
      tag: { label: 'Policy Update', type: 'default' }
    },
    {
      id: 3,
      title: 'IT System Upgrade',
      content: 'We\'ll be upgrading our systems this weekend. Expect brief service interruptions.',
      source: 'IT',
      tag: { label: 'Important', type: 'warning' }
    }
  ];

  return (
    <div className="card shadow-md h-full">
      <div className="card__header flex justify-between items-center">
        <h3 className="card__title">Announcements</h3>
        {isAdmin && (
          <button className="text-primary text-sm hover:text-primary-700 dark:hover:text-primary-300">
            + New
          </button>
        )}
      </div>
      <div className="card__body">
        <ul className="space-y-md">
          {announcements.map((announcement) => (
            <li 
              key={announcement.id} 
              className={`p-md rounded-lg ${announcement.highlighted ? 'bg-primary-50 dark:bg-primary-900/20' : 'border'}`}
            >
              <h4 className="font-medium">{announcement.title}</h4>
              <p className="text-sm text-muted mt-xs">{announcement.content}</p>
              <div className="mt-sm flex justify-between items-center">
                <span className="text-xs text-muted">Posted by {announcement.source}</span>
                <span className={`text-xs badge badge--${announcement.tag.type}`}>
                  {announcement.tag.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="card__footer text-center">
        <a href="#" className="text-sm text-primary hover:text-primary-700 dark:hover:text-primary-300">
          View all announcements
        </a>
      </div>
    </div>
  );
};

export default Announcements;
