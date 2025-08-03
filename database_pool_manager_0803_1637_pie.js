// 代码生成时间: 2025-08-03 16:37:28
// Import necessary modules
const { Pool } = require('pg'); // Assuming PostgreSQL, change accordingly if using another DB

// Configuration for the database connection pool
const poolConfig = {
  user: 'your_username', // Replace with your database username
  host: 'localhost',
  database: 'your_database', // Replace with your database name
  password: 'your_password', // Replace with your database password
  port: 5432, // Default port for PostgreSQL, change if different
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close connections that have been idle for 30 seconds
  connectionTimeoutMillis: 2000, // Timeout for waiting for a connection from the pool
};

// Create a new instance of the pool
const pool = new Pool(poolConfig);

// Function to query the database using the pool
async function queryDatabase(text, params) {
  try {
    // Get a client from the pool
    const client = await pool.connect();
    try {
      // Execute the query and return the results
      const res = await client.query(text, params);
      return res;
    } catch (err) {
      // Handle any errors that occur during the query execution
      console.error('Error executing query:', err);
      throw err;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (err) {
    // Handle any errors that occur while getting a client from the pool
    console.error('Error getting client from pool:', err);
    throw err;
  }
}

// Export the query function for other modules to use
module.exports = { queryDatabase };
