import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EmployeeDirectory from '@/components/employees/EmployeeDirectory';
import { useQuery } from '@tanstack/react-query';
import { Employee } from '@/data/types';
import { mockEmployees } from '@/data/mockData';

const EmployeesPage: React.FC = () => {
  // In a real app, this would be a query to an API
  // For the prototype, we're using mock data
  const { data: employees, isLoading, error } = useQuery<Employee[]>({
    queryKey: ['/api/employees'],
    // For the prototype, we'll just return the mock data
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockEmployees;
    }
  });

  return (
    <MainLayout 
      title="Employee Directory"
      breadcrumbItems={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Employees' }
      ]}
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-xl">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary mb-md"></i>
            <p>Loading employee data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="card shadow-md p-lg text-center">
          <div className="text-danger mb-sm">
            <i className="fas fa-exclamation-triangle text-3xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-sm">Error Loading Employees</h3>
          <p className="text-muted">
            There was a problem loading the employee directory. Please try again later.
          </p>
          <button className="button button--primary button--md mt-md">
            Retry
          </button>
        </div>
      ) : (
        <EmployeeDirectory employees={employees || []} />
      )}
    </MainLayout>
  );
};

export default EmployeesPage;
