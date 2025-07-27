const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const Interaction = require('../models/Interaction');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Text generation endpoint
router.post('/generate', async (req, res) => {
  // Add CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  try {
    const { prompt, maxTokens = 100 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens
    });

    // Save the interaction to MongoDB
    const interaction = new Interaction({
      prompt: prompt,
      response: responseText,
      model: "gpt-3.5-turbo",
      tokens: {
        prompt: completion.usage.prompt_tokens,
        completion: completion.usage.completion_tokens,
        total: completion.usage.total_tokens
      }
    });
    
    await interaction.save();

    res.json({ 
      result: completion.choices[0].message.content,
      usage: completion.usage
    });

    router.get('/history/:id', async (req, res) => {
      try {
        const interaction = await Interaction.findById(req.params.id);
        
        if (!interaction) {
          return res.status(404).json({ error: 'Interaction not found' });
        }
        
        res.json(interaction);
      } catch (error) {
        console.error('Error fetching interaction:', error);
        res.status(500).json({ error: 'Error fetching interaction' });
      }
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      error: 'Error generating content',
      details: error.message 
    });
  }
});

module.exports = router;