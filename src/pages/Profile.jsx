import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { User, Mail, Phone, Calendar, Shield } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6">User Profile</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="card text-center">
              <div className="mb-4">
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={`${user.firstName} ${user.lastName}`} 
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-medium mx-auto">
                    {user.firstName ? user.firstName.charAt(0) : ''}
                    {user.lastName ? user.lastName.charAt(0) : ''}
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                {user.emailAddress}
              </p>
              
              <div className="flex justify-center gap-2">
                <button className="btn btn-primary btn-sm">Edit Profile</button>
              </div>
            </div>
            
            <div className="card mt-4">
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeTab === 'profile' 
                        ? "bg-primary/10 text-primary dark:bg-primary/20" 
                        : "hover:bg-surface-100 dark:hover:bg-surface-700"
                    }`}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>Personal Information</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeTab === 'security' 
                        ? "bg-primary/10 text-primary dark:bg-primary/20" 
                        : "hover:bg-surface-100 dark:hover:bg-surface-700"
                    }`}
                  >
                    <Shield className="w-5 h-5 mr-3" />
                    <span>Security</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="card"
              >
                <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                        First Name
                      </label>
                      <div className="flex items-center border rounded-lg p-3 bg-surface-50 dark:bg-surface-800">
                        <User className="w-5 h-5 text-surface-400 mr-2" />
                        <span>{user.firstName || 'Not provided'}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                        Last Name
                      </label>
                      <div className="flex items-center border rounded-lg p-3 bg-surface-50 dark:bg-surface-800">
                        <User className="w-5 h-5 text-surface-400 mr-2" />
                        <span>{user.lastName || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center border rounded-lg p-3 bg-surface-50 dark:bg-surface-800">
                      <Mail className="w-5 h-5 text-surface-400 mr-2" />
                      <span>{user.emailAddress}</span>
                      {user.isEmailVerified && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                      Phone Number
                    </label>
                    <div className="flex items-center border rounded-lg p-3 bg-surface-50 dark:bg-surface-800">
                      <Phone className="w-5 h-5 text-surface-400 mr-2" />
                      <span>{user.phone || 'Not provided'}</span>
                      {user.isPhoneVerified && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                      Account Created
                    </label>
                    <div className="flex items-center border rounded-lg p-3 bg-surface-50 dark:bg-surface-800">
                      <Calendar className="w-5 h-5 text-surface-400 mr-2" />
                      <span>
                        {user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="card"
              >
                <h3 className="text-xl font-semibold mb-6">Security Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Password</h4>
                      <button className="text-sm text-primary hover:underline">
                        Change password
                      </button>
                    </div>
                    <div className="p-3 border rounded-lg bg-surface-50 dark:bg-surface-800">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-surface-400 mr-2" />
                        <span>••••••••</span>
                        <span className="ml-2 text-xs text-surface-500">
                          {user.lastPasswordChangeDate ? `Last changed ${new Date(user.lastPasswordChangeDate).toLocaleDateString()}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <button className="text-sm text-primary hover:underline">
                        {user.isTwoFactorEnabled ? 'Manage' : 'Enable'}
                      </button>
                    </div>
                    <div className="p-3 border rounded-lg bg-surface-50 dark:bg-surface-800">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-surface-400 mr-2" />
                        <span>
                          {user.isTwoFactorEnabled ? 'Enabled' : 'Not enabled'}
                        </span>
                        {user.isTwoFactorEnabled && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-surface-500">
                        {user.isTwoFactorEnabled 
                          ? 'Your account is secured with two-factor authentication.' 
                          : 'Add an extra layer of security to your account with two-factor authentication.'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Session Information</h4>
                    </div>
                    <div className="p-3 border rounded-lg bg-surface-50 dark:bg-surface-800">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                          <span className="text-sm text-surface-600 dark:text-surface-400 w-32">Last Login:</span>
                          <span className="text-sm">
                            {user.lastLoginDate ? new Date(user.lastLoginDate).toLocaleString() : 'Unknown'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-surface-600 dark:text-surface-400 w-32">Login Status:</span>
                          <span className="text-sm flex items-center">
                            Active
                            <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;