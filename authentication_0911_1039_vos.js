// 代码生成时间: 2025-09-11 10:39:18
const { NextAuth } = require('next-auth');
const Providers = require('next-auth/providers');

// Auth configuration
const authOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // Custom logic to determine if a user should be allowed to sign in
      return true;
    },
    async redirect(url, baseUrl) {
      // Redirect users after sign in
      return baseUrl;
    },
    async session(session, user) {
      // Additional session handling
      return session;
    },
  },
};

// Exporting the auth function
module.exports = async function auth(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    // Authenticate the user using NextAuth
    await NextAuth(req, res, authOptions);
  } else {
    // Handle other request methods
    res.status(405).json({ error: 'Method not allowed' });
  }
};