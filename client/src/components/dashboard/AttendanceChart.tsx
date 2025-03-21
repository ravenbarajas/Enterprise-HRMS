import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../common/ChartCard';

interface AttendanceData {
  day: string;
  attendance: number;
}

const AttendanceChart: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const data: AttendanceData[] = [
    { day: 'Mon', attendance: 98 },
    { day: 'Tue', attendance: 95 },
    { day: 'Wed', attendance: 92 },
    { day: 'Thu', attendance: 96 },
    { day: 'Fri', attendance: 89 }
  ];

  return (
    <ChartCard 
      title="Employee Attendance"
      actions={
        <button className="text-muted hover:text-primary">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      }
    >
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis 
              domain={[80, 100]} 
              tickCount={5} 
              tickFormatter={(tick) => `${tick}%`}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Attendance']}
            />
            <Bar dataKey="attendance" fill="#0F6FFF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

export default AttendanceChart;
