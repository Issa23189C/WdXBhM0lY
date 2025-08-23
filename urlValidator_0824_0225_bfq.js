// 代码生成时间: 2025-08-24 02:25:37
// Import necessary modules
const { NextResponse } = require('next/server');
const fetch = require('node-fetch');

// Function to validate URL
async function isValidURL(url) {
  // Check if the URL starts with http or https
  if (!url.match(/^https?:\/\/.*/)) {
    return false;
  }

  try {
    // Send a HEAD request to check if the URL is reachable
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching URL:', error);
    return false;
  }
}

// Next.js API route handler
export async function POST(request) {
  // Extract the URL from the request body
  const { url } = await request.json();

  // Validate the URL and generate a response
  if (isValidURL(url)) {
    return new NextResponse('URL is valid and reachable', { status: 200 });
  } else {
    return new NextResponse('Invalid URL or not reachable', { status: 400 });
  }
}

// Export the function to be used as an API route
export default isValidURL;