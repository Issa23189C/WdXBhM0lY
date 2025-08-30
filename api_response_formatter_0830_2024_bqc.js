// 代码生成时间: 2025-08-30 20:24:06
// api_response_formatter.js
// This module provides a utility to format API responses using Next.js framework.

const { NextResponse } = require('next');

/**
 * Formats a standard API response with status code and message.
 * @param {Object} data - The data to be sent in the response.
 * @param {number} statusCode - The HTTP status code to send with the response.
 * @param {string} message - An optional message to include in the response.
 * @returns {NextResponse} A NextResponse object with the formatted API response.
 */
function formatApiResponse(data, statusCode = 200, message = 'OK') {
  // Create a response object with the provided data, status code, and message.
  return NextResponse.json({
    status: statusCode,
    message: message,
    data: data,
  });
}

/**
 * Error handling middleware for API responses.
 * @param {Error} error - The error object to format in the response.
 * @returns {NextResponse} A NextResponse object with the formatted API error response.
 */
function handleApiError(error) {
  // Log the error for debugging purposes.
  console.error(error);

  // Determine the status code from the error, defaulting to 500 if not provided.
  const statusCode = error.statusCode || 500;

  // Create a response object with the error message and status code.
  return NextResponse.json({
    status: statusCode,
    message: error.message || 'Internal Server Error',
    data: null,
  }, statusCode);
}

// Export the functions for use in other parts of the application.
module.exports = {
  formatApiResponse,
  handleApiError,
};