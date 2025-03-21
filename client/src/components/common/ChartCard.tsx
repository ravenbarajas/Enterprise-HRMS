import React, { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  children,
  actions
}) => {
  return (
    <div className="card shadow-md">
      <div className="card__header flex justify-between items-center">
        <h3 className="card__title">{title}</h3>
        {actions && (
          <div>
            {actions}
          </div>
        )}
      </div>
      <div className="card__body">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
