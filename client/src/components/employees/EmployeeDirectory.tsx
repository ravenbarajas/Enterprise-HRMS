import React, { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { Employee } from '@/data/types';

interface EmployeeDirectoryProps {
  employees: Employee[];
}

const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({ employees }) => {
  const { hasPermission } = useAuth();
  const canManageEmployees = hasPermission(['admin', 'hr']);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  
  // Extract unique departments for filter
  const departments = ['all', ...new Set(employees.map(emp => emp.department))];
  
  // Filter employees based on search and department
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      departmentFilter === 'all' || employee.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="card shadow-md">
      <div className="card__header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm">
        <h2 className="card__title">Employee Directory</h2>
        
        {canManageEmployees && (
          <button className="button button--primary button--sm">
            <i className="fas fa-plus mr-xs"></i> Add Employee
          </button>
        )}
      </div>
      
      <div className="p-md border-b">
        <div className="flex flex-col md:flex-row gap-sm">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-sm top-1/2 transform -translate-y-1/2 text-muted"></i>
            <input
              type="text"
              placeholder="Search employees..."
              className="form-control pl-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <select
              className="form-control"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-50 dark:bg-bg-dark-tertiary">
            <tr>
              <th className="text-left p-md">Name</th>
              <th className="text-left p-md">Position</th>
              <th className="text-left p-md hidden md:table-cell">Department</th>
              <th className="text-left p-md hidden md:table-cell">Email</th>
              <th className="text-left p-md">Status</th>
              <th className="text-right p-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="p-md">
                    <div className="flex items-center">
                      <div className="avatar avatar--md avatar--primary mr-sm">
                        <span>
                          {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <Link href={`/employees/${employee.id}`}>
                          <a className="font-medium hover:text-primary">{employee.name}</a>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="p-md">{employee.position}</td>
                  <td className="p-md hidden md:table-cell">{employee.department}</td>
                  <td className="p-md hidden md:table-cell">{employee.email}</td>
                  <td className="p-md">
                    <span className={`badge badge--${employee.status === 'Active' ? 'success' : 'warning'}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-md text-right">
                    <Link href={`/employees/${employee.id}`}>
                      <a className="button button--secondary button--sm mr-xs">
                        <i className="fas fa-eye"></i>
                      </a>
                    </Link>
                    {canManageEmployees && (
                      <>
                        <button className="button button--secondary button--sm mr-xs">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="button button--danger button--sm">
                          <i className="fas fa-trash"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-xl text-center text-muted">
                  No employees found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="card__footer flex justify-between items-center">
        <div>
          <span className="text-sm text-muted">
            Showing {filteredEmployees.length} of {employees.length} employees
          </span>
        </div>
        
        <div className="flex">
          <button className="button button--secondary button--sm mr-xs" disabled={filteredEmployees.length === 0}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="button button--secondary button--sm" disabled={filteredEmployees.length === 0}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
