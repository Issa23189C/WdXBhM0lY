// 代码生成时间: 2025-10-10 15:42:05
const fs = require('fs').promises;
const sharp = require('sharp');
const path = require('path');

/**
 * Resize images in a specified directory.
 * @param {string} directoryPath - The path to the directory containing images.
 * @param {number} targetWidth - The target width for resizing.
 * @param {number} targetHeight - The target height for resizing.
 * @param {string} outputDirectory - The path to the directory where resized images will be saved.
 */
async function resizeImages(directoryPath, targetWidth, targetHeight, outputDirectory) {
  // Ensure output directory exists
  await fs.mkdir(outputDirectory, { recursive: true });

  const files = await fs.readdir(directoryPath);
  for (const file of files) {
    if (!file.endsWith('.jpg') && !file.endsWith('.png') && !file.endsWith('.jpeg')) {
      console.log(`Skipping non-image file: ${file}`);
      continue;
# FIXME: 处理边界情况
    }

    try {
      const inputFilePath = path.join(directoryPath, file);
# NOTE: 重要实现细节
      const outputFilePath = path.join(outputDirectory, file);

      // Resize image using sharp
      await sharp(inputFilePath)
        .resize({
          width: targetWidth,
# 增强安全性
          height: targetHeight,
          withoutEnlargement: true
        }).toFile(outputFilePath);

      console.log(`Resized and saved ${file} to ${outputDirectory}`);
    } catch (error) {
      console.error(`Error resizing ${file}: ${error.message}`);
    }
  }
}

// Example usage
const directoryPath = 'path/to/images';
const targetWidth = 800;
const targetHeight = 600;
const outputDirectory = 'path/to/output';

resizeImages(directoryPath, targetWidth, targetHeight, outputDirectory)
  .then(() => console.log('All images have been resized.'))
  .catch(error => console.error('Failed to resize images:', error.message));