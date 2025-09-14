// 代码生成时间: 2025-09-14 21:44:56
const fs = require('fs');
const ExcelJS = require('exceljs');

// 错误处理中间件
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send('Server error');
}

// 创建Excel工作簿
function createWorkbook() {
  const workbook = new ExcelJS.Workbook();
  return workbook;
}

// 添加工作表
function addWorksheet(workbook) {
  const worksheet = workbook.addWorksheet('My Sheet');
  return worksheet;
}

// 向工作表添加数据
function addDataToWorksheet(worksheet, data) {
  for (let i = 0; i < data.length; i++) {
    worksheet.addRow(data[i]);
  }
}

// 导出Excel文件
function exportExcel(workbook, filename) {
  workbook.xlsx.writeBuffer().then(
    buffer => {
      fs.writeFileSync(filename, buffer);
      console.log('Excel file created successfully');
    },
    error => {
      console.error('Error creating Excel file:', error);
    }
  );
}

// 生成Excel文件的路由
async function generateExcel(req, res) {
  try {
    // 创建工作簿和工作表
    const workbook = createWorkbook();
    const worksheet = addWorksheet(workbook);

    // 示例数据
    const data = [
      ['ID', 'Name', 'Age'],
      [1, 'John Doe', 30],
      [2, 'Jane Doe', 25],
      [3, 'Sam Smith', 40],
    ];

    // 向工作表添加数据
    addDataToWorksheet(worksheet, data);

    // 导出Excel文件
    const filename = 'example.xlsx';
    exportExcel(workbook, filename);

    // 发送文件作为响应
    res.download(filename);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

module.exports = {
  generateExcel,
  errorHandler
};