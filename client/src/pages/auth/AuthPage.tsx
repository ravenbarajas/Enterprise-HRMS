import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/data/types';

const AuthPage: React.FC = () => {
  const { login, user, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  // Form state
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('employee');
  const [rememberMe, setRememberMe] = useState(false);
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Validation Error',
        description: 'Please enter your email and password',
        variant: 'destructive',
      });
      return;
    }
    
    if (!isLoginForm) {
      // Registration validation
      if (password !== confirmPassword) {
        toast({
          title: 'Validation Error',
          description: 'Passwords do not match',
          variant: 'destructive',
        });
        return;
      }
      
      if (!name) {
        toast({
          title: 'Validation Error',
          description: 'Please enter your name',
          variant: 'destructive',
        });
        return;
      }
      
      // In a real app, this would call an API for registration
      toast({
        title: 'Registration',
        description: 'Registration functionality would be implemented with backend integration',
      });
      
      // Switch to login form after registration
      setIsLoginForm(true);
      return;
    }
    
    // Login process
    try {
      await login(email, password, role);
      // Navigation will happen in the useEffect after successful login
    } catch (error) {
      // Error is handled inside login function
      console.error('Login failed');
    }
  };
  
  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    // Clear form fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-light-secondary dark:bg-bg-dark">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-primary mb-md"></i>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-md bg-bg-light-secondary dark:bg-bg-dark">
        <div className="w-full max-w-md">
          <div className="text-center mb-lg">
            <h1 className="text-3xl font-bold text-primary mb-xs">Enterprise HRMS</h1>
            <p className="text-muted">{isLoginForm ? 'Sign in to your account' : 'Create a new account'}</p>
          </div>
          
          <div className="card shadow-md">
            <div className="card__body p-lg">
              <form onSubmit={handleSubmit}>
                {!isLoginForm && (
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                      id="name"
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                {!isLoginForm && (
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input 
                      id="confirmPassword"
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
                
                {isLoginForm && (
                  <div className="form-group">
                    <label htmlFor="role" className="form-label">Login as</label>
                    <select 
                      id="role"
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                    >
                      <option value="admin">Administrator</option>
                      <option value="hr">HR Manager</option>
                      <option value="manager">Department Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
                )}
                
                {isLoginForm && (
                  <div className="flex items-center justify-between mb-md">
                    <div className="flex items-center">
                      <input 
                        id="remember-me"
                        type="checkbox"
                        className="mr-xs"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label htmlFor="remember-me" className="text-sm">
                        Remember me
                      </label>
                    </div>
                    
                    <a href="#" className="text-sm text-primary hover:text-primary-700 dark:hover:text-primary-300">
                      Forgot password?
                    </a>
                  </div>
                )}
                
                <button 
                  type="submit"
                  className="button button--primary button--md button--full mb-md"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin mr-xs"></i>
                  ) : isLoginForm ? 'Sign In' : 'Register'}
                </button>
                
                <div className="text-center text-sm">
                  <p>
                    {isLoginForm ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      type="button"
                      className="text-primary hover:text-primary-700 dark:hover:text-primary-300"
                      onClick={toggleForm}
                    >
                      {isLoginForm ? 'Register' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          <div className="text-center mt-md">
            <button 
              className="p-sm rounded-full bg-bg-light dark:bg-bg-dark-tertiary"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <i className="fas fa-moon text-secondary"></i>
              ) : (
                <i className="fas fa-sun text-warning"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Right Side - Hero */}
      <div className="hidden lg:flex w-1/2 bg-primary items-center justify-center">
        <div className="max-w-lg text-white p-lg">
          <h1 className="text-4xl font-bold mb-md">Welcome to Enterprise HRMS</h1>
          <p className="text-lg mb-lg">
            A comprehensive human resource management system designed to streamline HR processes and improve organizational efficiency.
          </p>
          
          <div className="space-y-md">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-sm">
                <i className="fas fa-users"></i>
              </div>
              <div>
                <h3 className="font-semibold">Employee Management</h3>
                <p className="text-sm opacity-80">Manage employee profiles, documents, and information</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-sm">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div>
                <h3 className="font-semibold">Attendance Tracking</h3>
                <p className="text-sm opacity-80">Monitor employee attendance and leave management</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-sm">
                <i className="fas fa-chart-bar"></i>
              </div>
              <div>
                <h3 className="font-semibold">HR Analytics</h3>
                <p className="text-sm opacity-80">Gain insights with powerful reporting and analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
