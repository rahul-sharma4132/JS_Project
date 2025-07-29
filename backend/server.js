const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Body parser middleware
app.use(express.json());

// Import routes
const aiRoutes = require('./routes/ai');



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Test route with explicit headers
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Mount AI routes
app.use('/api/ai', aiRoutes);

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`- Root endpoint: http://localhost:${PORT}/`);
  console.log(`- Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`- AI endpoint: http://localhost:${PORT}/api/ai/generate`);
});