import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InteractionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/ai/history');
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load interaction history');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) return <div>Loading history...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="interaction-history">
      <h2>Past Interactions</h2>
      
      {history.length === 0 ? (
        <p>No interactions yet. Try generating some text!</p>
      ) : (
        <ul className="history-list">
          {history.map((item) => (
            <li key={item._id} className="history-item">
              <div className="history-meta">
                <span className="history-time">{formatDate(item.createdAt)}</span>
              </div>
              <div className="history-prompt">
                <strong>Prompt:</strong> {item.prompt}
              </div>
              <div className="history-response">
                <strong>Response:</strong> {item.response}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InteractionHistory;