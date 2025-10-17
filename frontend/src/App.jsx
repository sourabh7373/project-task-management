import React, { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import TaskBoard from './components/TaskBoard';
import AIWidget from './components/AIWidget';
import { getTasks } from './services/api';

export default function App() {
  const [project, setProject] = useState(null);
  const [currentTasks, setCurrentTasks] = useState([]);

  // Load tasks whenever project changes
  useEffect(() => {
    const fetchTasks = async () => {
      if (project) {
        const tasks = await getTasks(project._id);
        setCurrentTasks(tasks);
      } else {
        setCurrentTasks([]);
      }
    };
    fetchTasks();
  }, [project]);

  return (
    <div className="app">
      <div className="header">
        <h2>Project & Task Management System</h2>
        <div className="controls">Logged in as <strong>Candidate</strong></div>
      </div>

      {/* Project List with selection and delete handling */}
      <ProjectList
        onSelect={(p) => setProject(p)}
        onProjectDeleted={() => setProject(null)} // Reset current project if deleted
      />

      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        {/* Task Board */}
        <div style={{ flex: 3 }}>
          <TaskBoard 
            project={project} 
            setCurrentTasks={setCurrentTasks} 
          />
        </div>

        {/* AI Widget */}
        <div style={{ flex: 1 }}>
          <AIWidget tasks={currentTasks} />
          <div style={{ marginTop: 12 }}>
            <p><em>Note:</em> AI features require GEMINI_API_KEY in backend env to work.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
