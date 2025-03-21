import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

interface AttendanceData {
  day: string;
  attendance: number;
}

const AttendanceChart: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  
  // Default data (admin view: company-wide attendance)
  const adminData: AttendanceData[] = [
    { day: 'Mon', attendance: 98 },
    { day: 'Tue', attendance: 95 },
    { day: 'Wed', attendance: 92 },
    { day: 'Thu', attendance: 96 },
    { day: 'Fri', attendance: 89 }
  ];
  
  // HR view: slightly different patterns
  const hrData: AttendanceData[] = [
    { day: 'Mon', attendance: 96 },
    { day: 'Tue', attendance: 97 },
    { day: 'Wed', attendance: 94 },
    { day: 'Thu', attendance: 93 },
    { day: 'Fri', attendance: 91 }
  ];
  
  // Manager view: their department
  const managerData: AttendanceData[] = [
    { day: 'Mon', attendance: 100 },
    { day: 'Tue', attendance: 95 },
    { day: 'Wed', attendance: 98 },
    { day: 'Thu', attendance: 92 },
    { day: 'Fri', attendance: 94 }
  ];
  
  // Select data based on user role
  let data = adminData;
  
  if (user) {
    if (user.role === 'hr') {
      data = hrData;
    } else if (user.role === 'manager') {
      data = managerData;
    } else if (user.role === 'employee') {
      // Employees see the same company-wide data as admins
      data = adminData;
    }
  }
  
  // Calculate custom colors for the chart based on theme
  const barColor = theme === 'dark' ? '#3b82f6' : '#2563eb';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-sm">
          <p className="text-sm font-medium">{`${payload[0].payload.day}: ${payload[0].value}%`}</p>
          <p className="text-xs text-muted">Employee attendance rate</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border h-full">
      <div className="border-b border-border p-5 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Employee Attendance</h3>
        <div className="flex items-center space-x-2">
          <select className="text-sm bg-transparent border border-border rounded p-1">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
          <button className="text-muted hover:text-foreground p-1.5 rounded-full hover:bg-muted/20 transition-colors">
            <i className="fas fa-ellipsis-v text-sm"></i>
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis 
                dataKey="day" 
                tick={{ fill: textColor }} 
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
              />
              <YAxis 
                domain={[80, 100]} 
                tickCount={5} 
                tickFormatter={(tick) => `${tick}%`}
                tick={{ fill: textColor }}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="attendance" 
                fill={barColor} 
                radius={[4, 4, 0, 0]} 
                maxBarSize={50}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-muted">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-600 mr-2"></span>
            Daily Attendance Rate
          </div>
          <div className="font-medium">
            Avg: {Math.round(data.reduce((sum, item) => sum + item.attendance, 0) / data.length)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
