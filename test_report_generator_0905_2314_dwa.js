// 代码生成时间: 2025-09-05 23:14:02
// 引入必须的模块
const fs = require('fs').promises;
const path = require('path');
const { JSDOM } = require('jsdom');

// 创建测试报告生成器类
class TestReportGenerator {
  // 构造函数接收测试结果文件路径
  constructor(testResultsPath) {
    this.testResultsPath = testResultsPath;
  }

  // 生成HTML测试报告
  async generateTestReport() {
    try {
      // 读取测试结果文件
      const testResults = await fs.readFile(this.testResultsPath, 'utf8');
      // 解析测试结果为JSON
      const results = JSON.parse(testResults);
      // 创建一个新的JSDOM实例
      const dom = new JSDOM();
      // 使用JSDOM的document对象
      const { document } = dom.window;
      
      // 设置HTML模板的基本结构
      document.body.innerHTML = `<h1>Test Report</h1>
                                <table>
                                  <thead>
                                    <tr><th>Test Name</th><th>Status</th><th>Message</th></tr>
                                  </thead>
                                  <tbody id='test-results'></tbody>
                                </table>`;
      
      // 遍历测试结果并填充表格
      results.forEach((test) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${test.name}</td><td>${test.status}</td><td>${test.message}</td>`;
        document.querySelector('#test-results').appendChild(row);
      });
      
      // 将HTML内容转换为字符串
      const htmlReport = dom.serialize();
      // 将生成的HTML报告写入文件
      await fs.writeFile('test_report.html', htmlReport);
      console.log('Test report generated successfully.');
      return htmlReport;
    } catch (error) {
      console.error('An error occurred while generating the test report:', error);
      throw error;
    }
  }
}

// 使用示例
(async () => {
  // 假设测试结果文件路径
  const testResultsPath = path.join(__dirname, 'test_results.json');
  // 创建TestReportGenerator实例
  const generator = new TestReportGenerator(testResultsPath);
  // 生成测试报告
  try {
    const report = await generator.generateTestReport();
    console.log(report);
  } catch (error) {
    console.error(error);
  }
})();