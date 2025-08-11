// 代码生成时间: 2025-08-11 08:24:39
// url_validator.js
// 使用JS和NEXT框架实现URL链接有效性验证

const fetch = require('node-fetch');

// 验证URL是否有效
async function validateUrl(url) {
  // 使用try-catch进行错误处理
  try {
    // 使用fetch发送HEAD请求，检查URL是否可达
    const response = await fetch(url, { method: 'HEAD' });

    // 检查响应状态码
    if (response.ok) {
      // 如果URL可达，返回true
      return true;
    } else {
      // 如果URL不可达或出现其他问题，返回false
      return false;
    }
  } catch (error) {
    // 捕获并处理任何异常，如网络错误等
    console.error('Error validating URL:', error);
    return false;
  }
}

// NEXT框架的API路由处理函数
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // 从请求体中获取URL
      const { url } = req.body;
      // 验证URL
      const isValid = await validateUrl(url);
      // 返回验证结果
      res.status(200).json({ isValid });
    } catch (error) {
      // 如果请求处理过程中出现错误，返回错误信息
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // 如果不是POST请求，返回405 Method Not Allowed
    res.status(405).send('Method Not Allowed');
  }
}

// 注意：为了使这段代码在NEXT框架中工作，需要在pages/api下创建一个对应的文件，并确保配置了正确的路由。