<template>
  <div class="form-container">
    <h2>表单验证</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          :class="{ 'input-error': errors.username }"
          placeholder="请输入用户名"
        />
        <span v-if="errors.username" class="error-message">{{
          errors.username
        }}</span>
      </div>

      <div class="form-group">
        <label for="email">邮箱</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          :class="{ 'input-error': errors.email }"
          placeholder="请输入邮箱"
        />
        <span v-if="errors.email" class="error-message">{{
          errors.email
        }}</span>
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          :class="{ 'input-error': errors.password }"
          placeholder="请输入密码"
        />
        <span v-if="errors.password" class="error-message">{{
          errors.password
        }}</span>
      </div>

      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="form.confirmPassword"
          :class="{ 'input-error': errors.confirmPassword }"
          placeholder="请确认密码"
        />
        <span v-if="errors.confirmPassword" class="error-message">{{
          errors.confirmPassword
        }}</span>
      </div>

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      let isValid = true;

      if (!this.form.username || this.form.username.length < 3) {
        this.errors.username = "用户名必须至少3个字符";
        isValid = false;
      }

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!this.form.email || !emailPattern.test(this.form.email)) {
        this.errors.email = "请输入有效的邮箱地址";
        isValid = false;
      }

      if (!this.form.password || this.form.password.length < 6) {
        this.errors.password = "密码必须至少6个字符";
        isValid = false;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = "确认密码与密码不匹配";
        isValid = false;
      }

      return isValid;
    },
    handleSubmit() {
      if (this.validateForm()) {
        alert("表单验证通过！");
        console.log(this.form);
      } else {
        alert("表单验证失败，请检查输入。");
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
