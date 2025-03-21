import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LeaveRequest, LeaveType, UserRole } from '@/data/types';
import { formatDate } from '@/utils/dateUtils';

interface LeaveManagementProps {
  leaveRequests: LeaveRequest[];
  leaveTypes: LeaveType[];
  leaveBalance: Record<string, number>;
}

const LeaveManagement: React.FC<LeaveManagementProps> = ({
  leaveRequests,
  leaveTypes,
  leaveBalance
}) => {
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('requests');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Determine if user can manage leaves (approve/reject) - admin, HR, or manager
  const canManageLeaves = hasPermission(['admin', 'hr', 'manager']);
  
  // Filter requests based on user role and filter criteria
  const filteredRequests = leaveRequests.filter(request => {
    // For employees, only show their own requests
    if (user?.role === 'employee' && request.employeeId !== user.id) {
      return false;
    }
    
    // For managers, only show their department's requests
    if (user?.role === 'manager' && user.department !== request.department) {
      return false;
    }
    
    // Apply status filter
    if (filterStatus !== 'all' && request.status !== filterStatus) {
      return false;
    }
    
    return true;
  });

  // Handle leave request approval/rejection
  const handleStatusChange = (requestId: number, newStatus: 'approved' | 'rejected') => {
    // In a real app, this would call an API to update the status
    console.log(`Changing request ${requestId} status to ${newStatus}`);
  };
  
  // Handle new leave request submission
  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to create a new leave request
    console.log('New leave request submitted');
  };

  return (
    <div className="grid grid-cols-1 gap-lg">
      {/* Leave Balance Card */}
      <div className="card shadow-md">
        <div className="card__header">
          <h3 className="card__title">Your Leave Balance</h3>
        </div>
        <div className="card__body p-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-md p-md">
            {Object.entries(leaveBalance).map(([type, balance]) => (
              <div key={type} className="p-md bg-primary-50 dark:bg-primary-900/20 rounded-lg text-center">
                <h4 className="text-sm font-medium mb-sm">{type}</h4>
                <p className="text-2xl font-bold">{balance}</p>
                <p className="text-xs text-muted">days remaining</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tabs for Leave Management */}
      <div className="card shadow-md">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <button 
              className={`p-md font-medium ${activeTab === 'requests' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
              onClick={() => setActiveTab('requests')}
            >
              Leave Requests
            </button>
            <button 
              className={`p-md font-medium ${activeTab === 'apply' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
              onClick={() => setActiveTab('apply')}
            >
              Apply for Leave
            </button>
            {canManageLeaves && (
              <button 
                className={`p-md font-medium ${activeTab === 'approval' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
                onClick={() => setActiveTab('approval')}
              >
                Approvals
              </button>
            )}
          </div>
        </div>
        
        <div className="card__body">
          {/* Leave Requests Tab */}
          {activeTab === 'requests' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-lg">
                <h3 className="text-lg font-medium">Your Leave Requests</h3>
                <div className="mt-sm sm:mt-0">
                  <select 
                    className="form-control"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary-50 dark:bg-bg-dark-tertiary">
                    <tr>
                      <th className="text-left p-md">Leave Type</th>
                      <th className="text-left p-md">From</th>
                      <th className="text-left p-md">To</th>
                      <th className="text-left p-md">Duration</th>
                      <th className="text-left p-md">Status</th>
                      <th className="text-left p-md">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request) => (
                        <tr key={request.id} className="border-b">
                          <td className="p-md">{request.leaveType}</td>
                          <td className="p-md">{formatDate(request.startDate)}</td>
                          <td className="p-md">{formatDate(request.endDate)}</td>
                          <td className="p-md">{request.duration} day{request.duration !== 1 ? 's' : ''}</td>
                          <td className="p-md">
                            <span className={`badge badge--${getStatusBadgeClass(request.status)}`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </td>
                          <td className="p-md">
                            {request.status === 'pending' && (
                              <button className="button button--danger button--sm">
                                Cancel
                              </button>
                            )}
                            {request.status === 'approved' && (
                              <span className="text-sm text-muted">
                                Approved by {request.approverName}
                              </span>
                            )}
                            {request.status === 'rejected' && (
                              <button className="button button--secondary button--sm">
                                View Reason
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-xl text-center text-muted">
                          No leave requests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Apply for Leave Tab */}
          {activeTab === 'apply' && (
            <div>
              <h3 className="text-lg font-medium mb-lg">Apply for Leave</h3>
              
              <form onSubmit={handleSubmitLeave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-lg">
                  <div className="form-group">
                    <label className="form-label">Leave Type</label>
                    <select className="form-control">
                      {leaveTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                          {type.name} ({leaveBalance[type.name] || 0} days remaining)
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <select className="form-control">
                      <option value="full">Full Day</option>
                      <option value="half-first">Half Day (First Half)</option>
                      <option value="half-second">Half Day (Second Half)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" required />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-control" required />
                  </div>
                  
                  <div className="md:col-span-2 form-group">
                    <label className="form-label">Reason</label>
                    <textarea 
                      className="form-control" 
                      rows={4}
                      placeholder="Please provide a reason for your leave request"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button type="button" className="button button--secondary button--md mr-sm">
                    Cancel
                  </button>
                  <button type="submit" className="button button--primary button--md">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Approval Tab (for Admin/HR/Manager) */}
          {activeTab === 'approval' && canManageLeaves && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-lg">
                <h3 className="text-lg font-medium">Leave Requests Awaiting Approval</h3>
                <div className="mt-sm sm:mt-0">
                  <select 
                    className="form-control"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="all">All Statuses</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary-50 dark:bg-bg-dark-tertiary">
                    <tr>
                      <th className="text-left p-md">Employee</th>
                      <th className="text-left p-md">Leave Type</th>
                      <th className="text-left p-md">Duration</th>
                      <th className="text-left p-md">Dates</th>
                      <th className="text-left p-md">Status</th>
                      <th className="text-left p-md">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request) => (
                        <tr key={request.id} className="border-b">
                          <td className="p-md">
                            <div className="flex items-center">
                              <div className="avatar avatar--sm avatar--primary mr-sm">
                                <span>{request.employeeName.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                              </div>
                              <div>
                                <div className="font-medium">{request.employeeName}</div>
                                <div className="text-xs text-muted">{request.department}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-md">{request.leaveType}</td>
                          <td className="p-md">{request.duration} day{request.duration !== 1 ? 's' : ''}</td>
                          <td className="p-md">
                            <div>{formatDate(request.startDate)}</div>
                            <div>to {formatDate(request.endDate)}</div>
                          </td>
                          <td className="p-md">
                            <span className={`badge badge--${getStatusBadgeClass(request.status)}`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </td>
                          <td className="p-md">
                            {request.status === 'pending' && (
                              <div className="flex">
                                <button 
                                  className="button button--success button--sm mr-xs"
                                  onClick={() => handleStatusChange(request.id, 'approved')}
                                >
                                  Approve
                                </button>
                                <button 
                                  className="button button--danger button--sm"
                                  onClick={() => handleStatusChange(request.id, 'rejected')}
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                            {request.status !== 'pending' && (
                              <button className="button button--secondary button--sm">
                                View Details
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-xl text-center text-muted">
                          No leave requests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to determine badge class based on status
function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'approved':
      return 'success';
    case 'rejected':
      return 'danger';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'secondary';
    default:
      return 'default';
  }
}

export default LeaveManagement;
