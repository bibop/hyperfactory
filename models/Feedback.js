const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedbackText: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Assuming user authentication is involved and user ID needs to be stored with feedback
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
});

module.exports = mongoose.model('Feedback', feedbackSchema);