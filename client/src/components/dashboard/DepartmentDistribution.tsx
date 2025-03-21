import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

interface DepartmentData {
  name: string;
  value: number;
  color: string;
}

const DepartmentDistribution: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  // Default department distribution (admin view: all departments)
  const adminData: DepartmentData[] = [
    { name: 'IT', value: 42, color: '#3b82f6' },
    { name: 'HR', value: 25, color: '#8b5cf6' },
    { name: 'Sales', value: 18, color: '#10b981' },
    { name: 'Finance', value: 10, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#ef4444' }
  ];
  
  // HR view (emphasizes HR department)
  const hrData: DepartmentData[] = [
    { name: 'IT', value: 40, color: '#3b82f6' },
    { name: 'HR', value: 28, color: '#8b5cf6' },
    { name: 'Sales', value: 17, color: '#10b981' },
    { name: 'Finance', value: 10, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#ef4444' }
  ];
  
  // Manager view (example for IT manager)
  const managerData: DepartmentData[] = [
    { name: 'Development', value: 45, color: '#3b82f6' },
    { name: 'QA', value: 25, color: '#8b5cf6' },
    { name: 'DevOps', value: 15, color: '#10b981' },
    { name: 'Support', value: 10, color: '#f59e0b' },
    { name: 'Admin', value: 5, color: '#ef4444' }
  ];
  
  // Employee view (simplified version)
  const employeeData: DepartmentData[] = [
    { name: 'IT', value: 42, color: '#3b82f6' },
    { name: 'HR', value: 25, color: '#8b5cf6' },
    { name: 'Sales', value: 18, color: '#10b981' },
    { name: 'Other', value: 15, color: '#94a3b8' }
  ];
  
  // Select data based on user role
  let data = adminData;
  let title = "Department Distribution";
  
  if (user) {
    if (user.role === 'hr') {
      data = hrData;
    } else if (user.role === 'manager') {
      data = managerData;
      title = "IT Department Distribution";
    } else if (user.role === 'employee') {
      data = employeeData;
    }
  }

  // Calculate the total value for percentage calculations
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-sm">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-xs font-medium text-muted">
            {`${payload[0].value} employees (${percentage}%)`}
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Custom legend rendering
  const renderCustomizedLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs">{entry.value} - {((data[index].value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border h-full">
      <div className="border-b border-border p-5 flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button className="text-muted hover:text-foreground p-1.5 rounded-full hover:bg-muted/20 transition-colors">
          <i className="fas fa-ellipsis-v text-sm"></i>
        </button>
      </div>
      <div className="p-5">
        <div className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke={theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'white'} 
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                content={renderCustomizedLegend}
                verticalAlign="bottom"
                height={36}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-center text-sm text-muted">
          Total Employees: {total}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDistribution;
