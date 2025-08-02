// 代码生成时间: 2025-08-03 07:06:59
const next = require('next');

// 使用Next框架创建的表单数据验证器
# 扩展功能模块
class FormValidator {
  // 构造函数，接收表单数据和验证规则
  constructor(data, rules) {
    this.data = data;
    this.rules = rules;
    this.errors = [];
  }

  // 验证表单数据是否符合规则
  validate() {
    Object.keys(this.rules).forEach(field => {
      const rule = this.rules[field];
      if (typeof rule === 'function') {
        this.validateField(field, rule);
      } else if (typeof rule === 'object') {
        Object.keys(rule).forEach(condition => {
          this.validateField(field, rule[condition], condition);
        });
      }
    });
    return this.errors;
  }

  // 验证单个字段是否符合规则
  validateField(field, rule, condition = '') {
    const value = this.data[field];
    if (!rule(value)) {
      const errorMessage = `Field ${field} ${condition ? `(${condition}) ` : ''}is invalid`;
      this.errors.push(errorMessage);
    }
  }

  // 验证邮箱格式
  static isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }
# NOTE: 重要实现细节

  // 验证字符串为非空且长度在指定范围内
  static isValidStringLength(value, minLength, maxLength) {
    return value && value.length >= minLength && value.length <= maxLength;
  }
# 改进用户体验
}

// 使用示例
const formData = {
# 添加错误处理
  email: 'test@example.com',
  username: 'john'
};
# 优化算法效率

const rules = {
  email: FormValidator.isValidEmail,
  username: value => FormValidator.isValidStringLength(value, 3, 20)
};

const validator = new FormValidator(formData, rules);
const errors = validator.validate();
# 优化算法效率

if (errors.length > 0) {
  console.error('Validation errors:', errors);
} else {
  console.log('Form data is valid');
}