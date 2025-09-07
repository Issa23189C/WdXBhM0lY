// 代码生成时间: 2025-09-07 23:32:49
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock database
const users = [];

// GET /users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// POST /users
app.post('/users', (req, res) => {
  const user = req.body;
  if (!user) {
    return res.status(400).json({ error: 'Bad request' });
  }
  users.push(user);
  res.status(201).json(user);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const updatedUser = { ...user, ...req.body };
  const index = users.indexOf(user);
  users[index] = updatedUser;
  res.status(200).json(updatedUser);
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.status(200).json(user);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});