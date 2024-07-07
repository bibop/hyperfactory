const mongoose = require('mongoose');

const ragSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  experiences: [{
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    details: String,
    createdAt: { type: Date, default: Date.now }
  }],
  skills: [{
    name: String,
    level: { type: Number, default: 1 } // Example level system, can be adapted
  }]
});

module.exports = mongoose.model('Rag', ragSchema);