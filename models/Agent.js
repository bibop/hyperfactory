const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  expertiseArea: { type: String, required: true },
  role: { type: String, required: true, enum: ['boss', 'professor', 'critic'] },
  gender: { type: String, required: true, enum: ['female', 'male'] },
  description: { type: String, required: false }, // Dynamic description based on prompt
  specialization: { type: String, required: false } // Specialization set based on prompt
});

agentSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.' });

module.exports = mongoose.model('Agent', agentSchema);