// 代码生成时间: 2025-08-17 12:09:35
const { NextResponse } = require('next/server');

// JSON数据格式转换器
// 这个函数接受JSON数据，将其转换为所需的格式，并返回
async function transformJsonData(req) {
  // 从请求中提取body
  const data = req.nextUrl.searchParams.get('data');

  // 验证数据是否存在
  if (!data) {
    return new NextResponse('No data provided', { status: 400 });
  }

  try {
    // 尝试解析JSON数据
    const parsedData = JSON.parse(data);

    // 转换数据格式（示例：将所有键转换为小写）
    const transformedData = Object.keys(parsedData).reduce((accumulator, key) => {
      accumulator[key.toLowerCase()] = parsedData[key];
      return accumulator;
    }, {});

    // 返回转换后的数据
    return new NextResponse(JSON.stringify(transformedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    // 错误处理：如果JSON解析失败，返回400错误
    return new NextResponse('Invalid JSON format', { status: 400 });
  }
}

// 导出函数以供Next.js使用
export default transformJsonData;