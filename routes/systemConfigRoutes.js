const express = require('express');
const router = express.Router();

// GET route to render the System Configuration view
router.get('/systemConfiguration', (req, res) => {
  res.render('systemConfiguration');
});

// POST route to submit configuration changes
router.post('/systemConfiguration', async (req, res) => {
  try {
    // Extract configuration settings from request body
    const { notificationPreferences, agentAutoCreation } = req.body;
    // Placeholder for updating configuration settings in the database or configuration file
    // Since specific instructions for saving configurations are not provided, this is a placeholder comment
    console.log(`Configuration updated: Notification Preferences - ${notificationPreferences}, Agent Auto-Creation - ${agentAutoCreation}`);
    res.redirect('/systemConfiguration');
  } catch (error) {
    console.error(`Error updating system configuration: ${error.message}`, error);
    res.status(500).json({ error: "Error updating system configuration", details: error.message });
  }
});

module.exports = router;