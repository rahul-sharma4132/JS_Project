const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  model: {
    type: String,
    default: 'gpt-3.5-turbo'
  },
  tokens: {
    prompt: Number,
    completion: Number,
    total: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Interaction', InteractionSchema);