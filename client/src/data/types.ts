// User and Authentication Types
export type UserRole = 'admin' | 'hr' | 'manager' | 'employee';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
}

// Employee Types
export interface Employee {
  id: number;
  employeeId: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  joinDate: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  employeeType: string;
  reportsTo: string;
}

export interface EmployeeDocument {
  id: number;
  employeeId: number;
  name: string;
  type: string;
  uploadDate: string;
  expiryDate?: string;
  fileUrl?: string;
}

export interface EmergencyContact {
  id: number;
  employeeId: number;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
}

export interface EmployeeSkill {
  id: number;
  employeeId: number;
  name: string;
  level: string;
  description: string;
  certification?: string;
}

// Attendance Types
export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  clockIn?: string;
  clockOut?: string;
  workingHours?: string;
  notes?: string;
}

// Leave Management Types
export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approverName?: string;
  approverComments?: string;
}

export interface LeaveType {
  id: number;
  name: string;
  description: string;
  defaultDays: number;
  isPaid: boolean;
  requiresApproval: boolean;
}

// Payroll Types
export interface PayrollData {
  currentSalary: {
    gross: number;
    net: number;
  };
  ytdEarnings: number;
  compensationHistory: {
    month: string;
    grossSalary: number;
    totalDeductions: number;
  }[];
  taxInfo: {
    bracketPercentage: number;
    ytdTaxPaid: number;
    estimatedAnnualTax: number;
    taxId: string;
  };
  benefits: {
    name: string;
    description: string;
    status: string;
    value?: number;
  }[];
}

export interface PayrollDeduction {
  id: number;
  name: string;
  amount: number;
  percentage?: number;
  description?: string;
}

export interface PayrollAllowance {
  id: number;
  name: string;
  amount: number;
  description?: string;
}

export interface Payslip {
  id: number;
  employeeId: number;
  period: string;
  paymentDate: string;
  paymentMethod: string;
  basicSalary: number;
  allowances: {
    name: string;
    amount: number;
  }[];
  deductions: {
    name: string;
    amount: number;
  }[];
  totalEarnings: number;
  netPay: number;
}

// Analytics Types
export interface AnalyticsData {
  employeeTurnover: {
    rate: number;
    trend: number;
  };
  averageTenure: {
    years: number;
    trend: number;
  };
  costPerEmployee: {
    amount: number;
    trend: number;
  };
  attendanceRate: {
    rate: number;
    trend: number;
  };
  turnoverTrend: {
    month: string;
    rate: number;
  }[];
  departmentHeadcount: {
    department: string;
    count: number;
  }[];
  recruitmentMetrics: {
    month: string;
    applications: number;
    interviews: number;
    hires: number;
  }[];
  genderDistribution: {
    name: string;
    value: number;
  }[];
  salaryDistribution: {
    range: string;
    count: number;
  }[];
  performanceRatings: {
    rating: string;
    percentage: number;
  }[];
  attendancePatterns: {
    time: string;
    onTime: number;
    late: number;
    absent: number;
  }[];
}
