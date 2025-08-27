// 代码生成时间: 2025-08-28 07:49:58
const fs = require('fs').promises;
const path = require('path');

/**
 * 批量文件重命名工具
 * @param {string} directory - 文件夹路径
 * @param {Object[]} renameRules - 重命名规则数组
 * @param {string} renameRules.pattern - 文件匹配模式
 * @param {string} renameRules.replacement - 文件替换模式
 */
async function batchRenameFiles(directory, renameRules) {
  try {
    // 读取目录内所有文件
    const files = await fs.readdir(directory);

    // 遍历文件列表
    for (const file of files) {
      // 获取文件完整路径
      const filePath = path.join(directory, file);

      // 检查是否为文件
      if (await isFile(filePath)) {
        // 遍历重命名规则
        for (const rule of renameRules) {
          // 检查文件名是否匹配规则中的模式
          if (file.match(rule.pattern)) {
            // 构造新的文件名
            const newFileName = file.replace(rule.pattern, rule.replacement);
            // 构造新文件的完整路径
            const newFilePath = path.join(directory, newFileName);

            // 重命名文件
            await fs.rename(filePath, newFilePath);
            console.log(`文件 ${file} 已重命名为 ${newFileName}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('批量文件重命名失败:', error);
  }
}

/**
 * 检查路径是否为文件
 * @param {string} filePath - 文件路径
 * @returns {Promise<boolean>} - 是否为文件
 */
async function isFile(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.isFile();
  } catch (error) {
    console.error('检查文件失败:', error);
    return false;
  }
}

// 示例使用
const directoryPath = './path/to/your/directory'; // 替换为实际目录路径
const renameRules = [
  {
    pattern: /oldName/g,
    replacement: 'newName'
  },
  // 可以添加更多的重命名规则
];

batchRenameFiles(directoryPath, renameRules);
