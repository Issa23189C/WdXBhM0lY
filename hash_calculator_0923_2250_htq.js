// 代码生成时间: 2025-09-23 22:50:08
 * Provides a route to calculate and return hash values for given input.
 */

const crypto = require('crypto');

// Define a Next.js API route for hash calculation
function calculateHash(req, res) {
  // Check if the input is provided
  if (!req.body.input) {
    return res.status(400).json({
      error: 'Input is required.'
    });
  }

  // Calculate the hash using SHA-256 algorithm
  const hash = crypto.createHash('sha256').update(req.body.input).digest('hex');

  // Return the hash value in the response
  return res.status(200).json({
    hash: hash
  });
}

// Export the API route handler
module.exports = calculateHash;