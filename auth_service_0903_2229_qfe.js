// 代码生成时间: 2025-09-03 22:29:50
const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // 从环境变量获取JWT密钥

// 用户模型（此处仅为示例，实际应用中可能来自数据库）
class UserModel {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

// 身份验证服务
class AuthService {
  // 注册新用户
  async register({ username, password }) {
    if (!username || !password) {
      throw new Error('用户名和密码不能为空');
    }

    const hashedPassword = await bcrypt.hash(password, 12); // 哈希密码
    const user = new UserModel(username, hashedPassword);
    // 在这里添加将用户存储到数据库的代码
    // ...
    return user;
  }

  // 用户登录
  async login({ username, password }) {
    const user = this.validateUser(username); // 验证用户存在
    if (!user) {
      throw new Error('用户不存在');
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // 验证密码
    if (!passwordMatch) {
      throw new Error('密码错误');
    }

    const token = sign({ username: user.username }, JWT_SECRET, { expiresIn: '2h' }); // 生成JWT
    return token;
  }

  // 用户验证
  async validateUser(username) {
    // 在这里添加从数据库查找用户的代码
    // 模拟数据库中的用户数据
    const users = [
      { username: 'test', password: '$2b$12$...' } // 假设这是哈希过的密码
    ];

    const user = users.find(u => u.username === username);
    return user ? new UserModel(user.username, user.password) : null;
  }

  // 验证JWT
  async verifyToken(token) {
    try {
      const decoded = await verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('无效的令牌');
    }
  }
}

// 导出AuthService
module.exports = AuthService;