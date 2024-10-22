// src/api.js

export const fetchTasks = async () => {
    try {
      const response = await fetch('https://your-api-url.com/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return null;
    }
  };
  
  export const updateTask = async (taskId, updatedTaskData) => {
    try {
      const response = await fetch(`https://your-api-url.com/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      return null;
    }
  };
  