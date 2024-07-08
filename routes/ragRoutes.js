const express = require('express');
const router = express.Router();
const Rag = require('../models/Rag');
const Agent = require('../models/Agent');
const Project = require('../models/Project');
const { createOrUpdateRag } = require('../services/ragService');

// Route to create or update a RAG for an agent
router.post('/rag', async (req, res) => {
  const { agentId, experience, skill } = req.body;
  try {
    const agentExists = await Agent.findById(agentId);
    if (!agentExists) {
      return res.status(404).json({ message: "Agent not found" });
    }
    if (experience) {
      const projectExists = await Project.findById(experience.projectId);
      if (!projectExists) {
        return res.status(404).json({ message: "Project not found for the given experience" });
      }
    }
    await createOrUpdateRag(agentId, experience, skill);
    res.status(200).json({ message: "RAG updated successfully" });
  } catch (error) {
    console.error(`Error updating RAG: ${error.message}`, error);
    res.status(500).json({ error: "Error updating RAG", details: error.message });
  }
});

// Route to get RAG details for an agent
router.get('/rag/:agentId', async (req, res) => {
  const { agentId } = req.params;
  try {
    const rag = await Rag.findOne({ agentId }).populate('agentId').populate({
      path: 'experiences',
      populate: { path: 'projectId' }
    });
    if (!rag) {
      return res.status(404).json({ message: "RAG not found for the given agent" });
    }
    res.status(200).json(rag);
  } catch (error) {
    console.error(`Error fetching RAG: ${error.message}`, error);
    res.status(500).json({ error: "Error fetching RAG", details: error.message });
  }
});

module.exports = router;