import React, { useState, useEffect } from 'react';
import Column from './Column';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

export default function TaskBoard({ project, setCurrentTasks }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('To Do');

  const columns = ['To Do', 'In Progress', 'Done'];

  // Load tasks whenever project changes
  useEffect(() => {
    const fetchTasks = async () => {
      if (project) {
        const data = await getTasks(project._id);
        setTasks(data);
        if (setCurrentTasks) setCurrentTasks(data); // Update AI widget tasks
      } else {
        setTasks([]);
        if (setCurrentTasks) setCurrentTasks([]);
      }
    };
    fetchTasks();
  }, [project]);

  const refreshTasks = async () => {
    if (!project) return;
    const data = await getTasks(project._id);
    setTasks(data);
    if (setCurrentTasks) setCurrentTasks(data);
  };

  const handleAdd = async () => {
    if (!title) return alert('Title required');
    await createTask(project._id, { title, description: desc, status });
    setTitle('');
    setDesc('');
    setStatus('To Do');
    refreshTasks();
  };

  const handleEdit = async (task) => {
    const newTitle = prompt('Title', task.title);
    if (newTitle === null) return;
    const newDesc = prompt('Description', task.description || '');
    const newStatus = prompt('Status (To Do, In Progress, Done)', task.status) || task.status;
    await updateTask(task._id, { title: newTitle, description: newDesc, status: newStatus });
    refreshTasks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await deleteTask(id);
    refreshTasks();
  };

  const moveTask = async (task, newStatus) => {
    await updateTask(task._id, { status: newStatus });
    refreshTasks();
  };

  return project ? (
    <div>
      <h3>{project.name}</h3>

      {/* Add new task */}
      <div className="form-row">
        <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          {columns.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={handleAdd}>Add Task</button>
      </div>

      {/* Board */}
      <div className="board" style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        {columns.map(col => (
          <div key={col} style={{ flex: 1 }}>
            <Column
              title={col}
              tasks={tasks.filter(t => t.status === col)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <div style={{ marginTop: 8 }}>
              {tasks.filter(t => t.status !== col).map(t => (
                <button
                  key={t._id}
                  onClick={() => moveTask(t, col)}
                  style={{ marginRight: 6 }}
                >
                  Move "{t.title}" → {col}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Select a project to view its board</div>
  );
}
