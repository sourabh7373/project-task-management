import React from 'react';

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div
      className="task-card"
      style={{
        border: '1px solid #ccc',
        borderRadius: 6,
        padding: 8,
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      <strong style={{ display: 'block', marginBottom: 4 }}>{task.title}</strong>
      <div style={{ fontSize: '0.85em', color: '#555' }}>{task.description}</div>

      <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
        <button
          onClick={() => onEdit(task)}
          style={{
            fontSize: '0.8em',
            padding: '2px 6px',
            borderRadius: 4,
            border: 'none',
            backgroundColor: '#4caf50',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          style={{
            fontSize: '0.8em',
            padding: '2px 6px',
            borderRadius: 4,
            border: 'none',
            backgroundColor: '#f44336',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
