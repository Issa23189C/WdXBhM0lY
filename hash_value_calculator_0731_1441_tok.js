// 代码生成时间: 2025-07-31 14:41:08
const crypto = require('crypto');

// Function to calculate hash value
async function calculateHash(inputString, algorithm = 'sha256') {
  // Check if the input is valid
  if (typeof inputString !== 'string') {
    throw new Error('Input must be a string');
  }

  // Check if the algorithm is supported
  if (!crypto.getHashes().includes(algorithm)) {
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }

  // Create a new hash instance
  const hash = crypto.createHash(algorithm);

  // Update the hash with the input string
  hash.update(inputString);

  // Calculate the hash value
  const hashValue = hash.digest('hex');

  // Return the hash value
  return hashValue;
}

// Export the function for use
module.exports = { calculateHash };
