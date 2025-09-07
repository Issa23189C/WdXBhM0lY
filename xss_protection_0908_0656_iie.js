// 代码生成时间: 2025-09-08 06:56:11
const { escapeHTML } = require('escape-html');

// Middleware to sanitize user input
const xssProtection = (req, res, next) => {
  // Sanitize all input from the query, body, and headers
  ['query', 'body', 'headers'].forEach((inputType) => {
    if (req[inputType]) {
      Object.keys(req[inputType]).forEach((key) => {
        req[inputType][key] = escapeHTML(String(req[inputType][key]));
      });
    }
  });
  // Continue to the next middleware
  next();
};

// Export the middleware for use in Next.js
module.exports = xssProtection;