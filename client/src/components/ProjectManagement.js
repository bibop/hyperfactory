import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('Active');
  const [prompt, setPrompt] = useState(''); // Added state for prompt
  const [error, setError] = useState(''); // State to manage error messages

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects: ', error.message, error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const project = { name: projectName, description: projectDescription, status: projectStatus, prompt: prompt };
      await axios.post('/projects', project);
      setProjectName('');
      setProjectDescription('');
      setProjectStatus('Active');
      setPrompt(''); // Clear the prompt state
      setError(''); // Clear any existing errors
      fetchProjects(); // Refresh the list of projects
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Set the error message from server response
      } else {
        console.error('Error creating project: ', error.message, error);
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`/projects/${projectId}`);
      fetchProjects(); // Refresh the list of projects
    } catch (error) {
      console.error('Error deleting project: ', error.message, error);
    }
  };

  return (
    <div>
      <h2>Project Management</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message if any */}
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          required
        />
        <textarea
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          placeholder="Project Description"
          required
        />
        <select value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Paused">Paused</option>
        </select>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Project Prompt"
          required
        />
        <button type="submit">Create Project</button>
      </form>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            {project.name} - {project.status}
            <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManagement;