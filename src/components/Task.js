// src/components/Task.js
import React from 'react';

const Task = ({ task, onDelete, onEdit }) => {
  return (
   
    <div style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: task.color }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{task.text}</span>
        <div>
          <button onClick={() => onEdit(task.id)}>Düzenle</button>
          <button onClick={() => onDelete(task.id)}>Sil</button>
        </div>
      </div>
    </div>
  );
};

export default Task;
