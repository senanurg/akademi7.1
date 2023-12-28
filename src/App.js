// src/App.js
import React, { useState } from 'react';
import Task from './components/Task';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ text: '', color: '#98AFC7' });
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    if (newTask.text.trim() === '') return;

    if (editingTask !== null) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask ? { ...task, text: newTask.text, color: newTask.color } : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      setTasks([...tasks, { id: Date.now(), ...newTask, color: getRandomColor() }]);
    }

    setNewTask({ text: '', color: '' });
  };

  const handleDeleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditTask = id => {
    const taskToEdit = tasks.find(task => task.id === id);
    setNewTask({ text: taskToEdit.text, color: taskToEdit.color });
    setEditingTask(id);
  };

  return (
    <div style={{ margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#E3E4FA' }}>
      <div style={{ maxWidth: '400px', textAlign: 'center', padding: '20px', borderRadius: '10px', backgroundColor: '#153E7E' }}>
        <h1 style={{ color: '#43C6DB' }}>ToDo List</h1>
        <div>
          <input
            type="text"
            placeholder="Görev ekle..."
            value={newTask.text}
            onChange={e => setNewTask({ ...newTask, text: e.target.value })}
            style={{ marginRight: '10px', padding: '5px', backgroundColor: '#BDEDFF' }}
          />

          <button onClick={handleAddTask} style={{ padding: '5px', backgroundColor: '#736AFF', color: 'white', border: 'none', borderRadius: '3px' }}>
            {editingTask !== null ? 'Düzenle' : 'Ekle'}
          </button>
        </div>
        <div>
          {tasks.map(task => (
            <Task key={task.id} task={task} onDelete={handleDeleteTask} onEdit={handleEditTask} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
