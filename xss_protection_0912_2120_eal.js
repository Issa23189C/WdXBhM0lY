// 代码生成时间: 2025-09-12 21:20:15
const { JSDOM } = require('jsdom');

// Middleware function to sanitize user input against XSS attacks
const xssProtectionMiddleware = (req, res, next) => {
  // Sanitize user input
  const { query, body } = req;
  
  // Function to sanitize input
  const sanitizeInput = (input) => {
    const dom = new JSDOM(`<div>${input}</div>`);
    const text = dom.window.document.querySelector('div').textContent;
    return text;
  };
  
  // Sanitize query parameters and body
  req.query = Object.keys(query).reduce((sanitizedQuery, key) => {
    sanitizedQuery[key] = sanitizeInput(query[key]);
    return sanitizedQuery;
  }, {});
  
  req.body = Object.keys(body).reduce((sanitizedBody, key) => {
    sanitizedBody[key] = sanitizeInput(body[key]);
    return sanitizedBody;
  }, {});
  
  // Continue to the next middleware
  next();
};

// Export the middleware for use in Next.js
module.exports = xssProtectionMiddleware;