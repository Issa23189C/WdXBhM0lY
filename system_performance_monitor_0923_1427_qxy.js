// 代码生成时间: 2025-09-23 14:27:17
const os = require('os');
const { NextResponse } = require('next');

// 获取系统信息的函数
async function getSystemInfo() {
  try {
    // 获取系统负载
    const load = os.loadavg();
    // 获取CPU信息
    const cpus = os.cpus();
    // 获取内存信息
    const mem = os.totalmem();
    // 获取空闲内存
    const freeMem = os.freemem();
    // 获取系统运行时间
    const uptime = os.uptime();

    return {
      load,
      cpus,
      mem,
      freeMem,
      uptime
    };
  } catch (error) {
    console.error('Failed to get system info:', error);
    throw new Error('Failed to get system info');
  }
}

// Next.js API route handler
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // 获取系统性能信息
      const systemInfo = await getSystemInfo();
      // 返回系统性能信息
      return NextResponse.json(systemInfo);
    } catch (error) {
      // 错误处理
      return NextResponse.json({
        error: error.message,
        status: 'error'
      }, { status: 500 });
    }
  } else {
    // 非GET请求返回405 Method Not Allowed
    return NextResponse.json({
      error: 'Method Not Allowed',
      status: 'error'
    }, { status: 405 });
  }
}

// 以下是代码注释和文档说明：

/*
 * system_performance_monitor.js
 *
 * This module is a Next.js API route handler that provides system performance monitoring.
 * It retrieves system load, CPU information, memory usage, and uptime.
 *
 * @module system_performance_monitor
 */

/*
 * @function getSystemInfo
 * Retrieves system information such as load, CPU, memory, and uptime.
 * @returns {Promise<Object>} A promise that resolves with an object containing system information.
 */