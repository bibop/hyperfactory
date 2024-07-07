const Agent = require('../models/Agent');
const Rag = require('../models/Rag');

async function processPrompt(prompt) {
  // Analyze the prompt to decide on the specialization required
  const specialization = determineSpecializationFromPrompt(prompt);
  let agent = await Agent.findOne({ specialization: specialization });

  if (!agent) {
    // If no existing agent matches the specialization, create a new one
    const agentDetails = {
      name: generateAgentName(specialization),
      expertiseArea: "General",
      role: "agent",
      gender: "female", // Example default, consider a more dynamic approach
      description: `Specialized in ${specialization}`,
      specialization: specialization
    };
    agent = new Agent(agentDetails);
    try {
      await agent.save();
      console.log(`New agent created: ${agent.name} with specialization in ${specialization}`);
    } catch (error) {
      console.error(`Error creating agent: ${error.message}`, error);
      throw error; // Rethrow the error after logging
    }
  } else {
    console.log(`Found existing agent: ${agent.name} with specialization in ${specialization}`);
  }

  // Fetch or initialize RAG (Reasoning, Action, Goals) data for the agent
  let rag = await Rag.findOne({ agentId: agent._id });
  if (!rag) {
    rag = new Rag({ agentId: agent._id, experiences: [], skills: [] });
    try {
      await rag.save();
      console.log(`Initialized new RAG data for agent: ${agent.name}`);
    } catch (error) {
      console.error(`Error initializing RAG data for agent: ${error.message}`, error);
      throw error; // Rethrow the error after logging
    }
  }

  return agent;
}

function determineSpecializationFromPrompt(prompt) {
  // Placeholder for actual implementation
  // This should analyze the prompt and decide on the specialization needed
  return "Example Specialization"; // Example return value
}

function generateAgentName(specialization) {
  // Generate a unique name for the agent based on their specialization
  // This is a simplified example. Consider using a more sophisticated naming mechanism.
  return `Agent_${specialization}_${Date.now()}`;
}

module.exports = { processPrompt };