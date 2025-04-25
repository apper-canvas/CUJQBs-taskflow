import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Layout, Globe, ChevronDown } from 'lucide-react';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [language, setLanguage] = useState('english');
  const [layout, setLayout] = useState('default');
  
  const handleDarkModeChange = (enabled) => {
    setDarkMode(enabled);
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(enabled));
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Settings</h2>

        <div className="space-y-6">
          {/* Appearance */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Appearance</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="w-5 h-5 mr-3 text-surface-600 dark:text-surface-400" />
                    <span>Dark Mode</span>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={darkMode}
                      onChange={(e) => handleDarkModeChange(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <p className="ml-8 text-sm text-surface-500 mt-1">
                  Toggle between light and dark theme
                </p>
              </div>
              
              <div>
                <div className="flex items-center">
                  <Layout className="w-5 h-5 mr-3 text-surface-600 dark:text-surface-400" />
                  <span>Layout</span>
                </div>
                <div className="ml-8 mt-2 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setLayout('default')}
                    className={`p-3 border rounded-lg flex flex-col items-center ${
                      layout === 'default' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-surface-200 dark:border-surface-700'
                    }`}
                  >
                    <div className="w-full h-12 mb-2 rounded bg-surface-200 dark:bg-surface-700 flex flex-col overflow-hidden">
                      <div className="h-3 bg-primary/40 mb-1 mx-1 mt-1 rounded"></div>
                      <div className="flex grow">
                        <div className="w-1/4 h-full bg-surface-300 dark:bg-surface-600 ml-1"></div>
                        <div className="grow mx-1 bg-surface-300 dark:bg-surface-600"></div>
                      </div>
                    </div>
                    <span className="text-sm">Default</span>
                  </button>
                  
                  <button 
                    onClick={() => setLayout('compact')}
                    className={`p-3 border rounded-lg flex flex-col items-center ${
                      layout === 'compact' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-surface-200 dark:border-surface-700'
                    }`}
                  >
                    <div className="w-full h-12 mb-2 rounded bg-surface-200 dark:bg-surface-700 flex flex-col overflow-hidden">
                      <div className="h-3 bg-primary/40 mb-1 mx-1 mt-1 rounded"></div>
                      <div className="flex grow">
                        <div className="w-1/6 h-full bg-surface-300 dark:bg-surface-600 ml-1"></div>
                        <div className="grow mx-1 bg-surface-300 dark:bg-surface-600"></div>
                      </div>
                    </div>
                    <span className="text-sm">Compact</span>
                  </button>
                </div>
                <p className="ml-8 text-sm text-surface-500 mt-2">
                  Choose the application layout
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Notifications */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 mr-3 text-surface-600 dark:text-surface-400" />
                    <span>Enable Notifications</span>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationsEnabled}
                      onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <p className="ml-8 text-sm text-surface-500 mt-1">
                  Receive notifications about your tasks and activities
                </p>
              </div>
              
              {notificationsEnabled && (
                <>
                  <div className="ml-8 pt-2 border-t border-surface-200 dark:border-surface-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Task reminders</span>
                      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="ml-8 pt-2 border-t border-surface-200 dark:border-surface-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Due date alerts</span>
                      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="ml-8 pt-2 border-t border-surface-200 dark:border-surface-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Email notifications</span>
                      <input type="checkbox" className="toggle toggle-primary" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
          
          {/* Language */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-3 text-surface-600 dark:text-surface-400" />
                  <span>Language</span>
                </div>
                
                <div className="ml-8 mt-2 relative">
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="input appearance-none pr-10 w-full"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <ChevronDown className="w-4 h-4 text-surface-500" />
                    </div>
                  </div>
                  <p className="text-sm text-surface-500 mt-1">
                    Select your preferred language
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Data */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-surface-100 dark:bg-surface-800 rounded-lg">
                <p className="text-sm">
                  Your data is securely stored and encrypted. We never share your personal information 
                  with third parties without your explicit consent.
                </p>
                <div className="mt-3 flex gap-3">
                  <button className="btn btn-sm">Export Data</button>
                  <button className="btn btn-sm btn-outline text-accent border-accent hover:bg-accent/10">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;