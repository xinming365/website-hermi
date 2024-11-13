<template>
  <div>
    <!-- 表单 -->
    <el-form :model="loginForm" :rules="loginRules" label-width="100px">
      <!-- 手机号表单项 -->
      <el-form-item label="手机号" prop="phone">
        <!-- 输入框 -->
        <el-input v-model="loginForm.phone"></el-input>
      </el-form-item>
      <!-- 密码表单项 -->
      <el-form-item label="密码" prop="password">
        <!-- 密码输入框 -->
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 定义登录表单数据
const loginForm = ref({
  phone: "",
  password: "",
});

// 暴露登录表单数据
defineExpose({
  loginForm,
});

// 定义登录表单验证规则
const loginRules = ref({
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
</script>
