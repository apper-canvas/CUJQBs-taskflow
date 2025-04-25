import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Calendar, Briefcase, CheckCircle, Clock, Flag, ListTodo } from 'lucide-react';
import Chart from 'react-apexcharts';
import taskService from '../services/taskService';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
    byPriority: { high: 0, medium: 0, low: 0 },
    byCategory: { personal: 0, work: 0 },
    dueToday: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const taskStats = await taskService.getTaskStats();
        setStats(taskStats);
      } catch (error) {
        console.error("Failed to fetch task statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Priority chart configuration
  const priorityChartConfig = {
    series: [stats.byPriority.high, stats.byPriority.medium, stats.byPriority.low],
    options: {
      chart: {
        type: 'donut',
        fontFamily: 'Inter, sans-serif',
      },
      colors: ['#f87171', '#60a5fa', '#a3e635'],
      labels: ['High', 'Medium', 'Low'],
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  // Category chart configuration
  const categoryChartConfig = {
    series: [stats.byCategory.personal, stats.byCategory.work],
    options: {
      chart: {
        type: 'donut',
        fontFamily: 'Inter, sans-serif',
      },
      colors: ['#818cf8', '#c084fc'],
      labels: ['Personal', 'Work'],
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  // Completion chart configuration
  const completionChartConfig = {
    series: [stats.completed, stats.active],
    options: {
      chart: {
        type: 'donut',
        fontFamily: 'Inter, sans-serif',
      },
      colors: ['#22c55e', '#64748b'],
      labels: ['Completed', 'Active'],
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  if (isLoading) {
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
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Tasks Card */}
          <motion.div
            className="card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4">
                <ListTodo className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-surface-600 dark:text-surface-400">Total Tasks</p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
            </div>
          </motion.div>

          {/* Completed Tasks Card */}
          <motion.div
            className="card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-surface-600 dark:text-surface-400">Completed</p>
                <h3 className="text-2xl font-bold">{stats.completed}</h3>
              </div>
            </div>
          </motion.div>

          {/* Due Today Card */}
          <motion.div
            className="card bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mr-4">
                <Calendar className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <p className="text-sm text-surface-600 dark:text-surface-400">Due Today</p>
                <h3 className="text-2xl font-bold">{stats.dueToday}</h3>
              </div>
            </div>
          </motion.div>

          {/* High Priority Card */}
          <motion.div
            className="card bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 mr-4">
                <Flag className="h-6 w-6 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="text-sm text-surface-600 dark:text-surface-400">High Priority</p>
                <h3 className="text-2xl font-bold">{stats.byPriority.high}</h3>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Priority Distribution */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
            <Chart
              options={priorityChartConfig.options}
              series={priorityChartConfig.series}
              type="donut"
              height={300}
            />
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
            <Chart
              options={categoryChartConfig.options}
              series={categoryChartConfig.series}
              type="donut"
              height={300}
            />
          </motion.div>

          {/* Completion Status */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold mb-4">Completion Status</h3>
            <Chart
              options={completionChartConfig.options}
              series={completionChartConfig.series}
              type="donut"
              height={300}
            />
          </motion.div>
        </div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Task Summary</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">Task Breakdown</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-sm">Total Tasks</span>
                  <span className="font-medium">{stats.total}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm">Completed Tasks</span>
                  <span className="font-medium">{stats.completed}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm">Active Tasks</span>
                  <span className="font-medium">{stats.active}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm">Completion Rate</span>
                  <span className="font-medium">
                    {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">Categories</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-sm flex items-center">
                    <Briefcase className="w-4 h-4 mr-1 text-purple-500" /> Work
                  </span>
                  <span className="font-medium">{stats.byCategory.work}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-blue-500" /> Personal
                  </span>
                  <span className="font-medium">{stats.byCategory.personal}</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;