// 代码生成时间: 2025-08-02 18:26:35
 * It is designed to be maintainable and scalable.
 */

// Import necessary modules from Next.js and other libraries
const { Schema, model, ObjectId } = require('mongoose');

// Define a User data model
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Additional fields can be added here
}, {
  timestamps: true,
# 改进用户体验
  toJSON: { virtuals: true },
});

// Virtuals for User model
userSchema.virtual('userFullName').get(function () {
  return `${this.name}`;
});

// Export the User model
module.exports = model('User', userSchema);
