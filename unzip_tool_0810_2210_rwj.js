// 代码生成时间: 2025-08-10 22:10:12
 * It is designed to be easily understandable and maintainable, with proper error handling and comments.
 *
 * @module UnzipTool
 */

const { createReadStream } = require('fs');
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');
const zlib = require('zlib');

/**
 * Extracts a file from a ZIP archive.
 * @param {string} zipFilePath - The path to the ZIP archive.
 * @param {string} outputPath - The path where the extracted files will be saved.
 * @returns {Promise<void>} - Resolves when the extraction is complete, rejects on error.
 */
async function extractFileFromZip(zipFilePath, outputPath) {
  return new Promise((resolve, reject) => {
    // Create a readable stream for the ZIP file.
    const readStream = createReadStream(zipFilePath);
    
    // Create a zlib gunzip stream for decompression.
    const unzipper = zlib.createGunzip();
    
    // Create a writable stream for the extracted file.
    const writeStream = createWriteStream(outputPath);
    
    // Pipeline the streams to handle the extraction.
    pipeline(readStream, unzipper, writeStream, (err) => {
      if (err) {
        reject(new Error(`Failed to extract file: ${err.message}`));
      } else {
        resolve();
      }
    });
  });
}

/**
 * Next.js API route handler for file extraction.
 * @param {import('http').IncomingMessage} req - The incoming HTTP request.
 * @param {import('http').ServerResponse} res - The outgoing HTTP response.
 * @returns {void}
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST requests are accepted.'
    });
  }

  try {
    const { zipFilePath, outputPath } = req.body;
    await extractFileFromZip(zipFilePath, outputPath);
    res.status(200).json({
      message: 'File extracted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
}

// Example usage:
// const zipFilePath = '/path/to/archive.zip';
// const outputPath = '/path/to/output/file';
// extractFileFromZip(zipFilePath, outputPath).then(() => {
//   console.log('Extraction complete.');
// }).catch((error) => {
//   console.error('Extraction failed:', error);
// });