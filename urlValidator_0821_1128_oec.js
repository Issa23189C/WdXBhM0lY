// 代码生成时间: 2025-08-21 11:28:06
const fetch = require('node-fetch');

// Function to validate URL
async function validateUrl(url) {
  // Check if the input is a string
  if (typeof url !== 'string') {
    throw new Error('Invalid input: URL must be a string.');
  }

  // Remove any trailing slash from the URL
  const trimmedUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  try {
    // Use fetch to check if the URL is reachable
    const response = await fetch(trimmedUrl, { method: 'HEAD' });

    // Check if the response status code is between 200 and 299 (OK)
    if (!response.ok) {
      throw new Error(`URL ${trimmedUrl} is not reachable. Status code: ${response.status}`);
    }

    // Return true if the URL is valid and reachable
    return true;
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error(`Error validating URL: ${error.message}`);
    return false;
  }
}

// Example usage of the validator function
const testUrl = 'https://example.com';
validateUrl(testUrl)
  .then(isValid => {
    if (isValid) {
      console.log(`The URL ${testUrl} is valid and accessible.`);
    } else {
      console.log(`The URL ${testUrl} is not valid or not accessible.`);
    }
  })
  .catch(error => {
    console.error(`An error occurred: ${error.message}`);
  });