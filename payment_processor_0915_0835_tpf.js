// 代码生成时间: 2025-09-15 08:35:44
// payment_processor.js

// 引入Next框架的API路由功能
const { NextResponse } = require('next')

// 引入支付处理库
const paymentService = require('./paymentService')

// 创建API路由处理函数
const handler = async (req, res) => {
  // 检查请求方法是否为POST
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, 405)
  }

  // 尝试从请求体中解析支付信息
  try {
    const paymentInfo = req.body
    // 检查必要的支付信息是否完整
    if (!paymentInfo || !paymentInfo.amount || !paymentInfo.currency) {
      return NextResponse.json({ error: 'Missing payment information' }, 400)
    }

    // 调用支付服务处理支付
    const result = await paymentService.processPayment(paymentInfo)
    // 检查支付是否成功
    if (result.success) {
      return NextResponse.json({ message: 'Payment successful', paymentInfo: result.paymentDetails }, 200)
    } else {
      return NextResponse.json({ error: 'Payment failed', details: result.errorDetails }, 500)
    }
  } catch (error) {
    // 处理任何意外错误
    return NextResponse.json({ error: 'Error processing payment', message: error.message }, 500)
  }
}

// 导出API路由处理函数
module.exports = handler