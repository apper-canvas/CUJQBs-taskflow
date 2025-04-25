import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlusCircle, 
  Calendar, 
  Clock, 
  Flag, 
  Trash2, 
  CheckCircle, 
  Circle, 
  X,
  ChevronDown,
  ChevronUp,
  Edit
} from "lucide-react";
import { format } from "date-fns";
import taskService from "../services/taskService";

const MainFeature = () => {
  // Task state
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: format(new Date(Date.now() + 86400000), "yyyy-MM-dd"), // Tomorrow
    priority: "medium",
    categoryId: "personal"
  });
  
  // Filter state
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("dueDate");

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskService.fetchTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open form for creating a new task
  const openNewTaskForm = () => {
    setEditingTask(null);
    setFormData({
      title: "",
      description: "",
      dueDate: format(new Date(Date.now() + 86400000), "yyyy-MM-dd"),
      priority: "medium",
      categoryId: "personal"
    });
    setIsFormOpen(true);
  };

  // Open form for editing an existing task
  const openEditTaskForm = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: format(new Date(task.dueDate), "yyyy-MM-dd"),
      priority: task.priority,
      categoryId: task.categoryId
    });
    setIsFormOpen(true);
  };

  // Close the form
  const closeForm = () => {
    setIsFormOpen(false);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.title.trim() === "") return;
    
    try {
      if (editingTask) {
        // Update existing task
        const updatedTask = await taskService.updateTask(editingTask.id, {
          ...formData,
          dueDate: new Date(formData.dueDate).toISOString()
        });
        
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? updatedTask : task
        ));
      } else {
        // Create new task
        const newTask = await taskService.createTask({
          ...formData,
          dueDate: new Date(formData.dueDate).toISOString(),
          completed: false
        });
        
        setTasks([...tasks, newTask]);
      }
      
      setIsFormOpen(false);
    } catch (err) {
      console.error("Error saving task:", err);
      alert("Failed to save task. Please try again.");
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = tasks.find(task => task.id === taskId);
      const newCompletedState = !task.completed;
      
      await taskService.toggleTaskCompletion(taskId, newCompletedState);
      
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: newCompletedState } 
          : task
      ));
    } catch (err) {
      console.error("Error toggling task completion:", err);
      alert("Failed to update task status. Please try again.");
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortOrder === "priority") {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    }
    return 0;
  });

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    const colors = {
      high: "bg-accent/20 text-accent",
      medium: "bg-primary/20 text-primary",
      low: "bg-secondary/20 text-secondary"
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${colors[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Category badge component
  const CategoryBadge = ({ categoryId }) => {
    const categories = {
      work: { name: "Work", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
      personal: { name: "Personal", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" }
    };
    
    const category = categories[categoryId] || { name: categoryId, color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${category.color}`}>
        {category.name}
      </span>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="card p-6 text-center">
        <p className="text-accent mb-4">{error}</p>
        <button 
          onClick={fetchTasks}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Tasks</h2>
        
        <motion.button
          onClick={openNewTaskForm}
          className="btn btn-primary flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Task
        </motion.button>
      </div>
      
      <div className="card mb-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-2">
            <button 
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === "all" 
                  ? "bg-primary text-white" 
                  : "bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("active")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === "active" 
                  ? "bg-primary text-white" 
                  : "bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter("completed")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === "completed" 
                  ? "bg-primary text-white" 
                  : "bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
              }`}
            >
              Completed
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-surface-500">Sort by:</span>
            <button 
              onClick={() => setSortOrder(sortOrder === "dueDate" ? "priority" : "dueDate")}
              className="flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
            >
              {sortOrder === "dueDate" ? (
                <>
                  <Calendar className="w-4 h-4 mr-1" />
                  Due Date
                </>
              ) : (
                <>
                  <Flag className="w-4 h-4 mr-1" />
                  Priority
                </>
              )}
              {sortOrder === "dueDate" ? <ChevronDown className="w-4 h-4 ml-1" /> : <ChevronUp className="w-4 h-4 ml-1" />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingTask ? "Edit Task" : "New Task"}
              </h3>
              <button 
                onClick={closeForm}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Task title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input min-h-[80px]"
                    placeholder="Task description"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="personal">Personal</option>
                      <option value="work">Work</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeForm}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="space-y-4">
        {sortedTasks.length === 0 ? (
          <motion.div 
            className="card text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-surface-500 dark:text-surface-400 mb-4">
              {filter === "all" 
                ? "You don't have any tasks yet." 
                : filter === "active" 
                  ? "You don't have any active tasks." 
                  : "You don't have any completed tasks."}
            </p>
            {filter === "all" && (
              <motion.button
                onClick={openNewTaskForm}
                className="btn btn-primary inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Your First Task
              </motion.button>
            )}
          </motion.div>
        ) : (
          sortedTasks.map((task, index) => (
            <motion.div
              key={task.id}
              className={`card task-item ${task.completed ? "opacity-70" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mt-1 flex-shrink-0 text-primary dark:text-primary-light hover:scale-110 transition-transform"
                >
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className={`text-lg font-medium ${task.completed ? "line-through text-surface-500" : ""}`}>
                      {task.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <CategoryBadge categoryId={task.categoryId} />
                      <PriorityBadge priority={task.priority} />
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className="mt-1 text-surface-600 dark:text-surface-400 text-sm">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="mt-3 flex flex-wrap items-center justify-between">
                    <div className="flex items-center text-sm text-surface-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        {format(new Date(task.dueDate), "MMM d, yyyy")}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditTaskForm(task)}
                        className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        aria-label="Edit task"
                      >
                        <Edit className="w-4 h-4 text-surface-500" />
                      </button>
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                        aria-label="Delete task"
                      >
                        <Trash2 className="w-4 h-4 text-accent" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainFeature;