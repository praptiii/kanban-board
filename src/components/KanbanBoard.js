import React, { useState, useEffect } from 'react';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  //Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        
        // Normalize the status from the API to match the frontend status values
        const normalizedTasks = data.tickets.map(task => ({
          ...task,
          status: task.status.toLowerCase().replace(' ', '-')
        }));

        setTasks(normalizedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTasks(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };

    fetchData();
  }, []);

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task =>
    (statusFilter === 'all' || task.status.toLowerCase() === statusFilter) &&
    (priorityFilter === 'all' || task.priority === Number(priorityFilter))
  );

  // Get the user's name from userId
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="board-container">
      {/* Filter Section */}
      <div className="filter-section">
        <h2>Display</h2>
        <div className="filters">
          <label htmlFor="status-filter">Status:</label>
          <select id="status-filter" onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
            <option value="backlog">Backlog</option>
          </select>

          <label htmlFor="priority-filter">Priority:</label>
          <select id="priority-filter" onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="4">Urgent</option>
            <option value="3">High</option>
            <option value="2">Medium</option>
            <option value="1">Low</option>
          </select>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="kanban-board">
        {['todo', 'in-progress', 'done', 'backlog'].map(status => (
          <div key={status} className="column">
            <h3>{status.replace('-', ' ')}</h3>
            {filteredTasks.filter(task => task.status.toLowerCase() === status).map(task => (
              <div key={task.id} className="card">
                <h4>{task.title}</h4>
                <p>{getUserName(task.userId)} - Priority: {['Low', 'Medium', 'High', 'Urgent'][task.priority - 1]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        .board-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        
        .filter-section {
          margin-bottom: 20px;
        }
        
        .filters {
          display: flex;
          gap: 20px;
        }
        
        .kanban-board {
          display: flex;
          justify-content: space-between;
        }

        .column {
          width: 23%;
          background-color: #ffffff;
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .card {
          background-color: #fafafa;
          padding: 10px;
          margin-bottom: 10px;
          border-left: 4px solid #000;
          border-radius: 5px;
        }
        
        .priority-1 {
          color: green;
        }
        
        .priority-2 {
          color: blue;
        }

        .priority-3 {
          color: orange;
        }

        .priority-4 {
          color: red;
        }

        h4 {
          margin: 5px 0;
        }

        p {
          margin: 0;
        }

        select {
          padding: 5px;
        }

        span.priority {
          font-size: 0.85em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default KanbanBoard;
