const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// GET endpoint for feedback form page
router.get('/feedback', (req, res) => {
  res.render('feedbackForm');
});

// POST endpoint for feedback submission
router.post('/feedback', async (req, res) => {
  try {
    const { feedbackText } = req.body;
    const feedback = new Feedback({ feedbackText });
    await feedback.save();
    console.log(`Feedback received: ${feedbackText}`);
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(`Error submitting feedback: ${error.message}`, error);
    res.status(500).json({ error: "Error submitting feedback", details: error.message });
  }
});

module.exports = router;