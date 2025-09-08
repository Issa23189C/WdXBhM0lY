// 代码生成时间: 2025-09-09 01:12:25
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware'); // 假设有一个中间件处理权限验证
const User = require('./models/User'); // 假设有一个User模型处理用户数据

const router = express.Router();

// 环境变量，存储密钥等敏感信息
const SECRET_KEY = process.env.SECRET_KEY;

// 登录接口
router.post('/login', async (req, res) => {
  try {
    // 获取请求体中的用户名和密码
    const { username, password } = req.body;

    // 检查用户名和密码是否提供
    if (!username || !password) {
      return res.status(400).json({
        error: 'Username or password is required'
      });
    }

    // 查找用户
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: 'Invalid credentials'
      });
    }

    // 生成token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    // 返回token和用户信息
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    // 错误处理
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

module.exports = router;

/*
 * 用户登录验证系统
 *
 * 登录接口处理POST请求，接收用户名和密码，
 * 验证用户存在性及密码正确性，
 * 生成JWT token并返回给用户。
 *
 * 注意：
 * 1. 确保环境变量SECRET_KEY被设置，用于JWT签名。
 * 2. 确保User模型和authMiddleware中间件被正确实现。
 * 3. 密码存储应使用bcrypt哈希。
 * 4. 返回的token有效期设置为1小时。
 */