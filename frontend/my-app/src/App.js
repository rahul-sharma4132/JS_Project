import React, { useState, useEffect } from 'react';
import TextGenerator from './components/TextGenerator';
import InteractionHistory from './components/InteractionHistory';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  
  useEffect(() => {
    // Test the backend connection
    fetch('http://localhost:5001/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error connecting to backend:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Web Development Project</h1>
        <p>Backend connection: {message || 'Connecting...'}</p>
        
        <div className="nav-buttons">
          <button 
            onClick={() => setShowHistory(false)}
            className={!showHistory ? 'active' : ''}
          >
            Generate Text
          </button>
          <button 
            onClick={() => setShowHistory(true)}
            className={showHistory ? 'active' : ''}
          >
            View History
          </button>
        </div>
      </header>
      
      <main>
        {showHistory ? <InteractionHistory /> : <TextGenerator />}
      </main>
    </div>
  );
}

export default App;