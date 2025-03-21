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
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <div>
          <p className="stat-card__title">{title}</p>
          <p className="stat-card__value">{value}</p>
        </div>
        <div className={`stat-card__icon bg-${iconColor}-50 dark:bg-${iconColor}-900/20`}>
          <i className={`fas fa-${icon} text-${iconColor}`}></i>
        </div>
      </div>
      
      {change && (
        <div className="mt-sm">
          <div className={`stat-card__indicator stat-card__indicator--${change.isPositive ? 'positive' : 'negative'}`}>
            <i className={`fas fa-arrow-${change.isPositive ? 'up' : 'down'} stat-card__indicator-icon`}></i>
            <span>{change.value}%</span>
            <span className="stat-card__indicator-text">from {change.timeframe}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;
