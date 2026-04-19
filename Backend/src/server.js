const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares
app.use(cors())
app.use(express.json());

// A simple test route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'SabiSell Backend is running perfectly! 🚀' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});