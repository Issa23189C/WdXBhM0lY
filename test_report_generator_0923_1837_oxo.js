// 代码生成时间: 2025-09-23 18:37:50
// test_report_generator.js
// 使用Next.js和Node.js创建一个测试报告生成器

const fs = require('fs');
const path = require('path');

// 假设有一个测试结果的JSON文件
const testResultsPath = path.join(process.cwd(), 'test-results.json');

// 读取测试结果函数
async function readTestResults() {
  try {
    const data = await fs.promises.readFile(testResultsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading test results:', error);
    throw error;
  }
}

// 生成测试报告函数
async function generateTestReport(results) {
  const reportTemplate = `
  <h1>Test Report</h1>
  <h2>Summary</h2>
  <p>Total Tests: {{totalTests}}</p>
  <p>Passed Tests: {{passedTests}}</p>
  <p>Failed Tests: {{failedTests}}</p>
  <h2>Details</h2>
  <ul>
    {{#each tests}}
      <li>{{this.name}} - {{this.status}}: {{this.message}}</li>
    {{/each}}
  </ul>
  `;
  const compiledTemplate = Handlebars.compile(reportTemplate);
  const context = {
    totalTests: results.length,
    passedTests: results.filter(test => test.status === 'passed').length,
    failedTests: results.filter(test => test.status === 'failed').length,
    tests: results
  };
  return compiledTemplate(context);
}

// 主函数，用于生成HTML格式的测试报告
async function main() {
  try {
    const testResults = await readTestResults();
    const testReport = await generateTestReport(testResults);
    // 将报告保存为HTML文件
    const reportPath = path.join(process.cwd(), 'test-report.html');
    await fs.promises.writeFile(reportPath, testReport);
    console.log('Test report generated successfully.');
  } catch (error) {
    console.error('Failed to generate test report:', error);
  }
}

// 确保在主模块中执行main函数
if (require.main === module) {
  main();
}

// 导出main函数以供测试
module.exports = { main };
