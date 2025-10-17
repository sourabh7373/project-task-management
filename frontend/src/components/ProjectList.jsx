import React, { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject, updateProject } from '../services/api';

export default function ProjectList({ onSelect, onProjectDeleted }) {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const handleCreate = async () => {
    if (!name) return alert('Name required');
    const p = await createProject({ name, description: desc });
    setProjects([p, ...projects]);
    setName('');
    setDesc('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      fetchProjects();
      if (onProjectDeleted) onProjectDeleted();
    }
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setEditName(project.name);
    setEditDesc(project.description || '');
  };

  const handleUpdate = async (id) => {
    if (!editName) return alert('Name required');
    await updateProject(id, { name: editName, description: editDesc });
    setEditingId(null);
    fetchProjects();
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div>
      <h3>Projects</h3>

      {/* Add New Project */}
      <div className="form-row">
        <input
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleCreate}>Add Project</button>
      </div>

      {/* Projects List */}
      <div className="projects">
        {projects.map((p) => (
          <div key={p._id} className="project-card" style={{ marginBottom: 6 }}>
            {editingId === p._id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  style={{ marginRight: 6 }}
                />
                <input
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  style={{ marginRight: 6 }}
                />
                <button onClick={() => handleUpdate(p._id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{ cursor: 'pointer', marginRight: 10 }}
                  onClick={() => onSelect(p)}
                >
                  {p.name}
                </span>
                <button onClick={() => startEdit(p)} style={{ marginRight: 6 }}>Update</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
                <span style={{ color: '#888', fontSize: '0.8em', marginLeft: 10 }}>
                  Created: {new Date(p.createdAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
