// 代码生成时间: 2025-08-26 20:26:01
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

// Define the function to compress files
async function compressFiles(inputFolder, outputFilePath) {
  try {
    const archive = archiver('zip', { zlib: { level: 9 } }); // Set archive type and compression level
    const stream = fs.createWriteStream(outputFilePath);

    // Listen for all archive data to be written
    archive
      .on('finish', () => console.log('Archive created successfully.'))
      .on('error', (err) => throw err);

    // Pipe archive data to the file system
    await archive.pipe(stream);
    await archive.directory(inputFolder, false); // false to prevent directory nesting
    await archive.finalize();
  } catch (err) {
    console.error('Error compressing files:', err);
  }
}

// Define the function to decompress files
async function decompressFiles(inputFilePath, outputFolder) {
  try {
    await fs.ensureDir(outputFolder); // Ensure the output directory exists

    const readStream = fs.createReadStream(inputFilePath);
    const extract = archiver('extract');
    const writeStream = extract.pipe(fs.createWriteStream(path.join(outputFolder, 'decompressed')));

    // Listen for all archive data to be extracted
    extract.on('finish', () => console.log('Archive extracted successfully.'));
    extract.on('error', (err) => throw err);

    // Pipe the read stream to the extract stream
    await readStream.pipe(extract);
    await extract.finalize();
  } catch (err) {
    console.error('Error decompressing files:', err);
  }
}

// Export the functions for use in other parts of the application
module.exports = { compressFiles, decompressFiles };