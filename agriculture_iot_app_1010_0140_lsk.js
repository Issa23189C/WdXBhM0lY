// 代码生成时间: 2025-10-10 01:40:30
const next = require('next');
const { createServer } = require('http');
const { parse } = require('url');

// 创建Next.js应用
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

// 定义农业物联网相关数据模型
class IoTDevice {
  constructor(id, type) {
    this.id = id;
    this.type = type;
  }

  // 获取设备状态
  getStatus() {
    // 模拟获取设备状态
    return {
      temperature: Math.random() * 20,
      humidity: Math.random() * 100
    };
  }
}

// 启动Next.js应用
app.prepare().then(() => {
  const server = createServer((req, res) => {
    // 解析请求URL
    const parsedUrl = parse(req.url, true);

    // 使用Next.js处理页面请求
    handle(req, res, parsedUrl);
  });

  // 监听指定端口
  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:' + (process.env.PORT || 3000));
  });

  // 添加API端点以获取设备状态
  server.on('request', (req, res) => {
    if (req.url === '/api/iot-device-status' && req.method === 'GET') {
      try {
        // 创建农业物联网设备实例
        const device = new IoTDevice('1', 'temperature-humidity');

        // 获取设备状态
        const status = device.getStatus();

        // 发送设备状态响应
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(status));
      } catch (error) {
        console.error('Error fetching device status:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    }
  });
});

// 错误处理中间件
app.prepare().then(() => {
  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});