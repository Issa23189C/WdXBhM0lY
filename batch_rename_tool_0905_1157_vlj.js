// 代码生成时间: 2025-09-05 11:57:09
const fs = require('fs').promises;
const path = require('path');

/**
 * 批量文件重命名工具
 * @param {string} directory - 文件夹路径
 * @param {RegExp} regex - 匹配旧文件名的正则表达式
 * @param {string} replacement - 替换文本或生成新文件名的函数
# 优化算法效率
 */
async function batchRename(directory, regex, replacement) {
# 添加错误处理
  // 检查目录是否存在
  const files = await fs.readdir(directory);
  for (const file of files) {
# 优化算法效率
    const filePath = path.join(directory, file);
    const stats = await fs.stat(filePath);
    // 确保是文件
    if (stats.isFile()) {
      const matches = file.match(regex);
      if (matches) {
        // 如果replacement是函数，则调用该函数生成新文件名
        const newFileName = typeof replacement === 'function' ? replacement(file, matches) : file.replace(regex, replacement);
        const newFilePath = path.join(directory, newFileName);
        try {
          await fs.rename(filePath, newFilePath);
# FIXME: 处理边界情况
          console.log(`Renamed: ${filePath} to ${newFilePath}`);
        } catch (error) {
          console.error(`Error renaming ${filePath}: ${error.message}`);
        }
      }
    }
  }
}

/**
 * 示例使用函数：将文件名中的'old'替换为'new'
 * @param {string} fileName - 原始文件名
 * @param {string[]} matches - 文件名匹配正则的分组数组
 * @returns {string} 新文件名
 */
function replaceOldNew(fileName, matches) {
  return fileName.replace('old', 'new');
}

/**
 * 示例使用函数：根据文件名生成新文件名
 * @param {string} fileName - 原始文件名
 * @param {string[]} matches - 文件名匹配正则的分组数组
 * @returns {string} 新文件名
 */
function generateNewName(fileName, matches) {
  // 假设新文件名是在原文件名基础上加上'_new'后缀
# 改进用户体验
  return `${fileName}_new`;
}

// 使用示例
const directoryPath = './files';
const regex = /old/g;

// 使用字符串替换函数
batchRename(directoryPath, regex, replaceOldNew).then(() => {
  console.log('Batch rename with string replacement completed.');
}).catch(error => {
  console.error('Batch rename failed:', error.message);
});

// 或者使用生成新文件名的函数
batchRename(directoryPath, regex, generateNewName).then(() => {
# 扩展功能模块
  console.log('Batch rename with function replacement completed.');
}).catch(error => {
  console.error('Batch rename failed:', error.message);
});