// 代码生成时间: 2025-09-12 02:37:15
 * Features:
 * - Clear code structure for easy understanding.
 * - Error handling included.
 * - Necessary comments and documentation.
 * - Adherence to JS best practices.
 * - Maintainability and extensibility ensured.
 */

const Nexmo = require('nexmo');
const ExcelJS = require('exceljs');
const fs = require('fs');

// Initialize the Nexmo client with API credentials
const nexmo = new Nexmo({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
});

// Function to generate an Excel file
async function generateExcel(data, filename) {
  try {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a worksheet to the workbook
    const worksheet = workbook.addWorksheet('My Sheet');

    // Add data to the worksheet
    const columns = Object.keys(data[0]); // Assuming data is an array of objects
    worksheet.columns = columns.map((key) => ({ header: key, key: key }));
    data.forEach((row) => worksheet.addRow(row));

    // Write the workbook to a file
    const buffer = await workbook.xlsx.writeBuffer();
    fs.writeFileSync(filename, buffer);

    console.log(`Excel file generated successfully: ${filename}`);
  } catch (error) {
    // Error handling
    console.error('Error generating Excel file:', error.message);
    throw error;
  }
}

// Example usage
const data = [
  { name: 'John Doe', age: 30, job: 'Developer' },
  { name: 'Jane Doe', age: 25, job: 'Designer' },
];

generateExcel(data, 'output.xlsx');