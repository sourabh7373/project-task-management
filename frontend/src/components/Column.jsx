import React from 'react';
import TaskCard from './TaskCard';

export default function Column({ title, tasks, onEdit, onDelete }) {
  return (
    <div
      className="column"
      style={{
        padding: 8,
        border: '1px solid #ccc',
        borderRadius: 6,
        backgroundColor: '#f9f9f9',
        minHeight: 200,
      }}
    >
      <h4 style={{ marginBottom: 8 }}>
        {title} ({tasks.length})
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
