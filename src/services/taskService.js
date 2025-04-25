import apperService from './apperService';

const TABLE_NAME = "task13";

class TaskService {
  async fetchTasks(filters = {}) {
    try {
      const client = apperService.getClient();
      
      const params = {
        fields: [
          "Id", 
          "title", 
          "description", 
          "dueDate", 
          "priority", 
          "completed",
          "category",
          "CreatedOn",
          "ModifiedOn"
        ],
        pagingInfo: { limit: 100, offset: 0 },
        orderBy: [{ field: "CreatedOn", direction: "desc" }],
      };
      
      // Add filters if specified
      if (Object.keys(filters).length > 0) {
        params.filter = {
          logic: "and",
          filters: Object.entries(filters).map(([field, value]) => ({
            field,
            operator: "eq",
            value
          }))
        };
      }
      
      const response = await client.fetchRecords(TABLE_NAME, params);
      
      return response.data.map(task => ({
        id: task.Id.toString(),
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate || new Date().toISOString(),
        priority: task.priority || "medium",
        completed: task.completed || false,
        categoryId: task.category || "personal",
        createdOn: task.CreatedOn,
        modifiedOn: task.ModifiedOn
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
  
  async createTask(taskData) {
    try {
      const client = apperService.getClient();
      
      const params = {
        record: {
          title: taskData.title,
          description: taskData.description || "",
          dueDate: taskData.dueDate,
          priority: taskData.priority || "medium",
          completed: taskData.completed || false,
          category: taskData.categoryId || "personal"
        }
      };
      
      const response = await client.createRecord(TABLE_NAME, params);
      
      return {
        id: response.data.Id.toString(),
        title: response.data.title,
        description: response.data.description,
        dueDate: response.data.dueDate,
        priority: response.data.priority,
        completed: response.data.completed,
        categoryId: response.data.category,
        createdOn: response.data.CreatedOn,
        modifiedOn: response.data.ModifiedOn
      };
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }
  
  async updateTask(taskId, taskData) {
    try {
      const client = apperService.getClient();
      
      const params = {
        record: {
          title: taskData.title,
          description: taskData.description,
          dueDate: taskData.dueDate,
          priority: taskData.priority,
          completed: taskData.completed,
          category: taskData.categoryId
        }
      };
      
      const response = await client.updateRecord(TABLE_NAME, taskId, params);
      
      return {
        id: response.data.Id.toString(),
        title: response.data.title,
        description: response.data.description,
        dueDate: response.data.dueDate,
        priority: response.data.priority,
        completed: response.data.completed,
        categoryId: response.data.category,
        createdOn: response.data.CreatedOn,
        modifiedOn: response.data.ModifiedOn
      };
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
  
  async deleteTask(taskId) {
    try {
      const client = apperService.getClient();
      await client.deleteRecord(TABLE_NAME, taskId);
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
  
  async toggleTaskCompletion(taskId, isCompleted) {
    try {
      const client = apperService.getClient();
      
      const params = {
        record: {
          completed: isCompleted
        }
      };
      
      await client.updateRecord(TABLE_NAME, taskId, params);
      return true;
    } catch (error) {
      console.error("Error toggling task completion:", error);
      throw error;
    }
  }
  
  async getTaskStats() {
    try {
      const tasks = await this.fetchTasks();
      
      const total = tasks.length;
      const completed = tasks.filter(task => task.completed).length;
      const active = total - completed;
      
      const byPriority = {
        high: tasks.filter(task => task.priority === 'high').length,
        medium: tasks.filter(task => task.priority === 'medium').length,
        low: tasks.filter(task => task.priority === 'low').length,
      };
      
      const byCategory = {
        personal: tasks.filter(task => task.categoryId === 'personal').length,
        work: tasks.filter(task => task.categoryId === 'work').length,
      };
      
      // Get tasks due today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const dueToday = tasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === today.getTime() && !task.completed;
      }).length;
      
      return {
        total,
        completed,
        active,
        byPriority,
        byCategory,
        dueToday
      };
    } catch (error) {
      console.error("Error getting task stats:", error);
      throw error;
    }
  }
}

const taskService = new TaskService();
export default taskService;