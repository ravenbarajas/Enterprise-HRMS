import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  // Check if user has permission to view settings
  const canAccessSettings = hasPermission(['admin']);
  
  // State for different setting forms
  const [activeTab, setActiveTab] = useState('general');
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    leaveApprovals: true,
    systemUpdates: false,
    newEmployee: true
  });
  
  // Save settings handler
  const handleSaveSettings = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your settings have been saved successfully',
    });
  };

  return (
    <MainLayout 
      title="System Settings"
      breadcrumbItems={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Settings' }
      ]}
    >
      {!canAccessSettings ? (
        <div className="card shadow-md p-lg text-center">
          <div className="text-warning mb-sm">
            <i className="fas fa-lock text-3xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-sm">Access Restricted</h3>
          <p className="text-muted">
            You don't have permission to access system settings. This section is only available to administrators.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
          {/* Settings Sidebar */}
          <div className="md:col-span-1">
            <div className="card shadow-md">
              <div className="p-md">
                <h3 className="text-lg font-medium mb-md">Settings</h3>
                <nav className="space-y-xs">
                  <button 
                    className={`nav-link w-full text-left ${activeTab === 'general' ? 'nav-link--active' : ''}`}
                    onClick={() => setActiveTab('general')}
                  >
                    <span className="nav-link__icon">
                      <i className="fas fa-cog"></i>
                    </span>
                    <span>General</span>
                  </button>
                  <button 
                    className={`nav-link w-full text-left ${activeTab === 'company' ? 'nav-link--active' : ''}`}
                    onClick={() => setActiveTab('company')}
                  >
                    <span className="nav-link__icon">
                      <i className="fas fa-building"></i>
                    </span>
                    <span>Company Profile</span>
                  </button>
                  <button 
                    className={`nav-link w-full text-left ${activeTab === 'users' ? 'nav-link--active' : ''}`}
                    onClick={() => setActiveTab('users')}
                  >
                    <span className="nav-link__icon">
                      <i className="fas fa-users-cog"></i>
                    </span>
                    <span>User Management</span>
                  </button>
                  <button 
                    className={`nav-link w-full text-left ${activeTab === 'notifications' ? 'nav-link--active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    <span className="nav-link__icon">
                      <i className="fas fa-bell"></i>
                    </span>
                    <span>Notifications</span>
                  </button>
                  <button 
                    className={`nav-link w-full text-left ${activeTab === 'security' ? 'nav-link--active' : ''}`}
                    onClick={() => setActiveTab('security')}
                  >
                    <span className="nav-link__icon">
                      <i className="fas fa-shield-alt"></i>
                    </span>
                    <span>Security</span>
                  </button>
                  <button 
                    className={`nav-link w-full text-left ${activeTab === 'system' ? 'nav-link--active' : ''}`}
                    onClick={() => setActiveTab('system')}
                  >
                    <span className="nav-link__icon">
                      <i className="fas fa-server"></i>
                    </span>
                    <span>System</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Settings Content */}
          <div className="md:col-span-3">
            <div className="card shadow-md">
              <div className="card__header border-b">
                <h3 className="card__title">
                  {activeTab === 'general' && 'General Settings'}
                  {activeTab === 'company' && 'Company Profile'}
                  {activeTab === 'users' && 'User Management'}
                  {activeTab === 'notifications' && 'Notification Settings'}
                  {activeTab === 'security' && 'Security Settings'}
                  {activeTab === 'system' && 'System Settings'}
                </h3>
              </div>
              <div className="card__body p-lg">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Application Theme</label>
                      <div className="flex space-x-md">
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name="theme"
                            className="mr-xs" 
                            checked={theme === 'light'}
                            onChange={() => setTheme('light')}
                          />
                          <span>Light</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name="theme"
                            className="mr-xs" 
                            checked={theme === 'dark'}
                            onChange={() => setTheme('dark')}
                          />
                          <span>Dark</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Language</label>
                      <select className="form-control w-full md:w-1/2">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Time Zone</label>
                      <select className="form-control w-full md:w-1/2">
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC">Coordinated Universal Time (UTC)</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                        <option value="UTC+5:30">Indian Standard Time (UTC+5:30)</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Date Format</label>
                      <select className="form-control w-full md:w-1/2">
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Working Days</label>
                      <div className="grid grid-cols-7 gap-sm">
                        <label className="flex flex-col items-center space-y-xs">
                          <input type="checkbox" checked />
                          <span>Mon</span>
                        </label>
                        <label className="flex flex-col items-center space-y-xs">
                          <input type="checkbox" checked />
                          <span>Tue</span>
                        </label>
                        <label className="flex flex-col items-center space-y-xs">
                          <input type="checkbox" checked />
                          <span>Wed</span>
                        </label>
                        <label className="flex flex-col items-center space-y-xs">
                          <input type="checkbox" checked />
                          <span>Thu</span>
                        </label>
                        <label className="flex flex-col items-center space-y-xs">
                          <input type="checkbox" checked />
                          <span>Fri</span>
                        </label>
                        <label className="flex flex-col items-center space-y-xs">
                          <input type="checkbox" />
                          <span>Sat</span>
                        </label>
                        <label className="flex flex-col items-center space-y-xs">
                          <input type="checkbox" />
                          <span>Sun</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Email Notifications</label>
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: e.target.checked
                          })}
                          className="mr-sm"
                        />
                        <span>Enable email notifications</span>
                      </label>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Notification Preferences</label>
                      <div className="space-y-sm">
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.leaveApprovals}
                            onChange={(e) => setNotificationSettings({
                              ...notificationSettings,
                              leaveApprovals: e.target.checked
                            })}
                            className="mr-sm"
                          />
                          <span>Leave approvals and requests</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.systemUpdates}
                            onChange={(e) => setNotificationSettings({
                              ...notificationSettings,
                              systemUpdates: e.target.checked
                            })}
                            className="mr-sm"
                          />
                          <span>System updates and maintenance</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.newEmployee}
                            onChange={(e) => setNotificationSettings({
                              ...notificationSettings,
                              newEmployee: e.target.checked
                            })}
                            className="mr-sm"
                          />
                          <span>New employee onboarding</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Notification Schedule</label>
                      <select className="form-control w-full md:w-1/2">
                        <option value="immediate">Immediate</option>
                        <option value="hourly">Hourly Digest</option>
                        <option value="daily">Daily Digest</option>
                        <option value="weekly">Weekly Digest</option>
                      </select>
                    </div>
                  </div>
                )}
                
                {/* Other tabs would have similar content structures */}
                {(activeTab === 'company' || activeTab === 'users' || activeTab === 'security' || activeTab === 'system') && (
                  <div className="text-center py-xl">
                    <div className="mb-md">
                      <i className="fas fa-tools text-3xl text-muted"></i>
                    </div>
                    <h3 className="text-lg font-medium mb-sm">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                    </h3>
                    <p className="text-muted mb-lg">
                      This section would contain {activeTab} settings in a real application.
                    </p>
                    <button className="button button--primary button--md">
                      Configure {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                    </button>
                  </div>
                )}
                
                {/* Bottom Actions */}
                {activeTab === 'general' || activeTab === 'notifications' ? (
                  <div className="mt-xl flex justify-end">
                    <button className="button button--secondary button--md mr-sm">
                      Cancel
                    </button>
                    <button 
                      className="button button--primary button--md"
                      onClick={handleSaveSettings}
                    >
                      Save Settings
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default SettingsPage;
