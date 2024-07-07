const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // MongoDB will create a unique index for the name field to enforce uniqueness
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ['Active', 'Completed', 'Paused'] },
  prompt: { type: String, required: true }, // Reference to the prompt from the boss
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);