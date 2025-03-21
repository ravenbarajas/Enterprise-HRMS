import React, { useState } from 'react';
import { Employee, EmployeeDocument, EmergencyContact, EmployeeSkill } from '@/data/types';
import { useAuth } from '@/hooks/useAuth';

interface EmployeeProfileProps {
  employee: Employee;
  documents: EmployeeDocument[];
  emergencyContacts: EmergencyContact[];
  skills: EmployeeSkill[];
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({
  employee,
  documents,
  emergencyContacts,
  skills
}) => {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission(['admin', 'hr']);
  
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="card shadow-md mb-lg">
          <div className="p-md flex flex-col items-center text-center">
            <div className="avatar avatar--lg avatar--primary mb-md">
              <span>
                {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-muted mb-sm">{employee.position}</p>
            <div className="flex mt-sm">
              <span className={`badge badge--${employee.status === 'Active' ? 'success' : 'warning'}`}>
                {employee.status}
              </span>
            </div>
          </div>
          
          <div className="border-t p-md">
            <h3 className="text-md font-medium mb-sm">Contact Information</h3>
            <ul className="space-y-sm">
              <li className="flex">
                <i className="fas fa-envelope text-muted w-6"></i>
                <span>{employee.email}</span>
              </li>
              <li className="flex">
                <i className="fas fa-phone text-muted w-6"></i>
                <span>{employee.phone}</span>
              </li>
              <li className="flex">
                <i className="fas fa-map-marker-alt text-muted w-6"></i>
                <span>{employee.address}</span>
              </li>
            </ul>
          </div>
          
          <div className="border-t p-md">
            <h3 className="text-md font-medium mb-sm">Employment Details</h3>
            <ul className="space-y-sm">
              <li className="flex justify-between">
                <span className="text-muted">Department</span>
                <span>{employee.department}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">Joined Date</span>
                <span>{employee.joinDate}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">Employee ID</span>
                <span>{employee.employeeId}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted">Reports To</span>
                <span>{employee.reportsTo}</span>
              </li>
            </ul>
          </div>
          
          {canEdit && (
            <div className="border-t p-md">
              <button className="button button--primary button--md button--full mb-sm">
                <i className="fas fa-edit mr-xs"></i> Edit Profile
              </button>
              <button className="button button--danger button--md button--full">
                <i className="fas fa-user-slash mr-xs"></i> Deactivate
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:col-span-2">
        <div className="card shadow-md">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button 
                className={`p-md font-medium ${activeTab === 'basic' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Info
              </button>
              <button 
                className={`p-md font-medium ${activeTab === 'documents' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
                onClick={() => setActiveTab('documents')}
              >
                Documents
              </button>
              <button 
                className={`p-md font-medium ${activeTab === 'skills' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </button>
              <button 
                className={`p-md font-medium ${activeTab === 'emergency' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
                onClick={() => setActiveTab('emergency')}
              >
                Emergency Contacts
              </button>
            </div>
          </div>
          
          <div className="p-md">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div>
                <h3 className="text-lg font-medium mb-md">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-lg">
                  <div>
                    <label className="form-label">Full Name</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.name}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Date of Birth</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.dateOfBirth}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Gender</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.gender}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Marital Status</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.maritalStatus}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.email}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.phone}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">Address</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.address}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-md">Employment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div>
                    <label className="form-label">Department</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.department}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Position</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.position}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Join Date</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.joinDate}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Employee Type</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.employeeType}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Employee ID</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.employeeId}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Reports To</label>
                    <div className="form-control bg-primary-50 dark:bg-bg-dark-tertiary">
                      {employee.reportsTo}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <div className="flex justify-between items-center mb-md">
                  <h3 className="text-lg font-medium">Employee Documents</h3>
                  {canEdit && (
                    <button className="button button--primary button--sm">
                      <i className="fas fa-plus mr-xs"></i> Add Document
                    </button>
                  )}
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary-50 dark:bg-bg-dark-tertiary">
                      <tr>
                        <th className="text-left p-md">Document Name</th>
                        <th className="text-left p-md">Type</th>
                        <th className="text-left p-md">Expiry Date</th>
                        <th className="text-left p-md">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc.id} className="border-b">
                          <td className="p-md">
                            <div className="flex items-center">
                              <i className="fas fa-file-alt text-primary mr-sm"></i>
                              <span>{doc.name}</span>
                            </div>
                          </td>
                          <td className="p-md">{doc.type}</td>
                          <td className="p-md">
                            {doc.expiryDate ? (
                              <span>{doc.expiryDate}</span>
                            ) : (
                              <span className="text-muted">N/A</span>
                            )}
                          </td>
                          <td className="p-md">
                            <button className="button button--secondary button--sm mr-xs">
                              <i className="fas fa-download"></i>
                            </button>
                            {canEdit && (
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div>
                <div className="flex justify-between items-center mb-md">
                  <h3 className="text-lg font-medium">Skills & Qualifications</h3>
                  {canEdit && (
                    <button className="button button--primary button--sm">
                      <i className="fas fa-plus mr-xs"></i> Add Skill
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-md">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-md border rounded-md">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{skill.name}</h4>
                        <span className={`badge badge--${getSkillLevelBadge(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-sm text-muted mt-xs">{skill.description}</p>
                      {skill.certification && (
                        <div className="mt-sm text-sm">
                          <span className="font-medium">Certification:</span> {skill.certification}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Emergency Contacts Tab */}
            {activeTab === 'emergency' && (
              <div>
                <div className="flex justify-between items-center mb-md">
                  <h3 className="text-lg font-medium">Emergency Contacts</h3>
                  {canEdit && (
                    <button className="button button--primary button--sm">
                      <i className="fas fa-plus mr-xs"></i> Add Contact
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-md">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="p-md border rounded-md">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{contact.name}</h4>
                        <span className="badge badge--primary">{contact.relationship}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-md mt-sm">
                        <div>
                          <span className="text-sm text-muted">Phone:</span>
                          <div className="text-sm">{contact.phone}</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted">Email:</span>
                          <div className="text-sm">{contact.email}</div>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-sm text-muted">Address:</span>
                          <div className="text-sm">{contact.address}</div>
                        </div>
                      </div>
                      {canEdit && (
                        <div className="mt-sm flex justify-end">
                          <button className="button button--secondary button--sm mr-xs">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="button button--danger button--sm">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine skill level badge color
function getSkillLevelBadge(level: string): string {
  switch (level.toLowerCase()) {
    case 'expert':
      return 'success';
    case 'advanced':
      return 'primary';
    case 'intermediate':
      return 'secondary';
    case 'beginner':
      return 'warning';
    default:
      return 'default';
  }
}

export default EmployeeProfile;
