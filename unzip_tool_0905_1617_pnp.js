// 代码生成时间: 2025-09-05 16:17:37
const fs = require('fs-extra');
const path = require('path');
const unzipper = require('unzipper');

/**
 * 解压工具类
 * @class UnzipUtility
 */
class UnzipUtility {
  /**
   * 解压指定的文件
   * @param {string} sourcePath 压缩文件的路径
   * @param {string} destinationPath 解压后的文件存放路径
   * @returns {Promise<void>}
   */
  static async unzipFile(sourcePath, destinationPath) {
    try {
      // 检查源文件是否存在
      if (!fs.existsSync(sourcePath)) {
        throw new Error('Source file does not exist.');
      }

      // 确保目标目录存在，如果不存在则创建
      await fs.ensureDir(destinationPath);

      // 使用unzipper解压文件
      const fileStream = fs.createReadStream(sourcePath);
      await new Promise((resolve, reject) => {
        fileStream
          .pipe(unzipper.Extract({ path: destinationPath }));

        fileStream.on('error', (err) => {
          reject(err);
        });

        fileStream.on('finish', () => {
          resolve();
        });
      });
    } catch (error) {
      console.error('Error unzipping file:', error.message);
      throw error;
    }
  }
}

// 导出UnzipUtility类
module.exports = UnzipUtility;