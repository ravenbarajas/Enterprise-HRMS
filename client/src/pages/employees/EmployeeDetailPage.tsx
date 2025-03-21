import React from 'react';
import { useParams } from 'wouter';
import MainLayout from '@/components/layout/MainLayout';
import EmployeeProfile from '@/components/employees/EmployeeProfile';
import { useQuery } from '@tanstack/react-query';
import { Employee, EmployeeDocument, EmergencyContact, EmployeeSkill } from '@/data/types';
import { 
  mockEmployees, 
  mockEmployeeDocuments, 
  mockEmergencyContacts, 
  mockEmployeeSkills 
} from '@/data/mockData';

const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employeeId = parseInt(id);
  
  // Fetch employee details
  // In a real app, these would be API calls
  const { data: employee, isLoading: isLoadingEmployee } = useQuery<Employee | undefined>({
    queryKey: [`/api/employees/${employeeId}`],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockEmployees.find(emp => emp.id === employeeId);
    }
  });
  
  // Fetch employee documents
  const { data: documents, isLoading: isLoadingDocuments } = useQuery<EmployeeDocument[]>({
    queryKey: [`/api/employees/${employeeId}/documents`],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockEmployeeDocuments.filter(doc => doc.employeeId === employeeId);
    },
    enabled: !!employee
  });
  
  // Fetch emergency contacts
  const { data: emergencyContacts, isLoading: isLoadingContacts } = useQuery<EmergencyContact[]>({
    queryKey: [`/api/employees/${employeeId}/emergency-contacts`],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockEmergencyContacts.filter(contact => contact.employeeId === employeeId);
    },
    enabled: !!employee
  });
  
  // Fetch skills
  const { data: skills, isLoading: isLoadingSkills } = useQuery<EmployeeSkill[]>({
    queryKey: [`/api/employees/${employeeId}/skills`],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockEmployeeSkills.filter(skill => skill.employeeId === employeeId);
    },
    enabled: !!employee
  });
  
  const isLoading = isLoadingEmployee || isLoadingDocuments || isLoadingContacts || isLoadingSkills;

  return (
    <MainLayout 
      title={employee ? `${employee.name}'s Profile` : 'Employee Profile'}
      breadcrumbItems={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Employees', path: '/employees' },
        { label: employee?.name || 'Employee Details' }
      ]}
    >
      {isLoading ? (
        <div className="flex items-center justify-center p-xl">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary mb-md"></i>
            <p>Loading employee data...</p>
          </div>
        </div>
      ) : !employee ? (
        <div className="card shadow-md p-lg text-center">
          <div className="text-danger mb-sm">
            <i className="fas fa-exclamation-triangle text-3xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-sm">Employee Not Found</h3>
          <p className="text-muted">
            The employee you're looking for does not exist or you don't have permission to view their profile.
          </p>
          <button 
            className="button button--primary button--md mt-md"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      ) : (
        <EmployeeProfile 
          employee={employee}
          documents={documents || []}
          emergencyContacts={emergencyContacts || []}
          skills={skills || []}
        />
      )}
    </MainLayout>
  );
};

export default EmployeeDetailPage;
