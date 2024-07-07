const express = require('express');
const Project = require('../models/Project');
const router = express.Router();
const promptProcessingService = require('../services/promptProcessingService');

// Create a new project
router.post('/projects', async (req, res) => {
  const { name, prompt } = req.body;
  try {
    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      console.log(`Attempt to create a project with an existing name: ${name}`);
      return res.status(400).json({ message: "Project name already exists. Please choose a different name." });
    }
    const project = new Project(req.body);
    await project.save();
    console.log(`Project created: ${project.name}`);
    res.status(201).send(project);
  } catch (error) {
    console.error(`Error creating project: ${error.message}`, error);
    if (error.code === 11000) {
      console.error(`Duplicate project name error: ${error.message}`, error);
      return res.status(400).json({ message: "Project name already exists. Please choose a different name." });
    }
    res.status(400).send(error);
  }
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    console.log('Fetched all projects');
    res.send(projects);
  } catch (error) {
    console.error(`Error fetching projects: ${error.message}`, error);
    res.status(500).send();
  }
});

// Route to render Project Editor page
router.get('/projectEditor', (req, res) => {
  res.render('projectEditor');
});

// Route to handle Project Editor form submission
router.post('/projectEditor', async (req, res) => {
  const { projectName, projectDescription, projectStatus, assignAgents } = req.body;
  try {
    let project = await Project.findOne({ name: projectName });
    if (project) {
      // Update existing project
      project.description = projectDescription;
      project.status = projectStatus;
      // Assuming assignAgents is an array of agent IDs
      project.assignedAgents = assignAgents;
      await project.save();
      console.log(`Project updated: ${projectName}`);
    } else {
      // Create new project
      project = new Project({
        name: projectName,
        description: projectDescription,
        status: projectStatus,
        assignedAgents: assignAgents
      });
      await project.save();
      console.log(`Project created: ${projectName}`);
    }
    res.redirect('/projects');
  } catch (error) {
    console.error(`Error in Project Editor form submission: ${error.message}`, error);
    res.status(500).send({ error: "Error processing project editor form", details: error.message });
  }
});

// Route to accept the boss's prompt and process it
router.post('/processPrompt', async (req, res) => {
  const { prompt } = req.body;
  try {
    const agent = await promptProcessingService.processPrompt(prompt);
    res.status(200).json({ message: "Agent processed successfully", agent });
  } catch (error) {
    console.error(`Error processing prompt: ${error.message}`, error);
    res.status(500).json({ error: "Error processing prompt", details: error.message });
  }
});

module.exports = router;