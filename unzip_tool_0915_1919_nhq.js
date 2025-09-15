// 代码生成时间: 2025-09-15 19:19:45
 * Features:
 * - Unzipping files
 * - Error handling
 * - Comments and documentation
 * - Adhere to JS best practices
 * - Maintainability and extensibility
 */

// Import necessary modules
const fs = require('fs');
const path = require('path');
const util = require('util');
const unzipper = require('unzipper');

// Promisify fs.mkdir to handle asynchronous directory creation
const mkdir = util.promisify(fs.mkdir);

// The UnzipTool class
class UnzipTool {
  // Constructor to initialize the UnzipTool with a source file path
  constructor(sourcePath) {
    this.sourcePath = sourcePath;
  }

  // Method to extract the zip file to a specified destination
  async extract(destPath) {
    try {
      // Ensure the destination directory exists
      await mkdir(destPath, { recursive: true });

      // Use fs.createReadStream to create a readable stream from the source zip file
      const readStream = fs.createReadStream(this.sourcePath);

      // Use unzipper to extract the zip file contents
      await readStream.pipe(unzipper.Extract({ path: destPath }));

      console.log('File extracted successfully to:', destPath);
    } catch (error) {
      // Error handling for any exceptions that occur during extraction
      console.error('Failed to extract file:', error);
      throw error;
    }
  }
}

// Export the UnzipTool class for use in other parts of the application
module.exports = UnzipTool;
