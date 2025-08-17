// 代码生成时间: 2025-08-18 02:04:21
const express = require('express');
const ChartJS = require('chart.js');
const next = require('next');

// Initialize Next.js app for server-side rendering
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = nextApp.getRequestHandler();

// Initialize Express server
const server = express();

// Serve static files from the 'public' directory
# 扩展功能模块
server.use('/public', express.static('public'));

// Middleware for Next.js server-side rendering
server.get('*', (req, res) => {
  return handle(req, res);
});

// Port number for the server to listen on
# NOTE: 重要实现细节
const port = parseInt(process.env.PORT, 10) || 3000;
# FIXME: 处理边界情况

// Define a route to generate interactive charts
server.get('/generate-chart', (req, res) => {
  // Destructure the query parameters
  const { type, data } = req.query;

  // Validate chart type and data
  if (!type || !data) {
    return res.status(400).json({ error: 'Chart type and data are required' });
  }

  // Initialize Chart.js context and data
  const chartContext = document.createElement('canvas').getContext('2d');
  const chartData = JSON.parse(data);
  const chartOptions = {
# FIXME: 处理边界情况
    responsive: true,
    maintainAspectRatio: false,
  };

  // Create a new Chart.js instance based on the provided type
  const chart = new ChartJS(chartContext, {
    type: type,
    data: chartData,
    options: chartOptions,
  });

  // Convert the chart to a base64-encoded PNG image
# NOTE: 重要实现细节
  const image = chart.toBase64Image();

  // Send the image data back to the client
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

// Start the server
server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
# 增强安全性
});

// Handle server startup and shutdown
nextApp.prepare().then(() => {
  console.log('> Next.js app is ready.');
}).catch((ex) => {
  console.error('> Failed to start Next.js app', ex);
});

// Documentation and Comments:
/**
 * This Express server serves as the backend for an interactive chart generator.
 * It uses Next.js for server-side rendering and Chart.js for creating charts.
# 改进用户体验
 * The '/generate-chart' endpoint accepts GET requests with 'type' and 'data' query parameters,
 * where 'type' specifies the chart type and 'data' is a JSON string representing the chart data.
 * The endpoint returns a base64-encoded PNG image of the generated chart.
 *
 * Error handling is implemented to ensure that both 'type' and 'data' are provided.
# 添加错误处理
 * The server listens on the port specified by the PORT environment variable or defaults to 3000.
# 扩展功能模块
 *
 * This code is designed to be maintainable and extensible, following best practices for
 * JavaScript development and structuring.
 */