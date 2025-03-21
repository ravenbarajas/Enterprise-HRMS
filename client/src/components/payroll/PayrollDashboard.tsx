import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import ChartCard from '../common/ChartCard';
import { useAuth } from '@/hooks/useAuth';
import { PayrollData, PayrollDeduction, Payslip } from '@/data/types';
import { formatCurrency } from '@/utils/dateUtils';

interface PayrollDashboardProps {
  payrollData: PayrollData;
  payslips: Payslip[];
}

const PayrollDashboard: React.FC<PayrollDashboardProps> = ({ payrollData, payslips }) => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(
    payslips.length > 0 ? payslips[0] : null
  );
  
  // Colors for pie chart
  const COLORS = ['#0F6FFF', '#6E56CF', '#10B981', '#F59E0B', '#EF4444'];
  
  // Format compensation history data for the chart
  const compensationHistory = payrollData.compensationHistory.map((item) => ({
    ...item,
    net: item.grossSalary - item.totalDeductions
  }));
  
  // Calculate total deductions
  const totalDeductions = selectedPayslip?.deductions.reduce(
    (total, deduction) => total + deduction.amount, 
    0
  ) || 0;
  
  // Deductions data for pie chart
  const deductionsData = selectedPayslip?.deductions.map((deduction) => ({
    name: deduction.name,
    value: deduction.amount
  })) || [];

  return (
    <div className="grid grid-cols-1 gap-lg">
      {/* Salary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        <div className="card shadow-md">
          <div className="card__header">
            <h3 className="card__title">Gross Salary</h3>
          </div>
          <div className="card__body text-center">
            <div className="text-3xl font-bold text-primary mb-sm">
              {formatCurrency(payrollData.currentSalary.gross)}
            </div>
            <p className="text-sm text-muted">Per Month</p>
          </div>
        </div>
        
        <div className="card shadow-md">
          <div className="card__header">
            <h3 className="card__title">Net Salary</h3>
          </div>
          <div className="card__body text-center">
            <div className="text-3xl font-bold text-success mb-sm">
              {formatCurrency(payrollData.currentSalary.net)}
            </div>
            <p className="text-sm text-muted">After Deductions</p>
          </div>
        </div>
        
        <div className="card shadow-md">
          <div className="card__header">
            <h3 className="card__title">YTD Earnings</h3>
          </div>
          <div className="card__body text-center">
            <div className="text-3xl font-bold text-secondary mb-sm">
              {formatCurrency(payrollData.ytdEarnings)}
            </div>
            <p className="text-sm text-muted">Year to Date</p>
          </div>
        </div>
      </div>
      
      {/* Compensation History Chart */}
      <ChartCard 
        title="Compensation History"
        actions={
          <select 
            className="form-control text-sm"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="current">This Year</option>
            <option value="previous">Last Year</option>
            <option value="all">All Time</option>
          </select>
        }
      >
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={compensationHistory}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, '']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar name="Gross Salary" dataKey="grossSalary" fill="#0F6FFF" />
              <Bar name="Net Salary" dataKey="net" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
      
      {/* Payslip and Deductions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Payslip */}
        <div className="card shadow-md">
          <div className="card__header flex justify-between items-center">
            <h3 className="card__title">Payslip</h3>
            <select 
              className="form-control text-sm w-auto"
              onChange={(e) => {
                const selected = payslips.find(p => p.id.toString() === e.target.value);
                if (selected) setSelectedPayslip(selected);
              }}
              value={selectedPayslip?.id || ''}
            >
              {payslips.map((payslip) => (
                <option key={payslip.id} value={payslip.id}>
                  {payslip.period}
                </option>
              ))}
            </select>
          </div>
          <div className="card__body">
            {selectedPayslip ? (
              <div>
                <div className="mb-lg">
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-md rounded-md mb-md">
                    <h4 className="font-medium mb-sm">Pay Period</h4>
                    <p>{selectedPayslip.period}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-md">
                    <div>
                      <h4 className="text-sm font-medium text-muted mb-xs">Payment Date</h4>
                      <p>{selectedPayslip.paymentDate}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted mb-xs">Payment Method</h4>
                      <p>{selectedPayslip.paymentMethod}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-md mb-md">
                  <h4 className="font-medium mb-sm">Earnings</h4>
                  <div className="space-y-sm">
                    <div className="flex justify-between">
                      <span>Basic Salary</span>
                      <span>{formatCurrency(selectedPayslip.basicSalary)}</span>
                    </div>
                    {selectedPayslip.allowances.map((allowance, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{allowance.name}</span>
                        <span>{formatCurrency(allowance.amount)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-semibold border-t pt-sm">
                      <span>Total Earnings</span>
                      <span>{formatCurrency(selectedPayslip.totalEarnings)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-md mb-md">
                  <h4 className="font-medium mb-sm">Deductions</h4>
                  <div className="space-y-sm">
                    {selectedPayslip.deductions.map((deduction, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{deduction.name}</span>
                        <span>{formatCurrency(deduction.amount)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-semibold border-t pt-sm">
                      <span>Total Deductions</span>
                      <span>{formatCurrency(totalDeductions)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-50 dark:bg-primary-900/20 p-md rounded-md">
                  <div className="flex justify-between font-bold">
                    <span>Net Pay</span>
                    <span>{formatCurrency(selectedPayslip.netPay)}</span>
                  </div>
                </div>
                
                <div className="mt-lg flex justify-end">
                  <button className="button button--secondary button--md mr-sm">
                    <i className="fas fa-download mr-xs"></i> Download
                  </button>
                  <button className="button button--primary button--md">
                    <i className="fas fa-print mr-xs"></i> Print
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-xl text-muted">
                No payslip available.
              </div>
            )}
          </div>
        </div>
        
        {/* Deductions Breakdown */}
        <div className="card shadow-md">
          <div className="card__header">
            <h3 className="card__title">Deductions Breakdown</h3>
          </div>
          <div className="card__body">
            {selectedPayslip && selectedPayslip.deductions.length > 0 ? (
              <>
                <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deductionsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {deductionsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${formatCurrency(value as number)}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-md">
                  <h4 className="font-medium mb-sm">Deductions Summary</h4>
                  <div className="space-y-sm">
                    {selectedPayslip.deductions.map((deduction, index) => (
                      <div key={index} className="flex items-center">
                        <span 
                          className="h-3 w-3 rounded-full mr-sm" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="flex-1">{deduction.name}</span>
                        <span className="font-medium">{formatCurrency(deduction.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-xl text-muted">
                No deductions data available.
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Tax and Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div className="card shadow-md">
          <div className="card__header">
            <h3 className="card__title">Tax Information</h3>
          </div>
          <div className="card__body">
            <div className="space-y-md">
              <div>
                <h4 className="text-sm font-medium text-muted mb-sm">Tax Bracket</h4>
                <div className="flex items-center">
                  <div className="h-2 bg-primary flex-1 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-300" 
                      style={{ width: `${payrollData.taxInfo.bracketPercentage}%` }}
                    ></div>
                  </div>
                  <span className="ml-sm font-semibold">{payrollData.taxInfo.bracketPercentage}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <h4 className="text-sm font-medium text-muted mb-xs">YTD Tax Paid</h4>
                  <p className="font-semibold">{formatCurrency(payrollData.taxInfo.ytdTaxPaid)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted mb-xs">Estimated Annual Tax</h4>
                  <p className="font-semibold">{formatCurrency(payrollData.taxInfo.estimatedAnnualTax)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted mb-xs">Tax Identification Number</h4>
                <p>{payrollData.taxInfo.taxId}</p>
              </div>
            </div>
            
            <div className="mt-lg">
              <button className="button button--primary button--md">
                <i className="fas fa-calculator mr-xs"></i> Tax Calculator
              </button>
            </div>
          </div>
        </div>
        
        <div className="card shadow-md">
          <div className="card__header">
            <h3 className="card__title">Benefits & Bonuses</h3>
          </div>
          <div className="card__body">
            <div className="space-y-md">
              {payrollData.benefits.map((benefit, index) => (
                <div key={index} className="p-md border rounded-md">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{benefit.name}</h4>
                    <span className={`badge badge--${benefit.status === 'Active' ? 'success' : 'warning'}`}>
                      {benefit.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted mt-xs">{benefit.description}</p>
                  {benefit.value && (
                    <div className="mt-sm font-semibold">{formatCurrency(benefit.value)}</div>
                  )}
                </div>
              ))}
              
              {payrollData.benefits.length === 0 && (
                <div className="text-center py-lg text-muted">
                  No benefits information available.
                </div>
              )}
            </div>
            
            <div className="mt-lg">
              <button className="button button--secondary button--md">
                <i className="fas fa-gift mr-xs"></i> View All Benefits
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollDashboard;
