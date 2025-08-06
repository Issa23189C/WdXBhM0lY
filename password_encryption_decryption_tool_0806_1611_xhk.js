// 代码生成时间: 2025-08-06 16:11:06
const crypto = require('crypto');

class PasswordTool {
  /**
   * Encrypts a password using a secure hash algorithm.
   *
   * @param {string} password - The password to be encrypted.
   * @returns {string} The encrypted password hash.
   */
  static encryptPassword(password) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(32, (err, salt) => {
        if (err) {
          reject(new Error('Unable to generate salt'));
          return;
        }
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, hashedPassword) => {
          if (err) {
            reject(new Error('Unable to hash password'));
            return;
          }
          const encryptedPassword = salt.toString('hex') + '.' + hashedPassword.toString('hex');
          resolve(encryptedPassword);
        });
      });
    });
  }

  /**
   * Decrypts a password by comparing the hash with the original password.
   *
   * @param {string} password - The original password to compare with.
   * @param {string} encryptedPassword - The encrypted password hash.
   * @returns {boolean} True if the password matches the hash, otherwise false.
   */
  static decryptPassword(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
      const [salt, hash] = encryptedPassword.split('.');
      crypto.pbkdf2(password, Buffer.from(salt, 'hex'), 100000, 64, 'sha512', (err, hashedPassword) => {
        if (err) {
          reject(new Error('Unable to hash password'));
          return;
        }
        resolve(hash === hashedPassword.toString('hex'));
      });
    });
  }
}

// Example usage:
(async () => {
  try {
    const password = 'my_secret_password';
    const encrypted = await PasswordTool.encryptPassword(password);
    console.log('Encrypted Password:', encrypted);

    // Assuming the encrypted password is stored or transmitted
    const match = await PasswordTool.decryptPassword(password, encrypted);
    console.log('Password Match:', match);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();