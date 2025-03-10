import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
  // State for the list of tasks
  const [tasks, setTasks] = useState([]);
  // State for the new task input
  const [newTask, setNewTask] = useState('');

  // Add a new task to the list
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask(''); // Clear the input field
    }
  };

  // Remove a task from the list
  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion status
  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handle key press (for Enter key)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      
      {/* Conditional rendering for empty list */}
      {tasks.length === 0 && (
        <p className="empty-message">Your task list is empty. Add some tasks to get started!</p>
      )}
      
      {/* Rendering the list of tasks using map */}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      {/* Conditional rendering for task statistics */}
      {tasks.length > 0 && (
        <div className="task-stats">
          <p>Total tasks: {tasks.length}</p>
          <p>Completed: {tasks.filter(task => task.completed).length}</p>
          <p>Remaining: {tasks.filter(task => !task.completed).length}</p>
        </div>
      )}
    </div>
  );
}

export default TodoApp;