import React, { useState } from 'react';

const TextGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5001/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt, maxTokens: 150 })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      console.error('Error generating text:', err);
      setError(err.message || 'Failed to generate text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-generator">
      <h2>AI Text Generator</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="prompt">Enter your prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="4"
            placeholder="Describe what you want to generate..."
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Text'}
        </button>
      </form>
      
      {error && <div className="error">{error}</div>}
      
      {result && (
        <div className="result">
          <h3>Generated Result:</h3>
          <div className="result-content">{result}</div>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;