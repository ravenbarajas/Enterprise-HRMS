/**
 * Format a date string to a more readable format
 * @param dateString - The date string to format
 * @param format - The format to use (default: 'medium')
 */
export const formatDate = (
  dateString: string, 
  format: 'short' | 'medium' | 'long' = 'medium'
): string => {
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric',
      month: format === 'short' ? 'short' : 'long',
      day: 'numeric'
    };
    
    if (format === 'long') {
      options.weekday = 'long';
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a date range to a readable string
 * @param startDate - The start date string
 * @param endDate - The end date string
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = formatDate(startDate, 'short');
  const end = formatDate(endDate, 'short');
  
  return `${start} - ${end}`;
};

/**
 * Calculate the number of days between two dates
 * @param startDate - The start date string
 * @param endDate - The end date string
 */
export const calculateDateDifference = (startDate: string, endDate: string): number => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate the difference in milliseconds
    const diffMs = end.getTime() - start.getTime();
    
    // Convert to days
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    return diffDays + 1; // Include both start and end dates
  } catch (error) {
    console.error('Error calculating date difference:', error);
    return 0;
  }
};

/**
 * Get the current date in ISO format (YYYY-MM-DD)
 */
export const getCurrentDateISO = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

/**
 * Format a currency amount
 * @param amount - The amount to format
 * @param currency - The currency code (default: USD)
 */
export const formatCurrency = (
  amount: number, 
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format a percentage
 * @param value - The value to format as percentage
 * @param decimals - Number of decimal places (default: 1)
 */
export const formatPercentage = (
  value: number, 
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Get the month name from a month number (1-12)
 * @param monthNumber - The month number (1-12)
 */
export const getMonthName = (monthNumber: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return months[monthNumber - 1] || '';
};
