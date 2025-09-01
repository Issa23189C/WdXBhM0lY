// 代码生成时间: 2025-09-01 12:16:54
const ExcelJS = require('exceljs');

// Function to create a new Excel workbook
function createExcelWorkbook() {
  // Create a new Excel workbook
  const workbook = new ExcelJS.Workbook();
  return workbook;
}

// Function to add a new worksheet to the workbook
function addWorksheet(workbook, title) {
  if (!workbook) {
    throw new Error('Workbook is not initialized.');
  }
  const worksheet = workbook.addWorksheet(title);
  return worksheet;
}

// Function to set values in a cell
function setCell(worksheet, cellAddress, value) {
  if (!worksheet) {
    throw new Error('Worksheet is not initialized.');
  }
  const cell = worksheet.getCell(cellAddress);
  cell.value = value;
}

// Function to save the Excel workbook as a file
async function saveExcelFile(workbook, fileName) {
  if (!workbook) {
    throw new Error('Workbook is not initialized.');
  }
  await workbook.xlsx.writeFile(fileName);
  console.log(`Excel file saved as ${fileName}`);
}

// Example usage
async function generateExcel() {
  try {
    // Create a new workbook
    const workbook = createExcelWorkbook();
    
    // Add a new worksheet
    const worksheet = addWorksheet(workbook, 'My Sheet');
    
    // Set values in cells
    setCell(worksheet, 'A1', 'Name');
    setCell(worksheet, 'B1', 'Age');
    setCell(worksheet, 'A2', 'John Doe');
    setCell(worksheet, 'B2', 30);
    
    // Save the workbook as an Excel file
    await saveExcelFile(workbook, 'example.xlsx');
  } catch (error) {
    console.error('Error generating Excel file:', error);
  }
}

// Exporting the functions to be used in other modules
module.exports = {
  createExcelWorkbook,
  addWorksheet,
  setCell,
  saveExcelFile,
  generateExcel
};