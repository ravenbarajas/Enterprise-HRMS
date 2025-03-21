import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LeaveManagement from '@/components/attendance/LeaveManagement';
import { useQuery } from '@tanstack/react-query';
import { LeaveRequest, LeaveType } from '@/data/types';
import { mockLeaveRequests, mockLeaveTypes, mockLeaveBalance } from '@/data/mockData';

const LeavePage: React.FC = () => {
  // In a real app, these would be queries to an API
  const { data: leaveRequests, isLoading: isLoadingRequests } = useQuery<LeaveRequest[]>({
    queryKey: ['/api/leave-requests'],
    // For the prototype, we'll just return the mock data
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockLeaveRequests;
    }
  });
  
  const { data: leaveTypes, isLoading: isLoadingTypes } = useQuery<LeaveType[]>({
    queryKey: ['/api/leave-types'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockLeaveTypes;
    }
  });
  
  const { data: leaveBalance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ['/api/leave-balance'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 350));
      return mockLeaveBalance;
    }
  });
  
  const isLoading = isLoadingRequests || isLoadingTypes || isLoadingBalance;

  return (
    <MainLayout 
      title="Leave Management"
      breadcrumbItems={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Leave Management' }
      ]}
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-xl">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary mb-md"></i>
            <p>Loading leave data...</p>
          </div>
        </div>
      ) : (
        <LeaveManagement 
          leaveRequests={leaveRequests || []}
          leaveTypes={leaveTypes || []}
          leaveBalance={leaveBalance || {}}
        />
      )}
    </MainLayout>
  );
};

export default LeavePage;
