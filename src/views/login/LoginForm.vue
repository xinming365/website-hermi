<template>
  <div>
    <!-- 表单 -->
    <!--  -->
    <el-form
      ref="formRef"
      class="my-form"
      :model="loginForm"
      label-width="70px"
      label-position="left"
      :rules="loginRules"
    >
      <!-- 手机号表单项 -->
      <el-form-item label="手机号" prop="phone" class="my-label">
        <!-- 输入框 -->
        <el-input
          class="my-input"
          v-model="loginForm.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <!-- 密码表单项 -->
      <el-form-item label="密码" prop="password" class="my-label">
        <!-- 密码输入框 -->
        <el-input
          class="my-input"
          type="password"
          show-password
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- @click="handleSubmit" -->
      <el-button class="my-button" round :loading="isLogin" @click="onLogin"
        >登 录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 定义登录表单数据
const formRef = ref();
const loginForm = ref({
  phone: "",
  password: "",
});
const onResetFileds = () => {
  formRef.value.resetFields();
};
// 暴露登录表单数据
defineExpose({
  loginForm,
  onResetFileds,
});

// 定义登录表单验证规则
const validatePhone = (rule, value, callback) => {
  const phoneNumberRegex = /^1[3456789]\d{9}$/;
  if (!value) {
    return callback(new Error("请输入手机号"));
  }
  if (!phoneNumberRegex.test(value)) {
    return callback(new Error("请输入正确的手机格式!"));
  } else {
    callback();
  }
};
const loginRules = ref({
  phone: [
    {
      required: true,
      validator: validatePhone,
      message: "请输入手机号",
      trigger: "change",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
});
const isLogin = ref(false);
const onLogin = () => {
  isLogin.value = true;
  try {
    formRef.value.validate((valid) => {
      if (valid) {
        // todo:登录逻辑
        console.log("验证通过");
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    isLogin.value = false;
  }
};
</script>

<style scoped lang="less">
.my-form {
  margin: 20px 0;
  text-align: center;
}
.my-label {
  width: 370px;
  margin: 0 auto 30px;
  border-bottom: 1px solid #eee;
  padding: 5px;
}

.my-button {
  width: 90%;
  margin: 20px auto 20px;
  height: 35px;
  background: #c6231d;
  color: #fff;
  line-height: 35px;
  cursor: pointer;
  border-radius: 18px;
  text-align: center;
  outline: 0;
  border: 0;
  &:hover {
    transition: 0.1s ease-out opacity;
    opacity: 0.85;
    background-color: #c6231d;
    border: none;
    color: #fff;
    outline: none;
  }
}
.my-input {
  :deep(.el-input__wrapper) {
    box-shadow: none;
  }
}
</style>
