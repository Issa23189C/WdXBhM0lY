// 代码生成时间: 2025-08-28 20:22:28
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

// Configuration for MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017';
const MONGO_DB = 'loginSystemDB';

// Function to connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(MONGO_DB);
  } catch (err) {
    console.error('An error occurred connecting to MongoDB:', err);
    throw err;
  }
}

// Function to verify user credentials
async function verifyUserCredentials(username, password) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  try {
    const user = await usersCollection.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordsMatch) {
      throw new Error('Incorrect password');
    }

    return {
      username: user.username,
      success: true,
      message: 'User verified successfully',
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}

// Helper function to hash password
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

// Exporting the functions for use in Next.js
module.exports = {
  verifyUserCredentials,
  hashPassword,
};