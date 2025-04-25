import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, LayoutDashboard, ListTodo, Settings } from "lucide-react";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Hide welcome message after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: "tasks", label: "Tasks", icon: ListTodo },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-surface-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="glass p-8 rounded-2xl max-w-md text-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                  Welcome to TaskFlow
                </h1>
                <p className="text-surface-600 dark:text-surface-300 mb-6">
                  Your personal task management solution
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-8">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TaskFlow
          </span>
        </motion.h1>
        <motion.p 
          className="text-surface-600 dark:text-surface-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Organize your tasks, boost your productivity
        </motion.p>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <motion.aside 
          className="w-full md:w-64 shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card sticky top-20">
            <nav className="space-y-2 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "hover:bg-surface-100 dark:hover:bg-surface-700"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        className="w-1 h-5 bg-primary absolute right-3 rounded-full"
                        layoutId="activeTab"
                        transition={{ type: "spring", damping: 20 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
            
            <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
              <button className="flex items-center w-full p-3 rounded-lg text-primary hover:bg-primary/10 transition-all">
                <PlusCircle className="w-5 h-5 mr-3" />
                <span className="font-medium">New Category</span>
              </button>
            </div>
          </div>
        </motion.aside>

        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "tasks" && <MainFeature />}
              
              {activeTab === "dashboard" && (
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                  <p className="text-surface-600 dark:text-surface-400">
                    Task statistics and visualizations will appear here.
                  </p>
                </div>
              )}
              
              {activeTab === "settings" && (
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Settings</h2>
                  <p className="text-surface-600 dark:text-surface-400">
                    Customize your TaskFlow experience.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;