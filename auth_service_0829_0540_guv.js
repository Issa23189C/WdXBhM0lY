// 代码生成时间: 2025-08-29 05:40:50
const jwt = require('jsonwebtoken'); // Required for generating JWT tokens
const bcrypt = require('bcryptjs'); // Required for hashing and checking passwords

// Mock database for user data
const users = {
  'user1': {
    id: 1,
    username: 'user1',
    password: bcrypt.hashSync('password123', 8), // Store the hashed password
  },
};

// Configuration for JWT
const jwtConfig = {
  secret: 'my_secret_key', // Should be kept secret and not hard-coded in a real application
  expiresIn: '1d', // Token validity
};

class AuthService {
  // Authenticate user with username and password
  async authenticateUser(username, password) {
    try {
      // Find user by username
      const user = users[username];
      if (!user) {
        throw new Error('User not found');
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign({
        id: user.id,
        username: user.username,
      }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });

      return {
        success: true,
        token,
      };
    } catch (error) {
      // Handle errors, such as user not found or invalid password
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

// Export the AuthService class
module.exports = new AuthService();