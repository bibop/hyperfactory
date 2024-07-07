const Agent = require('../models/Agent');
const { createOrUpdateRag } = require('./ragService');

async function createAgent({ name, expertiseArea, role, gender }) {
  // Validate input for role and gender
  const validRoles = ['boss', 'professor', 'critic'];
  const validGenders = ['female', 'male'];
  if (!validRoles.includes(role)) {
    console.error(`Invalid role provided: ${role}`);
    return { success: false, error: `Invalid role: ${role}. Valid roles are ${validRoles.join(', ')}.` };
  }
  if (!validGenders.includes(gender)) {
    console.error(`Invalid gender provided: ${gender}`);
    return { success: false, error: `Invalid gender: ${gender}. Valid genders are ${validGenders.join(', ')}.` };
  }

  // Optional: Implement logic to determine gender based on current distribution if not provided
  if (!gender) {
    const maleCount = await Agent.countDocuments({ gender: 'male' });
    const femaleCount = await Agent.countDocuments({ gender: 'female' });
    gender = maleCount > femaleCount ? 'female' : 'male';
    console.log(`Gender for new agent set to ${gender} to balance distribution.`);
  }

  const newAgent = new Agent({
    name,
    expertiseArea,
    role,
    gender,
  });

  try {
    await newAgent.save();
    console.log(`Agent created successfully: ${newAgent.name}`);
    // After agent creation, initialize the RAG data
    await createOrUpdateRag(newAgent._id, null, { name: "Initial Skill", level: 1 });
    return { success: true, agent: newAgent };
  } catch (error) {
    console.error(`Error creating agent: ${error.message}`, error);
    return { success: false, error: error.message };
  }
}

module.exports = { createAgent };