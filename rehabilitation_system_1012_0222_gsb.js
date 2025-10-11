// 代码生成时间: 2025-10-12 02:22:30
const next = require('next');
const { createServer } = require('http');
const { parse } = require('url');

// 创建Next.js应用
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = require('next/dist/server/next-server/lib/router').getRequestHandler(app);

// 启动Next.js应用
app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}).catch((ex) => {
  console.error('Failed to start application:', ex);
});

// API接口：获取康复训练计划列表
app.get('/api/rehabilitation-plan', (req, res) => {
  try {
    // 模拟数据库查询康复训练计划
    const plans = [
      { id: 1, name: 'Plan A', description: '详细训练计划A' },
      { id: 2, name: 'Plan B', description: '详细训练计划B' },
      { id: 3, name: 'Plan C', description: '详细训练计划C' }
    ];
    // 返回康复训练计划列表
    res.status(200).json(plans);
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API接口：根据ID获取康复训练计划详情
app.get('/api/rehabilitation-plan/:id', (req, res) => {
  try {
    const { id } = req.query;
    // 模拟数据库查询康复训练计划详情
    const plan = {
      id: parseInt(id),
      name: 'Plan ' + id,
      description: '详细训练计划' + id
    };
    // 返回康复训练计划详情
    res.status(200).json(plan);
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API接口：添加新的康复训练计划
app.post('/api/rehabilitation-plan', (req, res) => {
  try {
    const plan = req.body;
    // 模拟数据库添加康复训练计划
    // 在实际开发中，这里应该是数据库操作代码
    // 验证计划信息
    if (!plan.name || !plan.description) {
      return res.status(400).json({ error: 'Plan name and description are required' });
    }
    // 返回添加成功的计划
    res.status(201).json({
      id: 4,
      name: plan.name,
      description: plan.description
    });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API接口：更新康复训练计划
app.put('/api/rehabilitation-plan/:id', (req, res) => {
  try {
    const { id } = req.query;
    const plan = req.body;
    // 模拟数据库更新康复训练计划
    // 在实际开发中，这里应该是数据库操作代码
    // 验证计划信息
    if (!plan.name || !plan.description) {
      return res.status(400).json({ error: 'Plan name and description are required' });
    }
    // 返回更新成功的计划
    res.status(200).json({
      id: parseInt(id),
      name: plan.name,
      description: plan.description
    });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API接口：删除康复训练计划
app.delete('/api/rehabilitation-plan/:id', (req, res) => {
  try {
    const { id } = req.query;
    // 模拟数据库删除康复训练计划
    // 在实际开发中，这里应该是数据库操作代码
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});