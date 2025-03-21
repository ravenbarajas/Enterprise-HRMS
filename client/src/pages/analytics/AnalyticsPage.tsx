import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AnalyticsCenter from '@/components/analytics/AnalyticsCenter';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsData } from '@/data/types';
import { mockAnalyticsData } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';

const AnalyticsPage: React.FC = () => {
  const { hasPermission } = useAuth();
  
  // Check if user has permission to view analytics
  const canViewAnalytics = hasPermission(['admin', 'hr']);
  
  // In a real app, this would be a query to an API
  const { data: analyticsData, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics'],
    // For the prototype, we'll just return the mock data
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      return mockAnalyticsData;
    },
    enabled: canViewAnalytics
  });

  return (
    <MainLayout 
      title="HR Analytics"
      breadcrumbItems={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Analytics' }
      ]}
    >
      {!canViewAnalytics ? (
        <div className="card shadow-md p-lg text-center">
          <div className="text-warning mb-sm">
            <i className="fas fa-lock text-3xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-sm">Access Restricted</h3>
          <p className="text-muted">
            You don't have permission to view analytics data. Please contact your administrator for access.
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center p-xl">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary mb-md"></i>
            <p>Loading analytics data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="card shadow-md p-lg text-center">
          <div className="text-danger mb-sm">
            <i className="fas fa-exclamation-triangle text-3xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-sm">Error Loading Analytics</h3>
          <p className="text-muted">
            There was a problem loading the analytics data. Please try again later.
          </p>
          <button className="button button--primary button--md mt-md">
            Retry
          </button>
        </div>
      ) : (
        <AnalyticsCenter analyticsData={analyticsData!} />
      )}
    </MainLayout>
  );
};

export default AnalyticsPage;
