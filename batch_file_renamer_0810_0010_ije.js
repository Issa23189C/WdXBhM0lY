// 代码生成时间: 2025-08-10 00:10:02
const fs = require('fs');
const path = require('path');

// 批量重命名文件的工具类
class BatchFileRenamer {
  // 构造函数，接收文件夹路径和文件重命名规则
  constructor(directoryPath, renameRules) {
    this.directoryPath = directoryPath;
    this.renameRules = renameRules; // 规则对象：{ oldName: 'newName', ...}
  }

  // 执行批量重命名操作
  renameFiles() {
    try {
      // 获取目录下的所有文件
      const files = fs.readdirSync(this.directoryPath);

      // 遍历文件并进行重命名操作
      files.forEach((file) => {
        // 获取文件的完整路径
        const filePath = path.join(this.directoryPath, file);
        // 检查是否是文件
        if (fs.statSync(filePath).isFile()) {
          // 获取文件的扩展名
          const extension = path.extname(file);
          const fileNameWithoutExtension = path.basename(file, extension);

          // 检查是否需要重命名
          const newName = this.renameRules[fileNameWithoutExtension];
          if (newName) {
            // 构建新的文件名
            const newFileName = `${newName}${extension}`;
            const newFilePath = path.join(this.directoryPath, newFileName);

            // 重命名文件
            fs.renameSync(filePath, newFilePath);
            console.log(`Renamed ${file} to ${newFileName}`);
          } else {
            console.log(`No rename rule for ${file}`);
          }
        }
      });

      console.log('All files have been renamed successfully.');
    } catch (error) {
      console.error('Error occurred during renaming process:', error.message);
    }
  }
}

// 使用示例
// 假设我们有一个规则对象，需要将所有名为'oldName'的文件重命名为'newName'
const renameRules = {
  'oldName': 'newName'
};

// 创建BatchFileRenamer实例并调用renameFiles方法
const directoryPath = './path/to/your/directory';
const batchRenamer = new BatchFileRenamer(directoryPath, renameRules);
batchRenamer.renameFiles();
