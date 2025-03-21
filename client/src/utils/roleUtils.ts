import { UserRole } from '@/data/types';

/**
 * Determines if a role has permission based on a role hierarchy
 * @param userRole - The user's current role
 * @param requiredRoles - Array of roles that have permission 
 */
export const hasRolePermission = (userRole: UserRole, requiredRoles: UserRole[]): boolean => {
  if (!userRole || !requiredRoles.length) return false;
  
  // Role hierarchy: admin > hr > manager > employee
  const roleWeight: Record<UserRole, number> = {
    admin: 4,
    hr: 3,
    manager: 2,
    employee: 1
  };
  
  const userRoleWeight = roleWeight[userRole] || 0;
  
  // Check if the user's role weight is sufficient for any of the required roles
  return requiredRoles.some(role => {
    const requiredWeight = roleWeight[role] || 0;
    return userRoleWeight >= requiredWeight;
  });
};

/**
 * Get a human-readable role name
 * @param role - The role to format
 */
export const formatRoleName = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'hr':
      return 'HR Manager';
    case 'manager':
      return 'Department Manager';
    case 'employee':
      return 'Employee';
    default:
      return role;
  }
};

/**
 * Check if a route should be accessible to a user
 * @param userRole - The user's current role
 * @param allowedRoles - Roles that can access the route
 */
export const canAccessRoute = (userRole: UserRole, allowedRoles?: UserRole[]): boolean => {
  if (!allowedRoles || allowedRoles.length === 0) {
    // If no roles specified, all authenticated users can access
    return true;
  }
  
  return hasRolePermission(userRole, allowedRoles);
};
