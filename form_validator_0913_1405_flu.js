// 代码生成时间: 2025-09-13 14:05:27
const { NextResponse } = require('next/server');

// FormValidator class to validate form data
class FormValidator {
  // Constructor to initialize the validator with rules
  constructor(rules) {
    this.rules = rules;
  }

  // Method to validate form data
  validate(data) {
    // Holds the errors found during validation
    const errors = [];

    // Iterate over each rule and validate the data
    for (const [field, rules] of Object.entries(this.rules)) {
      for (const rule of rules) {
        const { method, error } = rule;
        // Check if the field exists and is valid according to the rule
        if (!this[method](data[field])) {
          errors.push({ field, message: error });
        }
      }
    }

    // If there are errors, return them, otherwise return null
    return errors.length > 0 ? errors : null;
  }

  // Rule functions
  isRequired(value) {
    // Check if the value is not null and not empty
    return value !== null && value.trim() !== '';
  }

  isEmail(value) {
    // Simple regex for email validation
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  }

  isPasswordStrong(value) {
    // Check if the password is at least 8 characters long and contains a mix of characters
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!#%*]{8,}$/.test(value);
  }

  // Add more rule functions as needed
}

// Example usage of the FormValidator
const formRules = {
  email: [{ method: 'isRequired', error: 'Email is required' }, { method: 'isEmail', error: 'Invalid email format' }],
  password: [{ method: 'isRequired', error: 'Password is required' }, { method: 'isPasswordStrong', error: 'Password must be at least 8 characters long and include a mix of characters' }]
};

const validator = new FormValidator(formRules);

// Example data to validate
const formData = { email: 'example@example.com', password: 'password123' };

// Perform validation and handle errors
const validationResult = validator.validate(formData);
if (validationResult) {
  console.error('Validation errors:', validationResult);
} else {
  console.log('Validation succeeded');
}
