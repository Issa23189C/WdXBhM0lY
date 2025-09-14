// 代码生成时间: 2025-09-14 11:38:30
// performance_monitoring_tool.js
// This is a simple system performance monitoring tool using Node.js and Next.js framework.

const os = require('os');
const { performance } = require('perf_hooks');

// Function to get system load information
async function getSystemLoad() {
  try {
    const load1 = os.loadavg()[0];
    const load5 = os.loadavg()[1];
    const load15 = os.loadavg()[2];
    return { load1, load5, load15 };
  } catch (error) {
    console.error('Error getting system load:', error);
    throw error;
  }
}

// Function to get memory usage information
async function getMemoryUsage() {
  try {
    const free = os.freemem();
    const total = os.totalmem();
    const used = total - free;
    return { free, total, used };
  } catch (error) {
    console.error('Error getting memory usage:', error);
    throw error;
  }
}

// Function to get CPU usage information
async function getCpuUsage() {
  try {
    const cores = os.cpus().length;
    const cpuUsage = os.cpus().map(cpu => cpu.times.user / cpu.times.total);
    return { cores, cpuUsage };
  } catch (error) {
    console.error('Error getting CPU usage:', error);
    throw error;
  }
}

// Function to start monitoring and log system performance
async function monitorSystemPerformance() {
  try {
    console.log('Starting system performance monitoring...');

    // Measure the start time
    const startTime = performance.now();

    // Call the functions to get system performance metrics
    const systemLoad = await getSystemLoad();
    const memoryUsage = await getMemoryUsage();
    const cpuUsage = await getCpuUsage();

    // Measure the end time
    const endTime = performance.now();

    // Log the performance metrics
    console.log('System Load:', systemLoad);
    console.log('Memory Usage:', memoryUsage);
    console.log('CPU Usage:', cpuUsage);

    // Log the time taken to fetch all metrics
    console.log('Time taken to fetch metrics:', endTime - startTime, 'ms');

  } catch (error) {
    console.error('Error monitoring system performance:', error);
  }
}

// Call the monitoring function every minute to log system performance
setInterval(monitorSystemPerformance, 60000);
