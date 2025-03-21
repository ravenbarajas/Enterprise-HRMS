import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import ChartCard from '../common/ChartCard';
import { AnalyticsData } from '@/data/types';
import { useAuth } from '@/hooks/useAuth';

interface AnalyticsCenterProps {
  analyticsData: AnalyticsData;
}

const AnalyticsCenter: React.FC<AnalyticsCenterProps> = ({ analyticsData }) => {
  const { hasPermission } = useAuth();
  
  // Only admin and HR can see all analytics
  const isAdmin = hasPermission(['admin']);
  const isHR = hasPermission(['hr']);
  
  const [timeRange, setTimeRange] = useState('year');
  const [exportFormat, setExportFormat] = useState('pdf');

  // Custom colors for charts
  const COLORS = ['#0F6FFF', '#10B981', '#F59E0B', '#EF4444', '#6E56CF'];

  // Export analytics data
  const handleExport = () => {
    console.log(`Exporting analytics data in ${exportFormat} format`);
    // In a real app, this would call an API to generate the export
  };

  return (
    <div className="grid grid-cols-1 gap-lg">
      {/* Analytics Controls */}
      <div className="card shadow-md">
        <div className="card__body p-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <div>
              <h3 className="text-lg font-medium mb-sm">HR Analytics Dashboard</h3>
              <p className="text-sm text-muted">
                View key performance indicators and trends across the organization
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-sm">
              <select 
                className="form-control"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
              
              <div className="flex">
                <select 
                  className="form-control rounded-r-none"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
                <button 
                  className="button button--primary rounded-l-none"
                  onClick={handleExport}
                >
                  <i className="fas fa-download mr-xs"></i> Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        <div className="card shadow-md">
          <div className="card__body">
            <div className="flex items-center mb-sm">
              <div className="h-10 w-10 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mr-sm">
                <i className="fas fa-users text-primary"></i>
              </div>
              <h3 className="font-medium">Employee Turnover</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{analyticsData.employeeTurnover.rate}%</div>
              <div className={`flex items-center text-sm ${analyticsData.employeeTurnover.trend > 0 ? 'text-danger' : 'text-success'}`}>
                <i className={`fas fa-arrow-${analyticsData.employeeTurnover.trend > 0 ? 'up' : 'down'} mr-xs`}></i>
                <span>{Math.abs(analyticsData.employeeTurnover.trend)}%</span>
              </div>
            </div>
            <div className="mt-sm text-xs text-muted">vs previous {timeRange}</div>
          </div>
        </div>
        
        <div className="card shadow-md">
          <div className="card__body">
            <div className="flex items-center mb-sm">
              <div className="h-10 w-10 rounded-full bg-success-50 dark:bg-success-900/20 flex items-center justify-center mr-sm">
                <i className="fas fa-business-time text-success"></i>
              </div>
              <h3 className="font-medium">Average Tenure</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{analyticsData.averageTenure.years} yrs</div>
              <div className={`flex items-center text-sm ${analyticsData.averageTenure.trend > 0 ? 'text-success' : 'text-danger'}`}>
                <i className={`fas fa-arrow-${analyticsData.averageTenure.trend > 0 ? 'up' : 'down'} mr-xs`}></i>
                <span>{Math.abs(analyticsData.averageTenure.trend)}%</span>
              </div>
            </div>
            <div className="mt-sm text-xs text-muted">vs previous {timeRange}</div>
          </div>
        </div>
        
        <div className="card shadow-md">
          <div className="card__body">
            <div className="flex items-center mb-sm">
              <div className="h-10 w-10 rounded-full bg-warning-50 dark:bg-warning-900/20 flex items-center justify-center mr-sm">
                <i className="fas fa-money-bill-wave text-warning"></i>
              </div>
              <h3 className="font-medium">Cost per Employee</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">${analyticsData.costPerEmployee.amount}</div>
              <div className={`flex items-center text-sm ${analyticsData.costPerEmployee.trend > 0 ? 'text-danger' : 'text-success'}`}>
                <i className={`fas fa-arrow-${analyticsData.costPerEmployee.trend > 0 ? 'up' : 'down'} mr-xs`}></i>
                <span>{Math.abs(analyticsData.costPerEmployee.trend)}%</span>
              </div>
            </div>
            <div className="mt-sm text-xs text-muted">vs previous {timeRange}</div>
          </div>
        </div>
        
        <div className="card shadow-md">
          <div className="card__body">
            <div className="flex items-center mb-sm">
              <div className="h-10 w-10 rounded-full bg-danger-50 dark:bg-danger-900/20 flex items-center justify-center mr-sm">
                <i className="fas fa-calendar-check text-danger"></i>
              </div>
              <h3 className="font-medium">Attendance Rate</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{analyticsData.attendanceRate.rate}%</div>
              <div className={`flex items-center text-sm ${analyticsData.attendanceRate.trend > 0 ? 'text-success' : 'text-danger'}`}>
                <i className={`fas fa-arrow-${analyticsData.attendanceRate.trend > 0 ? 'up' : 'down'} mr-xs`}></i>
                <span>{Math.abs(analyticsData.attendanceRate.trend)}%</span>
              </div>
            </div>
            <div className="mt-sm text-xs text-muted">vs previous {timeRange}</div>
          </div>
        </div>
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Employee Turnover Trend */}
        <ChartCard 
          title="Employee Turnover Trend"
          actions={
            <button className="text-muted hover:text-primary">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          }
        >
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analyticsData.turnoverTrend}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Turnover Rate']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  name="Turnover Rate"
                  stroke="#0F6FFF" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        {/* Department Headcount */}
        <ChartCard 
          title="Department Headcount"
          actions={
            <button className="text-muted hover:text-primary">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          }
        >
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData.departmentHeadcount}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="department" />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Employees" 
                  fill="#0F6FFF" 
                  radius={[0, 4, 4, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      
      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Recruitment Metrics */}
        <ChartCard 
          title="Recruitment Metrics"
          actions={
            <button className="text-muted hover:text-primary">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          }
        >
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData.recruitmentMetrics}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  name="Applications" 
                  stackId="1"
                  stroke="#0F6FFF" 
                  fill="#0F6FFF" 
                  fillOpacity={0.6} 
                />
                <Area 
                  type="monotone" 
                  dataKey="interviews" 
                  name="Interviews" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6} 
                />
                <Area 
                  type="monotone" 
                  dataKey="hires" 
                  name="Hires" 
                  stackId="3"
                  stroke="#F59E0B" 
                  fill="#F59E0B" 
                  fillOpacity={0.6} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        
        {/* Gender Distribution */}
        <ChartCard 
          title="Gender Distribution"
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
                  data={analyticsData.genderDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {analyticsData.genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
      
      {/* Charts Row 3 - Only visible to Admin and HR */}
      {(isAdmin || isHR) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Salary Distribution */}
          <ChartCard 
            title="Salary Distribution"
            actions={
              <button className="text-muted hover:text-primary">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            }
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.salaryDistribution}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="range" />
                  <YAxis tickFormatter={(value) => `${value}`} />
                  <Tooltip formatter={(value) => [`${value} employees`, '']} />
                  <Bar 
                    dataKey="count" 
                    name="Employees" 
                    fill="#6E56CF" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          
          {/* Performance Ratings */}
          <ChartCard 
            title="Performance Ratings"
            actions={
              <button className="text-muted hover:text-primary">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            }
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData.performanceRatings}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="rating" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Employees']} />
                  <Bar 
                    dataKey="percentage" 
                    name="Percentage of Employees" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      )}
      
      {/* Attendance Patterns - Only visible to Admin and HR */}
      {(isAdmin || isHR) && (
        <ChartCard 
          title="Attendance Patterns"
          actions={
            <select className="form-control text-sm">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          }
        >
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analyticsData.attendancePatterns}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="onTime" 
                  name="On Time" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="late" 
                  name="Late" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="absent" 
                  name="Absent" 
                  stroke="#EF4444" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      )}
    </div>
  );
};

export default AnalyticsCenter;
