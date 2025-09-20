// 代码生成时间: 2025-09-21 06:00:32
const { NextResponse } = require('next/server');

// 表单数据验证器
class FormValidator {
  // 构造函数，接收要验证的表单数据和验证规则
  constructor(data, rules) {
    this.data = data;
    this.rules = rules;
    this.errors = []; // 存储验证错误信息
  }

  // 验证单个字段
  validateField(field, rule) {
    const value = this.data[field];
    switch (rule.type) {
      case 'required':
        if (!value) {
          this.errors.push(`Field ${field} is required`);
        }
        break;
      case 'email':
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          this.errors.push(`Field ${field} must be a valid email`);
        }
        break;
      case 'minLength':
        if (value.length < rule.value) {
          this.errors.push(`Field ${field} must be at least ${rule.value} characters long`);
        }
        break;
      case 'maxLength':
        if (value.length > rule.value) {
          this.errors.push(`Field ${field} must not exceed ${rule.value} characters`);
        }
        break;
      default:
        break;
    }
  }

  // 验证所有字段
  validate() {
    for (const [field, rule] of Object.entries(this.rules)) {
      this.validateField(field, rule);
    }

    return this.errors; // 返回所有验证错误信息
  }
}

// 示例：使用表单验证器
async function handleRequest() {
  const formData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: '30'
  };
  const validationRules = {
    name: { type: 'required' },
    email: { type: 'email' },
    age: { type: 'minLength', value: 1 }
  };

  const validator = new FormValidator(formData, validationRules);
  const errors = validator.validate();

  if (errors.length > 0) {
    return new NextResponse(JSON.stringify({
      success: false,
      errors: errors
    }), {
      status: 400
    });
  } else {
    return new NextResponse(JSON.stringify({
      success: true,
      message: 'Validation successful'
    }), {
      status: 200
    });
  }
}

export {handleRequest};