// 代码生成时间: 2025-08-16 07:38:10
const fs = require('fs/promises');
const path = require('path');
const { convert } = require('docx');

// 定义文档转换器类
class DocumentConverter {
  // 构造函数，接收输入和输出目录
  constructor(inputDir, outputDir) {
    this.inputDir = inputDir;
    this.outputDir = outputDir;
  }

  // 异步方法，遍历输入目录中的文件
  async convertFiles() {
    try {
      // 读取输入目录中的所有文件
      const files = await fs.readdir(this.inputDir);
      for (const file of files) {
        const filePath = path.join(this.inputDir, file);
        const stats = await fs.stat(filePath);
        if (stats.isFile()) {
          // 如果是文件，则转换文件
          await this.convertFile(filePath);
        }
      }
    } catch (error) {
      // 错误处理
      console.error('Error converting files:', error);
    }
  }

  // 异步方法，转换单个文件
  async convertFile(filePath) {
    try {
      // 读取文件内容
      const fileContent = await fs.readFile(filePath);
      // 转换文件
      const result = await convert(fileContent);
      // 写入输出目录
      const outputFilePath = path.join(this.outputDir, path.basename(filePath, path.extname(filePath)) + '.txt');
      await fs.writeFile(outputFilePath, result);
      console.log(`File converted: ${outputFilePath}`);
    } catch (error) {
      // 错误处理
      console.error('Error converting file:', error);
    }
  }
}

// 使用示例
(async () => {
  const inputDir = './input';
  const outputDir = './output';
  const converter = new DocumentConverter(inputDir, outputDir);
  await converter.convertFiles();
})();
