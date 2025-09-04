// 代码生成时间: 2025-09-04 12:50:40
const http = require('http');
const { NextResponse } = require('next/server');

// Function to generate a random number
// @param {number} min - The minimum number in the range
// @param {number} max - The maximum number in the range
// @returns {number} - A random number between min and max
function generateRandomNumber(min, max) {
  if (min > max) {
    throw new Error('Min value should be less than max value');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Next.js API route handler
// @param {any} req - The HTTP request object
// @param {any} res - The HTTP response object
// @returns {NextResponse} - The response object with a random number
async function handler(req, res) {
  try {
    const { min, max } = req.nextUrl.searchParams;
    // Validate input parameters
    if (!min || !max) {
      return new NextResponse('Missing parameters: min and max', { status: 400 });
    }
    const minNumber = parseInt(min, 10);
    const maxNumber = parseInt(max, 10);
    if (isNaN(minNumber) || isNaN(maxNumber)) {
      return new NextResponse('Invalid parameters: min and max should be numbers', { status: 400 });
    }
    const randomNumber = generateRandomNumber(minNumber, maxNumber);
    return new NextResponse(`Random number generated: ${randomNumber}`, { status: 200 });
  } catch (error) {
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}

// Export the handler
export { handler as GET };
