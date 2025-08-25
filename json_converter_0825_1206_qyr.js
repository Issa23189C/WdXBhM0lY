// 代码生成时间: 2025-08-25 12:06:46
const express = require('express');
const app = express();

// 设置中间件以解析JSON请求体
app.use(express.json());

/**
 * JSON数据格式转换器
 * 这个函数接收JSON对象，并将其转换为新的格式。
 * @param {object} input - 输入的JSON对象。
 * @return {object} 转换后的JSON对象。
 */
function transformJson(input) {
  // 这里可以根据需要添加转换逻辑，例如深拷贝或修改键名等
  const output = {
    ...input,
    // 示例：将所有键转换为小写
    ...Object.keys(input).reduce((acc, key) => {
      acc[key.toLowerCase()] = input[key];
      return acc;
    }, {}),
  };

  // 确保输出也是对象格式
  if (typeof output !== 'object' || output === null) {
    throw new Error('Transformed JSON must be an object.');
  }

  return output;
}

// API端点，用于接收JSON数据并返回转换后的结果
app.post('/transform', (req, res) => {
  try {
    // 调用转换函数并获取结果
    const transformedJson = transformJson(req.body);
    // 返回转换后的JSON数据
    res.json(transformedJson);
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: error.message });
  }
});

// 服务器监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});