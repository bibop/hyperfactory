const express = require('express');
const router = express.Router();
const { createAgent } = require('../services/agentService');
const isAuthenticated = require('./middleware/authMiddleware');
const Agent = require('../models/Agent');

// Route to create a new agent
router.post('/agents', async (req, res) => {
  const { name, expertiseArea, role, gender, description, specialization } = req.body;
  try {
    const result = await createAgent({ name, expertiseArea, role, gender, description, specialization });
    if (result.success) {
      console.log(`Agent created: ${result.agent.name}`);
      res.status(201).json(result.agent);
    } else {
      console.error(`Error creating agent: ${result.error}`);
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error(`Error creating agent: ${error.message}`, error);
    res.status(500).json({ error: "Error creating agent", details: error.message });
  }
});

// Corrected route to render agents page with full functionality for creating, editing, and deleting agents
router.get('/agents', isAuthenticated, async (req, res) => {
  try {
    const agents = await Agent.find({});
    res.render('agentsPage', { agents });
    console.log('Accessed Agent Editor view');
  } catch (error) {
    console.error(`Error fetching agents: ${error.message}`, error);
    res.status(500).json({ error: "Error fetching agents", details: error.message });
  }
});

module.exports = router;