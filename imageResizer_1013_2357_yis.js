// 代码生成时间: 2025-10-13 23:57:51
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs').promises;

// 图片尺寸批量调整器
class ImageResizer {
  /**
   * 构造函数，设置输入和输出目录
   * @param {string} inputDir - 输入目录
   * @param {string} outputDir - 输出目录
   */
  constructor(inputDir, outputDir) {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
  }

  /**
   * 调整单个图片尺寸
   * @param {string} imageFilePath - 图片文件路径
   * @param {number} targetWidth - 目标宽度
   * @param {number} targetHeight - 目标高度
   * @returns {Promise<string>} - 调整后的图片路径
   */
  async resizeImage(imageFilePath, targetWidth, targetHeight) {
    try {
      const image = await loadImage(imageFilePath);
      const canvas = createCanvas(targetWidth, targetHeight);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

      const outputPath = path.join(this.outputDir, path.basename(imageFilePath));
      return new Promise((resolve, reject) => {
        canvas.createPNGStream().pipe(fs.createWriteStream(outputPath))
          .on('finish', () => resolve(outputPath))
          .on('error', reject);
      });
    } catch (error) {
      throw new Error(`Error resizing image: ${error.message}`);
    }
  }

  /**
   * 批量调整目录下所有图片尺寸
   * @param {number} targetWidth - 目标宽度
   * @param {number} targetHeight - 目标高度
   * @returns {Promise<string[]>} - 调整后的图片路径数组
   */
  async resizeImages(targetWidth, targetHeight) {
    try {
      const files = await fs.readdir(this.inputDir);
      const resizedImages = [];

      for (const file of files) {
        const filePath = path.join(this.inputDir, file);
        const resizedPath = await this.resizeImage(filePath, targetWidth, targetHeight);
        resizedImages.push(resizedPath);
      }

      return resizedImages;
    } catch (error) {
      throw new Error(`Error resizing images: ${error.message}`);
    }
  }
}

// 使用示例
const inputDir = './input';
const outputDir = './output';
const targetWidth = 800;
const targetHeight = 600;

(async () => {
  const imageResizer = new ImageResizer(inputDir, outputDir);
  try {
    const resizedImages = await imageResizer.resizeImages(targetWidth, targetHeight);
    console.log('Resized images:', resizedImages);
  } catch (error) {
    console.error('Error:', error);
  }
})();