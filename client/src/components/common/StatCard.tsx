import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconColor: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  change?: {
    value: number;
    isPositive: boolean;
    timeframe: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  iconColor,
  change
}) => {
  // Map color names to actual Tailwind classes
  const colorMap = {
    primary: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400',
    secondary: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400',
    success: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
    warning: 'text-amber-600 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400',
    danger: 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
  };
  
  const iconClasses = colorMap[iconColor];
  const changeClasses = change?.isPositive 
    ? 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400' 
    : 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 md:p-5 h-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-2.5 rounded-full ${iconClasses}`}>
          <i className={`fas fa-${icon} text-lg`}></i>
        </div>
      </div>
      
      {change && (
        <div className="mt-4">
          <div className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${changeClasses}`}>
            <i className={`fas fa-arrow-${change.isPositive ? 'up' : 'down'} text-xs`}></i>
            <span>{change.value}%</span>
            <span className="text-muted font-normal">from {change.timeframe}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
