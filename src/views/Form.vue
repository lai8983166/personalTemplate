<template>
  <div class="form-page">
    <el-form
      :model="formData"
      :rules="validationRules"
      ref="formRef"
      label-width="120px"
      class="demo-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="formData.age" :min="1" :max="120" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="formData.confirmPassword"
          type="password"
          placeholder="请再次输入密码"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

// 表单数据
const formData = reactive({
  username: "",
  email: "",
  age: null,
  password: "",
  confirmPassword: "",
});

// 验证规则
const validationRules = reactive({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: ["blur", "change"] },
  ],
  age: [
    {
      type: "number",
      required: true,
      message: "年龄不能为空",
      trigger: "change",
    },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

// 表单 ref
const formRef = ref(null);

// 提交
function onSubmit() {
  formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success("提交成功");
      console.log("表单数据:", formData);
    } else {
      ElMessage.error("请检查表单信息");
    }
  });
}

// 重置
function onReset() {
  formRef.value.resetFields();
}
</script>

<style scoped>
.form-page {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
}
.demo-form .el-form-item {
  margin-bottom: 20px;
}
</style>
