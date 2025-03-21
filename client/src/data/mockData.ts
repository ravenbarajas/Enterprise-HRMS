import { 
  Employee, 
  EmployeeDocument, 
  EmergencyContact, 
  EmployeeSkill,
  AttendanceRecord, 
  LeaveRequest, 
  LeaveType,
  PayrollData,
  Payslip,
  AnalyticsData
} from './types';

// Mock Employees Data
export const mockEmployees: Employee[] = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: 'John Doe',
    position: 'System Administrator',
    department: 'IT',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    status: 'Active',
    joinDate: '2019-03-15',
    dateOfBirth: '1985-06-12',
    gender: 'Male',
    maritalStatus: 'Married',
    employeeType: 'Full-time',
    reportsTo: 'Jane Smith'
  },
  {
    id: 2,
    employeeId: 'EMP002',
    name: 'Jane Smith',
    position: 'HR Manager',
    department: 'Human Resources',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 123-4568',
    address: '456 Park Ave, New York, NY 10002',
    status: 'Active',
    joinDate: '2018-01-10',
    dateOfBirth: '1982-09-21',
    gender: 'Female',
    maritalStatus: 'Single',
    employeeType: 'Full-time',
    reportsTo: 'Michael Wilson'
  },
  {
    id: 3,
    employeeId: 'EMP003',
    name: 'Robert Johnson',
    position: 'Department Manager',
    department: 'Engineering',
    email: 'robert.johnson@company.com',
    phone: '+1 (555) 123-4569',
    address: '789 Broadway, New York, NY 10003',
    status: 'Active',
    joinDate: '2017-11-05',
    dateOfBirth: '1980-03-17',
    gender: 'Male',
    maritalStatus: 'Married',
    employeeType: 'Full-time',
    reportsTo: 'Michael Wilson'
  },
  {
    id: 4,
    employeeId: 'EMP004',
    name: 'Emily Davis',
    position: 'Marketing Specialist',
    department: 'Marketing',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 123-4570',
    address: '101 5th Ave, New York, NY 10004',
    status: 'Active',
    joinDate: '2020-02-20',
    dateOfBirth: '1990-11-30',
    gender: 'Female',
    maritalStatus: 'Single',
    employeeType: 'Full-time',
    reportsTo: 'Sarah Johnson'
  },
  {
    id: 5,
    employeeId: 'EMP005',
    name: 'Michael Wilson',
    position: 'CEO',
    department: 'Executive',
    email: 'michael.wilson@company.com',
    phone: '+1 (555) 123-4571',
    address: '222 Wall St, New York, NY 10005',
    status: 'Active',
    joinDate: '2015-08-01',
    dateOfBirth: '1975-05-10',
    gender: 'Male',
    maritalStatus: 'Married',
    employeeType: 'Full-time',
    reportsTo: 'Board of Directors'
  },
  {
    id: 6,
    employeeId: 'EMP006',
    name: 'Sarah Johnson',
    position: 'Marketing Director',
    department: 'Marketing',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4572',
    address: '333 Madison Ave, New York, NY 10006',
    status: 'Active',
    joinDate: '2016-09-15',
    dateOfBirth: '1978-12-05',
    gender: 'Female',
    maritalStatus: 'Divorced',
    employeeType: 'Full-time',
    reportsTo: 'Michael Wilson'
  },
  {
    id: 7,
    employeeId: 'EMP007',
    name: 'David Brown',
    position: 'Software Developer',
    department: 'IT',
    email: 'david.brown@company.com',
    phone: '+1 (555) 123-4573',
    address: '444 Lexington Ave, New York, NY 10007',
    status: 'On Leave',
    joinDate: '2019-11-10',
    dateOfBirth: '1992-07-22',
    gender: 'Male',
    maritalStatus: 'Single',
    employeeType: 'Full-time',
    reportsTo: 'Robert Johnson'
  },
  {
    id: 8,
    employeeId: 'EMP008',
    name: 'Jennifer Lee',
    position: 'Financial Analyst',
    department: 'Finance',
    email: 'jennifer.lee@company.com',
    phone: '+1 (555) 123-4574',
    address: '555 Pearl St, New York, NY 10008',
    status: 'Active',
    joinDate: '2020-06-01',
    dateOfBirth: '1989-03-15',
    gender: 'Female',
    maritalStatus: 'Single',
    employeeType: 'Full-time',
    reportsTo: 'William Chen'
  },
  {
    id: 9,
    employeeId: 'EMP009',
    name: 'William Chen',
    position: 'Finance Director',
    department: 'Finance',
    email: 'william.chen@company.com',
    phone: '+1 (555) 123-4575',
    address: '666 Water St, New York, NY 10009',
    status: 'Active',
    joinDate: '2017-05-20',
    dateOfBirth: '1976-09-30',
    gender: 'Male',
    maritalStatus: 'Married',
    employeeType: 'Full-time',
    reportsTo: 'Michael Wilson'
  },
  {
    id: 10,
    employeeId: 'EMP010',
    name: 'Lisa Garcia',
    position: 'UX Designer',
    department: 'IT',
    email: 'lisa.garcia@company.com',
    phone: '+1 (555) 123-4576',
    address: '777 Front St, New York, NY 10010',
    status: 'Inactive',
    joinDate: '2018-07-10',
    dateOfBirth: '1990-11-12',
    gender: 'Female',
    maritalStatus: 'Single',
    employeeType: 'Full-time',
    reportsTo: 'Robert Johnson'
  }
];

// Mock Employee Documents
export const mockEmployeeDocuments: EmployeeDocument[] = [
  {
    id: 1,
    employeeId: 1,
    name: 'Passport',
    type: 'Identity Document',
    uploadDate: '2019-03-15',
    expiryDate: '2029-03-14'
  },
  {
    id: 2,
    employeeId: 1,
    name: 'Driver\'s License',
    type: 'Identity Document',
    uploadDate: '2019-03-15',
    expiryDate: '2025-06-11'
  },
  {
    id: 3,
    employeeId: 1,
    name: 'Bachelor\'s Degree - Computer Science',
    type: 'Educational Certificate',
    uploadDate: '2019-03-15'
  },
  {
    id: 4,
    employeeId: 1,
    name: 'CISSP Certification',
    type: 'Professional Certificate',
    uploadDate: '2020-07-22',
    expiryDate: '2023-07-22'
  },
  {
    id: 5,
    employeeId: 2,
    name: 'Passport',
    type: 'Identity Document',
    uploadDate: '2018-01-10',
    expiryDate: '2028-01-09'
  },
  {
    id: 6,
    employeeId: 2,
    name: 'HR Certification',
    type: 'Professional Certificate',
    uploadDate: '2018-01-10',
    expiryDate: '2024-01-10'
  }
];

// Mock Emergency Contacts
export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: 1,
    employeeId: 1,
    name: 'Mary Doe',
    relationship: 'Spouse',
    phone: '+1 (555) 987-6543',
    email: 'mary.doe@example.com',
    address: '123 Main St, New York, NY 10001'
  },
  {
    id: 2,
    employeeId: 1,
    name: 'James Doe',
    relationship: 'Father',
    phone: '+1 (555) 876-5432',
    email: 'james.doe@example.com',
    address: '234 Oak St, Buffalo, NY 14201'
  },
  {
    id: 3,
    employeeId: 2,
    name: 'Thomas Smith',
    relationship: 'Brother',
    phone: '+1 (555) 765-4321',
    email: 'thomas.smith@example.com',
    address: '456 Park Ave, New York, NY 10002'
  }
];

// Mock Employee Skills
export const mockEmployeeSkills: EmployeeSkill[] = [
  {
    id: 1,
    employeeId: 1,
    name: 'Network Administration',
    level: 'Expert',
    description: 'Setup and management of enterprise networks',
    certification: 'Cisco Certified Network Professional (CCNP)'
  },
  {
    id: 2,
    employeeId: 1,
    name: 'Windows Server Administration',
    level: 'Expert',
    description: 'Installation, configuration and management of Windows Server environments',
    certification: 'Microsoft Certified: Windows Server'
  },
  {
    id: 3,
    employeeId: 1,
    name: 'Linux Administration',
    level: 'Advanced',
    description: 'Installation, configuration and management of Linux environments',
    certification: 'Red Hat Certified Engineer (RHCE)'
  },
  {
    id: 4,
    employeeId: 1,
    name: 'Cloud Services (AWS)',
    level: 'Intermediate',
    description: 'Design and implementation of AWS cloud solutions',
    certification: 'AWS Certified Solutions Architect - Associate'
  },
  {
    id: 5,
    employeeId: 2,
    name: 'Recruitment',
    level: 'Expert',
    description: 'Full-cycle recruitment process',
    certification: 'PHR (Professional in Human Resources)'
  },
  {
    id: 6,
    employeeId: 2,
    name: 'Employee Relations',
    level: 'Expert',
    description: 'Conflict resolution and employee engagement',
    certification: 'SHRM-CP'
  },
  {
    id: 7,
    employeeId: 2,
    name: 'Benefits Administration',
    level: 'Advanced',
    description: 'Design and administration of employee benefits',
    certification: 'CEBS (Certified Employee Benefit Specialist)'
  }
];

// Mock Attendance Records
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    employeeId: 1,
    date: '2023-08-01',
    status: 'present',
    clockIn: '09:00 AM',
    clockOut: '05:30 PM',
    workingHours: '8.5'
  },
  {
    id: 2,
    employeeId: 1,
    date: '2023-08-02',
    status: 'present',
    clockIn: '09:15 AM',
    clockOut: '05:45 PM',
    workingHours: '8.5'
  },
  {
    id: 3,
    employeeId: 1,
    date: '2023-08-03',
    status: 'late',
    clockIn: '10:00 AM',
    clockOut: '06:00 PM',
    workingHours: '8.0',
    notes: 'Public transport delay'
  },
  {
    id: 4,
    employeeId: 1,
    date: '2023-08-04',
    status: 'present',
    clockIn: '08:45 AM',
    clockOut: '05:15 PM',
    workingHours: '8.5'
  },
  {
    id: 5,
    employeeId: 1,
    date: '2023-08-05',
    status: 'half-day',
    clockIn: '09:00 AM',
    clockOut: '01:00 PM',
    workingHours: '4.0',
    notes: 'Doctor appointment'
  },
  {
    id: 6,
    employeeId: 1,
    date: '2023-08-06',
    status: 'absent',
    notes: 'Weekend'
  },
  {
    id: 7,
    employeeId: 1,
    date: '2023-08-07',
    status: 'absent',
    notes: 'Weekend'
  },
  {
    id: 8,
    employeeId: 1,
    date: '2023-08-08',
    status: 'present',
    clockIn: '09:00 AM',
    clockOut: '05:30 PM',
    workingHours: '8.5'
  },
  {
    id: 9,
    employeeId: 1,
    date: '2023-08-09',
    status: 'present',
    clockIn: '08:50 AM',
    clockOut: '05:20 PM',
    workingHours: '8.5'
  },
  {
    id: 10,
    employeeId: 1,
    date: '2023-08-10',
    status: 'present',
    clockIn: '09:05 AM',
    clockOut: '05:35 PM',
    workingHours: '8.5'
  }
];

// Mock Leave Requests
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    department: 'IT',
    leaveType: 'Annual Leave',
    startDate: '2023-08-15',
    endDate: '2023-08-18',
    duration: 4,
    reason: 'Family vacation',
    status: 'approved',
    approverName: 'Jane Smith'
  },
  {
    id: 2,
    employeeId: 1,
    employeeName: 'John Doe',
    department: 'IT',
    leaveType: 'Sick Leave',
    startDate: '2023-07-05',
    endDate: '2023-07-05',
    duration: 1,
    reason: 'Not feeling well',
    status: 'approved',
    approverName: 'Jane Smith'
  },
  {
    id: 3,
    employeeId: 1,
    employeeName: 'John Doe',
    department: 'IT',
    leaveType: 'Annual Leave',
    startDate: '2023-09-25',
    endDate: '2023-09-26',
    duration: 2,
    reason: 'Personal matters',
    status: 'pending'
  },
  {
    id: 4,
    employeeId: 2,
    employeeName: 'Jane Smith',
    department: 'Human Resources',
    leaveType: 'Annual Leave',
    startDate: '2023-09-10',
    endDate: '2023-09-14',
    duration: 5,
    reason: 'Family vacation',
    status: 'approved',
    approverName: 'Michael Wilson'
  },
  {
    id: 5,
    employeeId: 3,
    employeeName: 'Robert Johnson',
    department: 'Engineering',
    leaveType: 'Sick Leave',
    startDate: '2023-08-07',
    endDate: '2023-08-08',
    duration: 2,
    reason: 'Flu',
    status: 'approved',
    approverName: 'Michael Wilson'
  },
  {
    id: 6,
    employeeId: 4,
    employeeName: 'Emily Davis',
    department: 'Marketing',
    leaveType: 'Annual Leave',
    startDate: '2023-08-28',
    endDate: '2023-09-01',
    duration: 5,
    reason: 'Travel',
    status: 'pending'
  },
  {
    id: 7,
    employeeId: 7,
    employeeName: 'David Brown',
    department: 'IT',
    leaveType: 'Medical Leave',
    startDate: '2023-08-01',
    endDate: '2023-08-31',
    duration: 31,
    reason: 'Surgery recovery',
    status: 'approved',
    approverName: 'Robert Johnson'
  }
];

// Mock Leave Types
export const mockLeaveTypes: LeaveType[] = [
  {
    id: 1,
    name: 'Annual Leave',
    description: 'Paid time off for vacation or personal matters',
    defaultDays: 20,
    isPaid: true,
    requiresApproval: true
  },
  {
    id: 2,
    name: 'Sick Leave',
    description: 'Leave due to illness or medical appointments',
    defaultDays: 10,
    isPaid: true,
    requiresApproval: true
  },
  {
    id: 3,
    name: 'Medical Leave',
    description: 'Extended leave for medical treatment or recovery',
    defaultDays: 60,
    isPaid: true,
    requiresApproval: true
  },
  {
    id: 4,
    name: 'Unpaid Leave',
    description: 'Leave without pay for personal reasons',
    defaultDays: 30,
    isPaid: false,
    requiresApproval: true
  },
  {
    id: 5,
    name: 'Bereavement Leave',
    description: 'Leave due to death of a family member',
    defaultDays: 5,
    isPaid: true,
    requiresApproval: true
  }
];

// Mock Leave Balance
export const mockLeaveBalance = {
  'Annual Leave': 16,
  'Sick Leave': 9,
  'Medical Leave': 60,
  'Unpaid Leave': 30,
  'Bereavement Leave': 5
};

// Mock Payroll Data
export const mockPayrollData: PayrollData = {
  currentSalary: {
    gross: 8500,
    net: 6375
  },
  ytdEarnings: 51000,
  compensationHistory: [
    { month: 'Jan', grossSalary: 8000, totalDeductions: 2000 },
    { month: 'Feb', grossSalary: 8000, totalDeductions: 2000 },
    { month: 'Mar', grossSalary: 8000, totalDeductions: 2000 },
    { month: 'Apr', grossSalary: 8000, totalDeductions: 2000 },
    { month: 'May', grossSalary: 8500, totalDeductions: 2125 },
    { month: 'Jun', grossSalary: 8500, totalDeductions: 2125 },
    { month: 'Jul', grossSalary: 8500, totalDeductions: 2125 }
  ],
  taxInfo: {
    bracketPercentage: 22,
    ytdTaxPaid: 11220,
    estimatedAnnualTax: 22440,
    taxId: 'TX-9876543'
  },
  benefits: [
    {
      name: 'Health Insurance',
      description: 'Premium health coverage for employee and dependents',
      status: 'Active',
      value: 500
    },
    {
      name: '401(k) Plan',
      description: 'Retirement savings plan with employer matching',
      status: 'Active',
      value: 250
    },
    {
      name: 'Dental Insurance',
      description: 'Dental coverage for employee and dependents',
      status: 'Active',
      value: 100
    },
    {
      name: 'Life Insurance',
      description: 'Life insurance policy with 2x annual salary coverage',
      status: 'Active',
      value: 75
    }
  ]
};

// Mock Payslips
export const mockPayslips: Payslip[] = [
  {
    id: 1,
    employeeId: 1,
    period: 'July 2023',
    paymentDate: 'July 31, 2023',
    paymentMethod: 'Direct Deposit',
    basicSalary: 7500,
    allowances: [
      { name: 'Transportation Allowance', amount: 500 },
      { name: 'Meal Allowance', amount: 300 },
      { name: 'Phone Allowance', amount: 200 }
    ],
    deductions: [
      { name: 'Income Tax', amount: 1870 },
      { name: 'Social Security', amount: 510 },
      { name: 'Health Insurance', amount: 500 },
      { name: '401(k) Contribution', amount: 250 }
    ],
    totalEarnings: 8500,
    netPay: 6375
  },
  {
    id: 2,
    employeeId: 1,
    period: 'June 2023',
    paymentDate: 'June 30, 2023',
    paymentMethod: 'Direct Deposit',
    basicSalary: 7500,
    allowances: [
      { name: 'Transportation Allowance', amount: 500 },
      { name: 'Meal Allowance', amount: 300 },
      { name: 'Phone Allowance', amount: 200 }
    ],
    deductions: [
      { name: 'Income Tax', amount: 1870 },
      { name: 'Social Security', amount: 510 },
      { name: 'Health Insurance', amount: 500 },
      { name: '401(k) Contribution', amount: 250 }
    ],
    totalEarnings: 8500,
    netPay: 6375
  },
  {
    id: 3,
    employeeId: 1,
    period: 'May 2023',
    paymentDate: 'May 31, 2023',
    paymentMethod: 'Direct Deposit',
    basicSalary: 7500,
    allowances: [
      { name: 'Transportation Allowance', amount: 500 },
      { name: 'Meal Allowance', amount: 300 },
      { name: 'Phone Allowance', amount: 200 }
    ],
    deductions: [
      { name: 'Income Tax', amount: 1870 },
      { name: 'Social Security', amount: 510 },
      { name: 'Health Insurance', amount: 500 },
      { name: '401(k) Contribution', amount: 250 }
    ],
    totalEarnings: 8500,
    netPay: 6375
  }
];

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData = {
  employeeTurnover: {
    rate: 3.2,
    trend: -1.5
  },
  averageTenure: {
    years: 4.5,
    trend: 0.8
  },
  costPerEmployee: {
    amount: 85000,
    trend: 2.3
  },
  attendanceRate: {
    rate: 94.5,
    trend: 1.2
  },
  turnoverTrend: [
    { month: 'Jan', rate: 5.2 },
    { month: 'Feb', rate: 4.8 },
    { month: 'Mar', rate: 4.5 },
    { month: 'Apr', rate: 4.2 },
    { month: 'May', rate: 3.8 },
    { month: 'Jun', rate: 3.5 },
    { month: 'Jul', rate: 3.2 }
  ],
  departmentHeadcount: [
    { department: 'IT', count: 45 },
    { department: 'HR', count: 12 },
    { department: 'Finance', count: 18 },
    { department: 'Marketing', count: 25 },
    { department: 'Sales', count: 35 },
    { department: 'Engineering', count: 50 },
    { department: 'Executive', count: 5 },
    { department: 'Operations', count: 22 }
  ],
  recruitmentMetrics: [
    { month: 'Jan', applications: 120, interviews: 30, hires: 5 },
    { month: 'Feb', applications: 150, interviews: 40, hires: 8 },
    { month: 'Mar', applications: 180, interviews: 45, hires: 10 },
    { month: 'Apr', applications: 135, interviews: 35, hires: 7 },
    { month: 'May', applications: 160, interviews: 50, hires: 12 },
    { month: 'Jun', applications: 145, interviews: 42, hires: 9 }
  ],
  genderDistribution: [
    { name: 'Male', value: 55 },
    { name: 'Female', value: 42 },
    { name: 'Non-binary', value: 2 },
    { name: 'Prefer not to say', value: 1 }
  ],
  salaryDistribution: [
    { range: '$30k-$50k', count: 42 },
    { range: '$50k-$70k', count: 68 },
    { range: '$70k-$90k', count: 45 },
    { range: '$90k-$110k', count: 23 },
    { range: '$110k-$130k', count: 12 },
    { range: '$130k+', count: 10 }
  ],
  performanceRatings: [
    { rating: 'Outstanding', percentage: 15 },
    { rating: 'Exceeds Expectations', percentage: 30 },
    { rating: 'Meets Expectations', percentage: 40 },
    { rating: 'Needs Improvement', percentage: 12 },
    { rating: 'Unsatisfactory', percentage: 3 }
  ],
  attendancePatterns: [
    { time: 'Mon', onTime: 92, late: 6, absent: 2 },
    { time: 'Tue', onTime: 95, late: 4, absent: 1 },
    { time: 'Wed', onTime: 90, late: 8, absent: 2 },
    { time: 'Thu', onTime: 93, late: 5, absent: 2 },
    { time: 'Fri', onTime: 88, late: 7, absent: 5 },
    { time: 'Week 1', onTime: 93, late: 5, absent: 2 },
    { time: 'Week 2', onTime: 92, late: 6, absent: 2 },
    { time: 'Week 3', onTime: 94, late: 4, absent: 2 },
    { time: 'Week 4', onTime: 90, late: 7, absent: 3 }
  ]
};
