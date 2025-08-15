// 代码生成时间: 2025-08-15 20:55:14
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

// Define a function to process a single CSV file
async function processCsvFile(fileStream, outputFile) {
  // Create a writable stream to the output file
  const outStream = fs.createWriteStream(outputFile);
  
  return new Promise((resolve, reject) => {
    // Set up error handling
    fileStream.on('error', reject);
    outStream.on('error', reject);
    
    // Pipe the input CSV file to the output file, transforming data along the way
    pipeline(fileStream, csv(), outStream, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('CSV file processed successfully');
      }
    });
  });
}

// Define a function to batch process multiple CSV files
async function processCsvFiles(inputDirectory, outputDirectory) {
  // Read all files in the input directory
  const files = await promisify(fs.readdir)(inputDirectory);
  
  // Process each CSV file
  for (const file of files) {
    if (path.extname(file) === '.csv') {
      const inputFilePath = path.join(inputDirectory, file);
      const outputFilePath = path.join(outputDirectory, file);
      
      try {
        console.log(`Processing file: ${file}`);
        await processCsvFile(fs.createReadStream(inputFilePath), outputFilePath);
        console.log(`Processed file: ${file}`);
      } catch (error) {
        console.error(`Error processing file: ${file}, Error: ${error.message}`);
      }
    }
  }
}

// Example usage
const inputDir = './input';
const outputDir = './output';

// Ensure the output directory exists
fs.mkdirSync(outputDir, { recursive: true });

// Process CSV files in batch
processCsvFiles(inputDir, outputDir)
  .then(() => console.log('All files processed successfully.'))
  .catch(error => console.error('Failed to process files:', error.message));