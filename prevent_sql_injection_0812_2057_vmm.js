// 代码生成时间: 2025-08-12 20:57:44
const { Pool } = require('pg'); // PostgreSQL client

// Configure your PostgreSQL database connection pool
const dbConfig = {
  user: 'your_username', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'your_database', // Replace with your PostgreSQL database name
  password: 'your_password', // Replace with your PostgreSQL password
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000, // 30 seconds
};

// Create a new database pool
const pool = new Pool(dbConfig);

// Next.js API route to handle SQL queries with prevention of SQL injection
const handler = async (req, res) => {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Retrieve the user input from the request body
  const { userInput } = req.body;
  if (!userInput) {
    return res.status(400).json({ error: 'User input is required' });
  }

  // Use parameterized queries to prevent SQL injection
  const queryText = 'SELECT * FROM users WHERE username = $1';
  try {
    // Execute the query using the database pool
    const result = await pool.query(queryText, [userInput]);
    // Send the query results as JSON
    res.status(200).json(result.rows);
  } catch (error) {
    // Handle any errors that occur during the query execution
    console.error('Database query error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the database pool connection if it's no longer needed
    await pool.end();
  }
};

// Export the handler for use in Next.js pages or API routes
module.exports = handler;