import { createContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

export type UserRole = 'admin' | 'hr' | 'manager' | 'employee';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRoles: UserRole[]) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('hrms_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('hrms_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUsers = {
        admin: {
          id: 1,
          name: 'John Doe',
          email: 'admin@company.com',
          role: 'admin' as UserRole,
          department: 'Administration',
          position: 'System Administrator'
        },
        hr: {
          id: 2,
          name: 'Jane Smith',
          email: 'hr@company.com',
          role: 'hr' as UserRole,
          department: 'Human Resources',
          position: 'HR Manager'
        },
        manager: {
          id: 3,
          name: 'Robert Johnson',
          email: 'manager@company.com',
          role: 'manager' as UserRole,
          department: 'Engineering',
          position: 'Department Manager'
        },
        employee: {
          id: 4,
          name: 'Emily Davis',
          email: 'employee@company.com',
          role: 'employee' as UserRole,
          department: 'Marketing',
          position: 'Marketing Specialist'
        }
      };
      
      // Check if email/password is correct (simplified for prototype)
      if (email && password) {
        const userData = mockUsers[role];
        if (userData) {
          setUser(userData);
          localStorage.setItem('hrms_user', JSON.stringify(userData));
          
          toast({
            title: 'Login successful',
            description: `Welcome back, ${userData.name}`,
          });
          
          navigate('/dashboard');
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        throw new Error('Please enter email and password');
      }
    } catch (error) {
      let message = 'Login failed';
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: 'Authentication Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrms_user');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
    navigate('/auth');
  };

  const hasPermission = (requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    
    // Role hierarchy: admin > hr > manager > employee
    const roleWeight = {
      admin: 4,
      hr: 3,
      manager: 2,
      employee: 1
    };
    
    const userRoleWeight = roleWeight[user.role] || 0;
    
    // Check if the user's role weight is sufficient for any of the required roles
    return requiredRoles.some(role => {
      const requiredWeight = roleWeight[role] || 0;
      return userRoleWeight >= requiredWeight;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};
