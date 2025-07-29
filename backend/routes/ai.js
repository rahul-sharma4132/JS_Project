const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const Interaction = require('../models/Interaction');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Text generation endpoint
router.post('/generate', async (req, res) => {
  try {
    const { prompt, maxTokens = 1000 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: maxTokens,
      messages: [
        { role: "user", content: prompt }
      ]
    });

    // Save the interaction to MongoDB
    const interaction = new Interaction({
      prompt: prompt,
      response: completion.content[0].text,
      model: "claude-3-sonnet-20240229",
      tokens: {
        prompt: completion.usage.input_tokens,
        completion: completion.usage.output_tokens,
        total: completion.usage.input_tokens + completion.usage.output_tokens
      }
    });
    
    await interaction.save();

    res.json({
      result: completion.content[0].text,
      usage: completion.usage
    });
  } catch (error) {
    console.error('Anthropic API error:', error);
    res.status(500).json({ 
      error: 'Error generating content',
      details: error.message 
    });
  }
});

// Get all interaction history
router.get('/history', async (req, res) => {
  try {
    const history = await Interaction.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    console.error('Error fetching interaction history:', error);
    res.status(500).json({ error: 'Error fetching interaction history' });
  }
});

module.exports = router;