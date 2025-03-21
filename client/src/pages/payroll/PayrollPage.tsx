import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PayrollDashboard from '@/components/payroll/PayrollDashboard';
import { useQuery } from '@tanstack/react-query';
import { PayrollData, Payslip } from '@/data/types';
import { mockPayrollData, mockPayslips } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';

const PayrollPage: React.FC = () => {
  const { hasPermission } = useAuth();
  
  // Check if user has permission to view payroll
  const canViewPayroll = hasPermission(['admin', 'hr']);
  
  // In a real app, these would be queries to an API
  const { data: payrollData, isLoading: isLoadingPayroll } = useQuery<PayrollData>({
    queryKey: ['/api/payroll'],
    // For the prototype, we'll just return the mock data
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPayrollData;
    },
    enabled: canViewPayroll
  });
  
  const { data: payslips, isLoading: isLoadingPayslips } = useQuery<Payslip[]>({
    queryKey: ['/api/payslips'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockPayslips;
    },
    enabled: canViewPayroll
  });
  
  const isLoading = isLoadingPayroll || isLoadingPayslips;

  return (
    <MainLayout 
      title="Payroll Management"
      breadcrumbItems={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Payroll' }
      ]}
    >
      {!canViewPayroll ? (
        <div className="card shadow-md p-lg text-center">
          <div className="text-warning mb-sm">
            <i className="fas fa-lock text-3xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-sm">Access Restricted</h3>
          <p className="text-muted">
            You don't have permission to view payroll information. Please contact your administrator for access.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center p-xl">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary mb-md"></i>
            <p>Loading payroll data...</p>
          </div>
        </div>
      ) : (
        <PayrollDashboard 
          payrollData={payrollData!}
          payslips={payslips || []}
        />
      )}
    </MainLayout>
  );
};

export default PayrollPage;
