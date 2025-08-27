// 代码生成时间: 2025-08-27 21:41:30
// configManager.js
// This module provides a simple configuration manager for Next.js applications.

const fs = require('fs');
const path = require('path');

// Define the configuration file name and path
const CONFIG_FILE = 'config.json';
const CONFIG_PATH = path.join(process.cwd(), CONFIG_FILE);

class ConfigManager {
  // Load configuration from file
  static loadConfig() {
    try {
      // Check if the config file exists
      if (!fs.existsSync(CONFIG_PATH)) {
        throw new Error('Configuration file does not exist.');
      }
      
      // Read the config file and parse it as JSON
      const rawData = fs.readFileSync(CONFIG_PATH, 'utf8');
      const config = JSON.parse(rawData);
      return config;
    } catch (error) {
      // Handle errors such as file not found or invalid JSON
      console.error('Error loading configuration:', error.message);
      throw error;
    }
  }

  // Save configuration to file
  static saveConfig(config) {
    try {
      // Validate the config object before saving
      if (typeof config !== 'object' || config === null) {
        throw new Error('Invalid configuration object.');
      }
      
      // Convert the config object to JSON and write to file
      const rawData = JSON.stringify(config, null, 2);
      fs.writeFileSync(CONFIG_PATH, rawData, 'utf8');
    } catch (error) {
      // Handle errors such as write failure
      console.error('Error saving configuration:', error.message);
      throw error;
    }
  }
}

module.exports = ConfigManager;
