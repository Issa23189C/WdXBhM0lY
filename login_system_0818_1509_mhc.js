// 代码生成时间: 2025-08-18 15:09:48
 * and adheres to JS best practices for maintainability and scalability.
 */

const bcrypt = require('bcrypt');
const { NextResponse } = require('next/server');

// Mock database of users
const users = {
  'admin': {
    username: 'admin',
    passwordHash: bcrypt.hashSync('password123', 12)
  }
};

// Function to verify user credentials
async function verifyUser(username, password) {
  // Check if the username exists in the mock database
  if (!users[username]) {
    return {
      success: false,
      message: 'Username not found.'
    };
  }

  // Compare password hash with the one provided
  const isPasswordCorrect = await bcrypt.compare(password, users[username].passwordHash);
  if (!isPasswordCorrect) {
    return {
      success: false,
      message: 'Incorrect password.'
    };
  }

  // If credentials are correct, return success
  return {
    success: true,
    message: 'Login successful.'
  };
}

// Next.js API route to handle login requests
export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const verificationResult = await verifyUser(username, password);

    if (verificationResult.success) {
      return new NextResponse(
        JSON.stringify({ message: verificationResult.message }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: verificationResult.message }),
        { status: 401 }
      );
    }
  } catch (error) {
    // Error handling for unexpected issues
    console.error('Login error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'An error occurred during login.' }),
      { status: 500 }
    );
  }
}
