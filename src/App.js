import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard'; // Ensure KanbanBoard is imported correctly
import { fetchTasks } from './api'; // Ensure fetchTasks is imported correctly

const App = () => {
  const [tasks, setTasks] = useState({
    backlog: [],
    inProgress: [],
    done: []
  });
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true); // Start loading
        const fetchedTasks = await fetchTasks();
        
        // Assuming fetchTasks returns tasks in a specific format
        const newTasks = { backlog: [], inProgress: [], done: [] };

        fetchedTasks.forEach(task => {
          if (task.status === 'Backlog') newTasks.backlog.push(task);
          else if (task.status === 'In progress') newTasks.inProgress.push(task);
          else if (task.status === 'Done') newTasks.done.push(task);
        });

        setTasks(newTasks); // Set tasks in state
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading until tasks are fetched
  }

  return (
    <div>
      <KanbanBoard tasks={tasks} /> {/* Pass tasks to KanbanBoard */}
    </div>
  );
};

export default App;