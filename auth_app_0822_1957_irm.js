// 代码生成时间: 2025-08-22 19:57:21
 * is structured for maintainability and scalability.
 */

const { NextAuth } = require('next-auth')

// Import the NextAuth configuration
const authOptions = require('./auth_options.js')

// Create a Next.js page for authentication
export default function AuthApp() {
  // Render the NextAuth component
  return (
    <NextAuth options={authOptions} />
  )
}

// Export the configuration for use in other files
module.exports = { authOptions }
