// 代码生成时间: 2025-09-21 18:57:07
const { NextApiRequest, NextApiResponse } = require('next')
const { scheduleJob } = require('node-schedule')
const { v4: uuidv4 } = require('uuid')

// 定义一个定时任务调度器
class TaskScheduler {
  // 构造函数，可以传递定时任务的配置
  constructor() {
    this.jobs = {};
  }

  // 添加一个新的定时任务
  addJob(taskName, taskFunction, schedule) {
    try {
      const jobId = uuidv4();
      const job = scheduleJob(jobId, schedule, taskFunction);
      this.jobs[taskName] = { jobId, job };
      console.log(`Task ${taskName} scheduled successfully with ID: ${jobId}`);
    } catch (error) {
      console.error(`Failed to schedule task ${taskName}:`, error);
    }
  }

  // 移除一个定时任务
  removeJob(taskName) {
    if (this.jobs[taskName]) {
      try {
        this.jobs[taskName].job.cancel();
        console.log(`Task ${taskName} removed successfully`);
        delete this.jobs[taskName];
      } catch (error) {
        console.error(`Failed to remove task ${taskName}:`, error);
      }
    }
  }
}

// 定义一个示例任务函数
function exampleTaskFunction() {
  console.log('Example task executed');
}

// 创建定时任务调度器实例
const scheduler = new TaskScheduler();

// 使用示例：每天午夜执行exampleTaskFunction
scheduler.addJob('exampleTask', exampleTaskFunction, '0 0 * * *');

// 导出API路由，用于管理定时任务
module.exports = {
  handler: async (req, res) => {
    if (req.method === 'POST') {
      // 添加新任务
      const { taskName, schedule, taskId } = req.body;
      if (taskName && schedule && taskId) {
        scheduler.addJob(taskName, exampleTaskFunction, schedule);
        return res.status(200).json({
          message: 'Task added successfully',
          taskId
        });
      } else {
        return res.status(400).json({
          message: 'Invalid request payload'
        });
      }
    } else if (req.method === 'DELETE') {
      // 移除任务
      const { taskName } = req.body;
      if (taskName) {
        scheduler.removeJob(taskName);
        return res.status(200).json({
          message: 'Task removed successfully'
        });
      } else {
        return res.status(400).json({
          message: 'Invalid request payload'
        });
      }
    } else {
      return res.status(405).json({
        message: 'Method Not Allowed'
      });
    }
  }
};