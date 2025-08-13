// 代码生成时间: 2025-08-13 16:15:45
const crypto = require('crypto');

// 密码加密解密工具类
class PasswordTool {
  // 使用给定的算法和密码生成加密的密码
  static encryptPassword(password, algorithm = 'aes-256-cbc', key) {
    const iv = crypto.randomBytes(16); // 初始化向量
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex')
    };
  }

  // 解密给定的加密密码
  static decryptPassword(encryptedData, algorithm = 'aes-256-cbc', key) {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const encryptedText = Buffer.from(encryptedData.content, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // 错误处理: 解密失败时抛出错误
    if (!decipher.final) {
      throw new Error('Decryption failed');
    }

    return decrypted.toString();
  }
}

// 使用示例
const password = 'your-password-here';
const key = 'your-secret-key-here'; // 密钥应该足够长，以确保安全性

try {
  const encrypted = PasswordTool.encryptPassword(password, 'aes-256-cbc', key);
  console.log('Encrypted:', encrypted);

  const decrypted = PasswordTool.decryptPassword(encrypted, 'aes-256-cbc', key);
  console.log('Decrypted:', decrypted);
} catch (error) {
  console.error('Error:', error.message);
}
