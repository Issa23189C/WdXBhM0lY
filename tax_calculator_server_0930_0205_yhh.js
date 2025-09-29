// 代码生成时间: 2025-09-30 02:05:21
require('dotenv').config();
const express = require('express');
const next = require('next');

// Create an instance of Next.js
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = nextApp.getRequestHandler();

// Create an express server
const expressApp = express();

// Define a tax calculator function
function calculateTax(income) {
  // Basic tax calculation logic for demonstration purposes
  // In a real-world scenario, this would be more complex and configurable
  if (income <= 0) {
    throw new Error('Income must be greater than 0');
  }
  const taxRate = 0.2; // 20% tax rate
  return income * taxRate;
}

// API endpoint to calculate tax
expressApp.post('/api/calculate-tax', (req, res) => {
  try {
    // Validate input
    if (!req.body || typeof req.body.income !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }
    const income = req.body.income;
    const tax = calculateTax(income);
    res.json({ tax });
  } catch (error) {
    // Error handling
    res.status(500).json({ error: error.message });
  }
});

// Prepare Next.js for rendering
nextApp.prepare().then(() => {
  // Server listening on port 3000
  expressApp.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
  
  // Handle requests with Next.js
  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });
});