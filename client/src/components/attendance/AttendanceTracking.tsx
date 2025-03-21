import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/hooks/useAuth';
import { AttendanceRecord } from '@/data/types';

interface AttendanceTrackingProps {
  attendanceRecords: AttendanceRecord[];
}

const AttendanceTracking: React.FC<AttendanceTrackingProps> = ({ attendanceRecords }) => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  
  // In a real app, we'd check if the user is already clocked in for today
  // For the prototype, we'll simulate this
  
  const handleClockIn = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClockedIn(true);
    setClockInTime(timeStr);
  };
  
  const handleClockOut = () => {
    setClockedIn(false);
  };
  
  // Helper to get class for calendar day based on attendance
  const getDayClass = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const record = attendanceRecords.find(rec => rec.date === dateString);
    
    if (!record) return '';
    
    if (record.status === 'present') return 'bg-success-50 dark:bg-success-900/20 text-success';
    if (record.status === 'absent') return 'bg-danger-50 dark:bg-danger-900/20 text-danger';
    if (record.status === 'late') return 'bg-warning-50 dark:bg-warning-900/20 text-warning';
    if (record.status === 'half-day') return 'bg-primary-50 dark:bg-primary-900/20 text-primary';
    
    return '';
  };
  
  // Get selected day's attendance record
  const getSelectedDayRecord = () => {
    if (!selectedDate) return null;
    
    const dateString = selectedDate.toISOString().split('T')[0];
    return attendanceRecords.find(rec => rec.date === dateString);
  };
  
  const selectedRecord = getSelectedDayRecord();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
      <div className="md:col-span-2 card shadow-md">
        <div className="card__header">
          <h3 className="card__title">Attendance Calendar</h3>
        </div>
        <div className="card__body">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              present: (date) => {
                const dateString = date.toISOString().split('T')[0];
                const record = attendanceRecords.find(rec => rec.date === dateString);
                return record?.status === 'present' || false;
              },
              absent: (date) => {
                const dateString = date.toISOString().split('T')[0];
                const record = attendanceRecords.find(rec => rec.date === dateString);
                return record?.status === 'absent' || false;
              },
              late: (date) => {
                const dateString = date.toISOString().split('T')[0];
                const record = attendanceRecords.find(rec => rec.date === dateString);
                return record?.status === 'late' || false;
              },
              halfDay: (date) => {
                const dateString = date.toISOString().split('T')[0];
                const record = attendanceRecords.find(rec => rec.date === dateString);
                return record?.status === 'half-day' || false;
              }
            }}
            modifiersClassNames={{
              present: 'bg-success-50 dark:bg-success-900/20 text-success',
              absent: 'bg-danger-50 dark:bg-danger-900/20 text-danger',
              late: 'bg-warning-50 dark:bg-warning-900/20 text-warning',
              halfDay: 'bg-primary-50 dark:bg-primary-900/20 text-primary'
            }}
          />
          
          <div className="mt-lg flex flex-wrap gap-sm">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-success mr-xs"></span>
              <span className="text-sm">Present</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-danger mr-xs"></span>
              <span className="text-sm">Absent</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-warning mr-xs"></span>
              <span className="text-sm">Late</span>
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-primary mr-xs"></span>
              <span className="text-sm">Half Day</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        {/* Check-in/Check-out Card */}
        <div className="card shadow-md mb-lg">
          <div className="card__header">
            <h3 className="card__title">Check In/Out</h3>
          </div>
          <div className="card__body">
            <div className="text-center">
              <div className="mb-md">
                <div className="text-md text-muted">Today</div>
                <div className="text-2xl font-bold">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
              </div>
              
              <div className="mb-lg text-4xl font-bold">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              
              {!clockedIn ? (
                <button 
                  className="button button--success button--lg button--full mb-sm"
                  onClick={handleClockIn}
                >
                  <i className="fas fa-sign-in-alt mr-sm"></i> Clock In
                </button>
              ) : (
                <>
                  <div className="mb-md">
                    <div className="text-sm text-muted">Clocked in at</div>
                    <div className="text-lg font-semibold">{clockInTime}</div>
                  </div>
                  <button 
                    className="button button--danger button--lg button--full"
                    onClick={handleClockOut}
                  >
                    <i className="fas fa-sign-out-alt mr-sm"></i> Clock Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Selected Day Details */}
        <div className="card shadow-md">
          <div className="card__header">
            <h3 className="card__title">Selected Day Details</h3>
          </div>
          <div className="card__body">
            {selectedDate && (
              <div>
                <h4 className="font-medium mb-sm">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                </h4>
                
                {selectedRecord ? (
                  <div className="space-y-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Status:</span>
                      <span className={`badge badge--${getStatusBadgeClass(selectedRecord.status)}`}>
                        {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Clock In:</span>
                      <span>{selectedRecord.clockIn || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Clock Out:</span>
                      <span>{selectedRecord.clockOut || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Working Hours:</span>
                      <span>{selectedRecord.workingHours || '-'}</span>
                    </div>
                    {selectedRecord.notes && (
                      <div className="pt-sm border-t">
                        <div className="text-muted mb-xs">Notes:</div>
                        <p className="text-sm">{selectedRecord.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-lg text-muted">
                    No attendance record for this date.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine badge class based on status
function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'present':
      return 'success';
    case 'absent':
      return 'danger';
    case 'late':
      return 'warning';
    case 'half-day':
      return 'primary';
    default:
      return 'default';
  }
}

export default AttendanceTracking;
