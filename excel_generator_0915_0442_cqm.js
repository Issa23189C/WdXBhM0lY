// 代码生成时间: 2025-09-15 04:42:18
const ExcelJS = require('exceljs');

// Excel表格自动生成器
class ExcelGenerator {

  // 构造函数
  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  // 添加工作表
  addWorksheet(name) {
    this.worksheet = this.workbook.addWorksheet(name);
  }

  // 添加数据行
  addRow(data) {
    if (!this.worksheet) {
      throw new Error('Worksheet is not initialized. Please add a worksheet first.');
    }
    this.worksheet.addRow(data);
  }

  // 导出Excel文件
  async exportExcel(fileName) {
    if (!this.worksheet) {
      throw new Error('Worksheet is not initialized. Please add a worksheet first.');
    }
    try {
      await this.workbook.xlsx.writeFile(fileName);
      console.log(`Excel file '${fileName}' has been created successfully!`);
    } catch (error) {
      console.error('Failed to write Excel file:', error);
    }
  }
}

// 使用示例
const excelGenerator = new ExcelGenerator();

// 添加工作表
excelGenerator.addWorksheet('My WorkSheet');

// 添加数据行
excelGenerator.addRow(['Header1', 'Header2', 'Header3']);
excelGenerator.addRow([1, 2, 3]);
excelGenerator.addRow([4, 5, 6]);

// 导出Excel文件
(async () => {
  await excelGenerator.exportExcel('example.xlsx');
})();

module.exports = ExcelGenerator;