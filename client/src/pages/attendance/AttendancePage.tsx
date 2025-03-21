import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AttendanceTracking from '@/components/attendance/AttendanceTracking';
import { useQuery } from '@tanstack/react-query';
import { AttendanceRecord } from '@/data/types';
import { mockAttendanceRecords } from '@/data/mockData';

const AttendancePage: React.FC = () => {
  // In a real app, this would be a query to an API
  const { data: attendanceRecords, isLoading, error } = useQuery<AttendanceRecord[]>({
    queryKey: ['/api/attendance'],
    // For the prototype, we'll just return the mock data
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAttendanceRecords;
    }
  });

  return (
    <MainLayout 
      title="Attendance Tracking"
      breadcrumbItems={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Attendance' }
      ]}
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-xl">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary mb-md"></i>
            <p>Loading attendance data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="card shadow-md p-lg text-center">
          <div className="text-danger mb-sm">
            <i className="fas fa-exclamation-triangle text-3xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-sm">Error Loading Attendance Data</h3>
          <p className="text-muted">
            There was a problem loading the attendance data. Please try again later.
          </p>
          <button className="button button--primary button--md mt-md">
            Retry
          </button>
        </div>
      ) : (
        <AttendanceTracking attendanceRecords={attendanceRecords || []} />
      )}
    </MainLayout>
  );
};

export default AttendancePage;
