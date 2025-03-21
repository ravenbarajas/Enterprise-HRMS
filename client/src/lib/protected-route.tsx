import React from 'react';
import { Route, Redirect } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/data/types';

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType;
  roles?: UserRole[];
}

/**
 * Protected Route component that checks authentication and role-based access control
 * @param path - The route path
 * @param component - The component to render
 * @param roles - Optional array of roles that can access this route
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  path, 
  component: Component,
  roles = []
}) => {
  const { user, isLoading, hasPermission } = useAuth();
  
  return (
    <Route path={path}>
      {() => {
        // If still loading authentication status, show loading state
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <i className="fas fa-spinner fa-spin text-3xl text-primary mb-md"></i>
                <p>Loading...</p>
              </div>
            </div>
          );
        }
        
        // If not authenticated, redirect to login
        if (!user) {
          return <Redirect to="/auth" />;
        }
        
        // If roles are specified and user doesn't have required role, show access denied
        if (roles.length > 0 && !hasPermission(roles)) {
          return (
            <div className="flex items-center justify-center min-h-screen p-md">
              <div className="card shadow-md p-lg text-center max-w-md">
                <div className="text-warning mb-sm">
                  <i className="fas fa-lock text-3xl"></i>
                </div>
                <h3 className="text-lg font-medium mb-sm">Access Restricted</h3>
                <p className="text-muted mb-md">
                  You don't have permission to access this page. Please contact your administrator if you believe this is an error.
                </p>
                <button 
                  className="button button--primary button--md"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          );
        }
        
        // User is authenticated and has the right role, render the component
        return <Component />;
      }}
    </Route>
  );
};
