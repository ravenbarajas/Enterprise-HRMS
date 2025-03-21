import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ChartCard from '../common/ChartCard';

interface DepartmentData {
  name: string;
  value: number;
  color: string;
}

const DepartmentDistribution: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const data: DepartmentData[] = [
    { name: 'IT', value: 42, color: '#0F6FFF' },
    { name: 'HR', value: 25, color: '#6E56CF' },
    { name: 'Sales', value: 18, color: '#10B981' },
    { name: 'Finance', value: 10, color: '#F59E0B' },
    { name: 'Other', value: 5, color: '#EF4444' }
  ];

  return (
    <ChartCard 
      title="Department Distribution"
      actions={
        <button className="text-muted hover:text-primary">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      }
    >
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Percentage']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default DepartmentDistribution;
