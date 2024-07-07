const Rag = require('../models/Rag');

async function createOrUpdateRag(agentId, experience, skill) {
  try {
    const rag = await Rag.findOne({ agentId });
    if (rag) {
      // Update existing RAG
      if (experience) {
        rag.experiences.push(experience);
        console.log(`Experience added for agentId: ${agentId}`);
      }
      if (skill) {
        const existingSkillIndex = rag.skills.findIndex(s => s.name === skill.name);
        if (existingSkillIndex > -1) {
          rag.skills[existingSkillIndex].level += 1; // Increment skill level
          console.log(`Skill level incremented for skill: ${skill.name}, agentId: ${agentId}`);
        } else {
          rag.skills.push(skill);
          console.log(`Skill added: ${skill.name} for agentId: ${agentId}`);
        }
      }
      await rag.save();
      console.log(`RAG updated for agentId: ${agentId}`);
    } else {
      // Create new RAG
      const newRag = new Rag({ agentId, experiences: experience ? [experience] : [], skills: skill ? [skill] : [] });
      await newRag.save();
      console.log(`New RAG created for agentId: ${agentId}`);
    }
  } catch (error) {
    console.error(`Error in createOrUpdateRag: ${error.message}`, error);
    throw error; // Rethrow the error after logging
  }
}

module.exports = { createOrUpdateRag };