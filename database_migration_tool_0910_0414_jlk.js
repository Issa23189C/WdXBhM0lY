// 代码生成时间: 2025-09-10 04:14:44
const { createClient } = require('next-database-client'); // Assume next-database-client is a hypothetical module
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// Configuration for the database client
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Function to run migration scripts
async function runMigrations() {
  try {
    // Create a database client
    const db = createClient(dbConfig);

    // Connect to the database
    await db.connect();

    // List of migration scripts to be executed
    const migrations = ['001_create_users_table.js', '002_add_email_index.js'];

    // Execute each migration script
    for (const migration of migrations) {
      await exec(`node ${migration}`);
    }

    // Disconnect from the database
    await db.disconnect();
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

// Run the migration tool
runMigrations();