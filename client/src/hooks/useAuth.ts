import { useContext } from 'react';
import { AuthContext, User, UserRole } from '@/context/AuthContext';

/**
 * Custom hook for using the authentication context
 * @returns AuthContext values and methods
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return {
    user: context.user,
    isLoading: context.isLoading,
    login: context.login,
    logout: context.logout,
    hasPermission: context.hasPermission
  };
};

export type { User, UserRole };
